import { Logger } from '@nestjs/common';
import { getToken } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import type {
  ConnectionConfig,
  Credentials,
  TokenProvider,
} from '@js-modules/api-nest-keycloak-admin-client-cjs';

// Re-fetch this long before the access token actually expires, so a token
// handed out just under the wire can't expire while the request is in flight.
const ACCESS_TOKEN_EXPIRATION_MARGIN_MS = 30_000;

// Cap the margin at a fraction of the token's life: a realm with a short access
// token lifespan would otherwise renew on every call.
const ACCESS_TOKEN_EXPIRATION_MARGIN_MAX_FRACTION = 0.1;

/**
 * Supplies access tokens to `KeycloakAdminClient` via its `registerTokenProvider`
 * hook, re-fetching each one from the token endpoint as it nears expiry.
 *
 * The client's own `auth()` path is unusable with the `client_credentials` grant:
 * it stores a refresh token and refreshes off it, but per RFC 6749 §4.4.3 that
 * grant returns none, so `auth()` throws on the absent token (>=26.7.0) and
 * `#refreshAccessToken()` throws once the 5-minute access token expires. A token
 * provider bypasses that path entirely — `getAccessToken()` short-circuits to it.
 */
export class AuthTokenProviderKeycloakAdminClient implements TokenProvider {
  private readonly logger = new Logger(
    AuthTokenProviderKeycloakAdminClient.name,
  );

  private accessToken: string | null = null;

  private accessTokenExpiresAt = 0;

  private accessTokenRenewAt = 0;

  private accessTokenRequest: Promise<string> | null = null;

  constructor(
    private readonly connectionConfig: ConnectionConfig,
    private readonly credentials: Credentials,
  ) {}

  /**
   * Returns a valid access token, reusing the cached one until it nears expiry.
   * Concurrent callers that arrive during a fetch share the one in-flight
   * request rather than each minting a token.
   * @returns Access token.
   */
  async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.accessTokenRenewAt) {
      return this.accessToken;
    }

    this.accessTokenRequest ??= this.fetchAccessToken();

    try {
      return await this.accessTokenRequest;
    } finally {
      this.accessTokenRequest = null;
    }
  }

  /**
   * Fetches a fresh access token from Keycloak and caches it with its expiry.
   * If the fetch fails while the cached token is still genuinely valid, falls
   * back to that token; otherwise clears the cache and rethrows.
   * @returns Access token.
   */
  private async fetchAccessToken(): Promise<string> {
    const { baseUrl, realmName, requestOptions, timeout } =
      this.connectionConfig;

    // Mirror how the client bounds its own requests, so a black-holed token
    // endpoint can't stall every admin call indefinitely. Built from
    // `AbortController` rather than `AbortSignal.timeout`, which React Native
    // consumers of this package don't have.
    const abortController = timeout ? new AbortController() : null;
    const timeoutId: ReturnType<typeof setTimeout> | null = abortController
      ? setTimeout(() => {
          abortController.abort();
        }, timeout)
      : null;

    try {
      const { accessToken, expiresIn } = await getToken({
        baseUrl,
        realmName,
        requestOptions: abortController
          ? { ...requestOptions, signal: abortController.signal }
          : requestOptions,
        credentials: this.credentials,
      });

      const expiresInMs = expiresIn * 1000;
      const renewMarginMs = Math.min(
        ACCESS_TOKEN_EXPIRATION_MARGIN_MS,
        expiresInMs * ACCESS_TOKEN_EXPIRATION_MARGIN_MAX_FRACTION,
      );

      // One clock read for both, so the margin between them is exactly the one
      // computed above rather than that minus however long the assignments took.
      const fetchedAt = Date.now();
      this.accessToken = accessToken;
      this.accessTokenExpiresAt = fetchedAt + expiresInMs;
      this.accessTokenRenewAt =
        fetchedAt + Math.max(expiresInMs - renewMarginMs, 0);

      this.logger.debug(
        `Keycloak admin access token fetched for client '${this.credentials.clientId}' (expires in ${expiresIn}s)`,
      );

      return accessToken;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      // Renewal deliberately starts a margin before real expiry, so the token in
      // hand usually still works — spend the rest of it rather than fail on a blip.
      if (this.accessToken && Date.now() < this.accessTokenExpiresAt) {
        this.logger.warn(
          `Failed to renew Keycloak admin access token for client '${this.credentials.clientId}', reusing the current one for another ${Math.round((this.accessTokenExpiresAt - Date.now()) / 1000)}s: ${message}`,
        );
        return this.accessToken;
      }

      this.accessToken = null;
      this.accessTokenExpiresAt = 0;
      this.accessTokenRenewAt = 0;

      this.logger.error(
        `Failed to fetch Keycloak admin access token for client '${this.credentials.clientId}': ${message}`,
      );
      throw error;
    } finally {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    }
  }
}
