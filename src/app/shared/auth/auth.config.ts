import {AuthConfig} from '@auth0/auth0-angular';
import {env} from '@env/environment';

export const authConfig: AuthConfig = {
  domain: env.auth0.domain,
  clientId: env.auth0.clientId,
  authorizationParams: {
    audience: env.auth0.audience,
    redirect_uri: window.location.origin
  }
};
