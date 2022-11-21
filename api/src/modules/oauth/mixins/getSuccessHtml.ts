import { AppEnvironments } from '@mate-academy/core';

export const getSuccessHtml = (data: Record<string, any>) => `
<!doctype html>
<html lang="en">
  <head>
    <title>Login successful</title>
  </head>
  <body>
    <h1>Success</h1>
    <p>You are authenticated...</p>
  </body>
  <script>
    document.body.onload = function() {
      window.opener.postMessage(
        {
          payload: ${JSON.stringify(data)},
          status: 'success',
          type: 'oauthProviderResponse'
        },
        ${process.env.APP_ENV === AppEnvironments.Local ? '"*"' : 'window.opener.location'}
      );
    };
  </script>
</html>
`;
