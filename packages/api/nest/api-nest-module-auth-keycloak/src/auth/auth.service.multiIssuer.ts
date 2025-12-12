import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { KeycloakTokenParsed } from 'keycloak-js';
import {
  KEYCLOAK_CONNECT_OPTIONS,
  KeycloakConnectConfig,
  TokenValidation,
} from 'nest-keycloak-connect';
import { AllowedIssuers, KeycloakMultiIssuerConfig } from './auth.types';
import { KEYCLOAK_MULTI_ISSUER_CONFIG } from './auth.constants';

@Injectable()
export class AuthServiceMultiIssuer {
  private readonly logger = new Logger(AuthServiceMultiIssuer.name);

  private readonly keycloakMultiIssuerConfig: KeycloakMultiIssuerConfig;

  private publicKeyCache: string | null = null;

  constructor(
    @Inject(KEYCLOAK_CONNECT_OPTIONS)
    private readonly keycloakConnectConfig: KeycloakConnectConfig,
    @Inject(KEYCLOAK_MULTI_ISSUER_CONFIG)
    keycloakMultiIssuerConfig: KeycloakMultiIssuerConfig,
  ) {
    if (!keycloakMultiIssuerConfig) {
      throw new Error(
        'keycloakMultiIssuerConfig is required for multi-issuer validation',
      );
    }

    // Validate ONLINE mode requirements
    if (
      keycloakConnectConfig.tokenValidation === TokenValidation.ONLINE &&
      (!keycloakConnectConfig.clientId || !keycloakConnectConfig.secret)
    ) {
      throw new Error(
        'clientId and secret are required for ONLINE token validation',
      );
    }

    // Prepare allowed issuers with realm path
    const preparedAllowedIssuers = keycloakMultiIssuerConfig.allowedIssuers.map(
      (issuer) => `${issuer}/realms/${this.keycloakConnectConfig.realm}`,
    ) as AllowedIssuers;

    // Store prepared config
    this.keycloakMultiIssuerConfig = {
      allowedIssuers: preparedAllowedIssuers,
      isOfflineValidationAllowed:
        keycloakMultiIssuerConfig.isOfflineValidationAllowed,
    };

    this.logger.log(
      `Multi-issuer validation enabled. Allowed issuers: ${this.keycloakMultiIssuerConfig.allowedIssuers.join(
        ', ',
      )}`,
    );
    this.logger.log(
      `Token validation mode: ${this.keycloakConnectConfig.tokenValidation}`,
    );
    if (this.keycloakConnectConfig.tokenValidation === TokenValidation.ONLINE) {
      this.logger.log(
        `Multi-issuer offline validation allowed: ${this.keycloakMultiIssuerConfig.isOfflineValidationAllowed}`,
      );
    }
  }

  /**
   * Fetches Keycloak's public key for token verification
   */
  private async getPublicKey(): Promise<string> {
    if (this.publicKeyCache) {
      return this.publicKeyCache;
    }

    const { authServerUrl, realm } = this.keycloakConnectConfig;
    try {
      const realmUrl = `${authServerUrl}/realms/${realm}`;
      this.logger.debug(`Fetching public key from: ${realmUrl}`);

      const {
        data: { public_key: publicKey },
      } = await axios.get<{
        public_key?: string;
      }>(realmUrl);

      if (!publicKey) {
        throw new Error('Public key not found');
      }

      this.publicKeyCache = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
      this.logger.log('Public key fetched and cached successfully');
      return this.publicKeyCache;
    } catch (error) {
      this.logger.error(
        `Failed to fetch Keycloak public key: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch Keycloak public key',
        (error as Error).message,
      );
    }
  }

  /**
   * Maps a token issuer URL to the backend's accessible Keycloak URL
   * This handles cases where the token issuer (e.g., 10.0.2.2 for Android)
   * differs from the backend's configured URL (e.g., localhost)
   */
  private getAccessibleKeycloakUrl(tokenIssuer: string): string {
    const { authServerUrl, realm } = this.keycloakConnectConfig;
    const { allowedIssuers } = this.keycloakMultiIssuerConfig;

    // Extract the base URL from the token issuer (remove /realms/...)
    const issuerBaseUrl = tokenIssuer.replace(`/realms/${realm}`, '');

    // If the issuer is in the allowed list but uses a different host
    // (e.g., 10.0.2.2 for Android emulator), map it to the backend's URL
    if (allowedIssuers.includes(tokenIssuer) && authServerUrl) {
      // All allowed issuers point to the same Keycloak instance
      // Use the backend's configured authServerUrl for introspection
      return authServerUrl;
    }

    return issuerBaseUrl;
  }

  /**
   * Introspects token with Keycloak server (ONLINE validation)
   * Note: clientId and secret are validated in constructor for ONLINE mode
   */
  private async introspectToken(
    token: string,
    tokenIssuer: string,
  ): Promise<boolean> {
    const { realm, clientId, secret } = this.keycloakConnectConfig;
    try {
      // Get the accessible Keycloak URL for introspection
      const keycloakBaseUrl = this.getAccessibleKeycloakUrl(tokenIssuer);

      const introspectionUrl = `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/token/introspect`;
      this.logger.debug(`Introspecting token at: ${introspectionUrl}`);

      const { data } = await axios.post<{ active?: boolean }>(
        introspectionUrl,
        new URLSearchParams({
          token,
          client_id: clientId!,
          client_secret: secret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const isTokenActive = !!data.active;
      this.logger.debug(
        `Token introspection result: ${isTokenActive ? 'active' : 'inactive'}`,
      );
      this.logger.debug(`Full introspection response: ${JSON.stringify(data)}`);

      return isTokenActive;
    } catch (error) {
      this.logger.error(
        `Token introspection failed: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException(
        'Token introspection failed',
        (error as Error).message,
      );
    }
  }

  /**
   * Validates a JWT token against multiple allowed issuers
   */
  async validateToken(token: string): Promise<KeycloakTokenParsed> {
    try {
      // Decode without verification first to check issuer
      const tokenDecoded = jwt.decode(token, { complete: true });

      if (!tokenDecoded || typeof tokenDecoded === 'string') {
        this.logger.warn('Invalid token format');
        throw new UnauthorizedException('Invalid token format');
      }

      const { payload } = tokenDecoded;
      if (typeof payload === 'string') {
        this.logger.warn('Token payload is a string, expected object');
        throw new UnauthorizedException('Invalid token payload format');
      }

      const issuer = payload.iss;

      this.logger.debug(`Token issuer: ${issuer}`);

      const { allowedIssuers, isOfflineValidationAllowed } =
        this.keycloakMultiIssuerConfig;

      // Check if issuer is in allowed list
      if (!issuer || !allowedIssuers.includes(issuer)) {
        this.logger.warn(
          `Invalid issuer: ${issuer}. Allowed: ${allowedIssuers.join(', ')}`,
        );
        throw new UnauthorizedException(
          `Invalid issuer. Expected one of: ${allowedIssuers.join(', ')}`,
        );
      }

      // Fetch public key and verify signature
      const publicKey = await this.getPublicKey();

      const { clientId, tokenValidation } = this.keycloakConnectConfig;
      const verified = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
        issuer: allowedIssuers,
        audience: clientId,
      });

      // Ensure verified result is an object, not a string
      if (typeof verified === 'string') {
        this.logger.warn('Verified token is a string, expected object');
        throw new UnauthorizedException('Invalid verified token format');
      }

      const keycloakTokenParsed = verified as KeycloakTokenParsed;

      // Note: azp (authorized party) validation is NOT needed here
      // - azp identifies which CLIENT requested the token (e.g., client-web)
      // - aud (audience) identifies who the token is FOR (e.g., client-api-core)
      // - We already validate aud via jwt.verify, which is correct for API validation
      // - azp validation would reject legitimate tokens from web/mobile clients

      // Hybrid validation: ONLINE for matching issuers, OFFLINE for cross-issuer
      if (tokenValidation === TokenValidation.ONLINE) {
        const { authServerUrl, realm } = this.keycloakConnectConfig;
        const backendIssuer = `${authServerUrl}/realms/${realm}`;

        if (issuer === backendIssuer) {
          // Issuer matches backend URL - use ONLINE validation (introspection)
          this.logger.debug(
            `Performing ONLINE validation: issuer matches backend (${backendIssuer})`,
          );
          const isActive = await this.introspectToken(token, issuer);

          if (!isActive) {
            this.logger.warn('Token is not active according to introspection');
            throw new UnauthorizedException('Token is not active');
          }
        } else {
          // Cross-issuer token - check if OFFLINE validation is allowed
          if (!isOfflineValidationAllowed) {
            this.logger.warn(
              `OFFLINE validation not allowed: cross-issuer token rejected (issuer: ${issuer}, backend: ${backendIssuer})`,
            );
            throw new UnauthorizedException(
              'Token issuer does not match backend and offline validation is not allowed',
            );
          }

          // Use OFFLINE validation (skip introspection)
          this.logger.debug(
            `Performing OFFLINE validation: cross-issuer token (issuer: ${issuer}, backend: ${backendIssuer})`,
          );
          this.logger.debug(
            'Token signature and claims validated locally - skipping introspection',
          );
        }
      }

      this.logger.debug('Performing OFFLINE validation');
      this.logger.debug(
        `Token validated successfully for user: ${keycloakTokenParsed.preferred_username}`,
      );

      return keycloakTokenParsed;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      if ((error as Error).name === 'TokenExpiredError') {
        this.logger.warn('Token has expired');
        throw new UnauthorizedException('Token has expired');
      }

      if ((error as Error).name === 'JsonWebTokenError') {
        this.logger.warn(`JWT validation error: ${(error as Error).message}`);
        throw new UnauthorizedException(
          `Invalid token: ${(error as Error).message}`,
        );
      }

      this.logger.error(`Token validation failed: ${(error as Error).message}`);
      throw new UnauthorizedException('Token validation failed');
    }
  }

  /**
   * Clears the cached public key (useful for testing or key rotation)
   */
  clearPublicKeyCache(): void {
    this.publicKeyCache = null;
    this.logger.log('Public key cache cleared');
  }
}
