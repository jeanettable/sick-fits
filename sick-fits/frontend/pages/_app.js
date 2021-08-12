// for controlling higher up in your pages, must go into _app.js
import Page from '../components/Page';
import NProgress from 'nprogress';
import Router from 'next/router';

// TODO: swap with out own
import '../components/styles/nprogress.css';

// use case for hooking into router to implement the progress bar up top
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
