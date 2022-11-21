import React from 'react';
import Document, {
  Html, Head, NextScript, Main,
} from 'next/document';
import { Partytown } from '@builder.io/partytown/react';
import { GANoScript, GAScript } from '@/components/Analytics/GA';
import { Hotjar } from '@/components/Services/Hotjar/Hotjar';

export default class HuntdDocument extends Document {
  render(): JSX.Element {
    return (
      // eslint-disable-next-line no-underscore-dangle
      <Html lang={this.props.__NEXT_DATA__.props.initialLanguage}>
        <Head>
          <Partytown debug forward={['dataLayer.push']} />
          <GAScript />
          <Hotjar />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <GANoScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
