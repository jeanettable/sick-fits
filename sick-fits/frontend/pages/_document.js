import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // getInitialProps is an async function that allows initial data population
  // used for **SEO** (search engine optimization)
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    // console.log('sheet>>>', sheet);
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    // console.log('styleTags>>>', styleTags);
    return {...page, styleTags};
  }

  render() {
    return (
      <Html lang="en-CA">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
