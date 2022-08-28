// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=optional"
            rel="stylesheet"
          />
          {/* https://fonts.google.com/share?selection.family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900%7CMontserrat:ital,wght@0,300;0,400;0,500;0,600;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900 */}
        </Head>

        <body>
          <Main />
          <NextScript />
          {/* Polyfill Intl.RelativeTimeFormat, its dependencies &amp; `en` locale data */}
          <Script
            src="https://polyfill.io/v3/polyfill.min.js?features=Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en,Intl.RelativeTimeFormat.~locale.se"
            strategy="beforeInteractive"
          ></Script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
