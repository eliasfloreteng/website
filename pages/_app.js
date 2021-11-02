// compiled tailwind styles
import 'tailwindcss/tailwind.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// used for collection views (optional)
import 'rc-dropdown/assets/index.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// custom global css
import 'styles/global.css'
import 'styles/notion.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

