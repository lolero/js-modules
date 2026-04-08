import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  KEYCLOAK_CONNECT_OPTIONS,
  KEYCLOAK_COOKIE_DEFAULT,
} from 'nest-keycloak-connect';
import type { KeycloakConnectConfig } from 'nest-keycloak-connect';
import { AuthServiceMultiIssuer } from './auth.service.multiIssuer';
import type { AuthRequest } from './auth.types';

@Injectable()
export class AuthGuardMultiIssuer implements CanActivate {
  private readonly logger = new Logger(AuthGuardMultiIssuer.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly authServiceMultiIssuer: AuthServiceMultiIssuer,
    @Inject(KEYCLOAK_CONNECT_OPTIONS)
    private readonly keycloakConnectConfig: KeycloakConnectConfig,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route is marked as unprotected (using nest-keycloak-connect metadata keys)
    const isUnprotected = this.reflector.getAllAndOverride<boolean>(
      'unprotected',
      [context.getHandler(), context.getClass()],
    );

    // Check if route is marked as skip-auth
    const skipAuth = this.reflector.getAllAndOverride<boolean>('skip-auth', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If unprotected and skipAuth, allow access without authentication
    if (isUnprotected && skipAuth) {
      this.logger.debug('Public route with skipAuth, skipping authentication');
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();

    // Extract token from cookies or Authorization header
    const token =
      this.extractJwtFromCookie(request.cookies) ??
      this.extractJwtFromHeader(request.headers.authorization);

    // Handle empty JWT with fallback for unprotected routes
    if (!token) {
      // If route is unprotected but skipAuth is false, allow fallback
      if (isUnprotected && !skipAuth) {
        this.logger.debug(
          'Empty JWT on unprotected route with skipAuth=false, allowing fallback',
        );
        return true;
      }

      this.logger.warn('No valid authorization header found');
      throw new UnauthorizedException('No authorization header');
    }

    // Validate token and attach parsed token to request
    const keycloakTokenParsed =
      await this.authServiceMultiIssuer.validateToken(token);
    request.user = keycloakTokenParsed;
    // Attach raw JWT for compatibility with nest-keycloak-connect
    request.accessTokenJWT = token;

    this.logger.debug(
      `Request authenticated for user: ${keycloakTokenParsed.preferred_username}`,
    );

    return true;
  }

  /**
   * Extracts JWT from Authorization header (Bearer token)
   */
  private extractJwtFromHeader(authorizationHeader?: string): string | null {
    if (!authorizationHeader) {
      this.logger.verbose('No authorization header');
      return null;
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type?.toLowerCase() !== 'bearer') {
      this.logger.verbose('No bearer token in authorization header');
      return null;
    }

    return token || null;
  }

  /**
   * Extracts JWT from cookies (if cookieKey is configured)
   */
  private extractJwtFromCookie(
    cookies?: Record<string, string>,
  ): string | null {
    if (!cookies) {
      return null;
    }

    const cookieKey =
      this.keycloakConnectConfig.cookieKey || KEYCLOAK_COOKIE_DEFAULT;
    const token = cookies[cookieKey];

    if (token) {
      this.logger.verbose(`JWT found in cookie: ${cookieKey}`);
    }

    return token || null;
  }
}
