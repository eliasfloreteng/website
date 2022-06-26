// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"
// used for rendering equations (optional)
import "react-notion-x/build/third-party/equation.css"

import "@formatjs/intl-relativetimeformat/polyfill"
import "@formatjs/intl-relativetimeformat/locale-data/en" // locale-data for en

// custom global css
import "styles/global.css"
import "styles/notion.css"
import { AppProps } from "next/app"
import Head from "next/head"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <meta name="application-name" content="Elias1233" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Elias1233" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#06B6D4" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#f1f3f4" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
