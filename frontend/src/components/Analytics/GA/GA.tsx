import React, { memo } from 'react';

const GTM_TRACKING_ID = 'GTM-W3BZ6WG';

// TODO: uncomment when AB tests are set up
// const { userExperiments } = props;

// https://stackoverflow.com/questions/60331514/multiple-server-side-experiments-with-google-optimize-and-gtm
// const experimentsString = Object.values(userExperiments)
//   .map((experiment) => `${experiment?.id}.${experiment?.variant}`)
//   .join('!');

// var dataLayer = [{'exp': '${experimentsString}'}];

export const GAScript = memo(() => (
  <script
    type="text/partytown"
    dangerouslySetInnerHTML={{
      __html: `
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)}
          var dataLayer = [];
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_TRACKING_ID}');
        `,
    }}
  />
));

export const GANoScript = () => (
  <noscript dangerouslySetInnerHTML={{
    __html: `
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=${GTM_TRACKING_ID}"
            height="0" width="0" style="display:none;visibility:hidden">
          </iframe>
        `,
  }}
  />
);
