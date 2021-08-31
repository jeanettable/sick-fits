// for controlling higher up in your pages, must go into _app.js
import Page from "../components/Page";
import NProgress from "nprogress";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";

// TODO: swap with out own
import "../components/styles/nprogress.css";

// use case for hooking into router to implement the progress bar up top
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  // console.log("apollo>>>", apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
