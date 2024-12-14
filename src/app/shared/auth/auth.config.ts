import {AuthConfig} from '@auth0/auth0-angular';

export const authConfig: AuthConfig = {
  domain: 'thbts.us.auth0.com',
  clientId: 'mrXLnH9uJpBkQRBy1AD6J63eXO4Thr6r',
  authorizationParams: {
    audience: 'meu-bolso-api',
    redirect_uri: window.location.origin
  }
};
