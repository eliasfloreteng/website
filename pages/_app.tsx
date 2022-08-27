// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"
// used for rendering equations (optional)
import "katex/dist/katex.min.css"

// custom global css
import "styles/global.css"
import "styles/notion.css"
import { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"

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
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#f8fafc" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#38bdf8"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      {/* Polyfill Intl.RelativeTimeFormat, its dependencies &amp; `en` locale data */}
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en,Intl.RelativeTimeFormat.~locale.se"
        strategy="beforeInteractive"
      ></Script>
    </>
  )
}
