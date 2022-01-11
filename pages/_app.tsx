import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>

        {/* icons library cdn */}
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>
        <link data-n-head="ssr" href="https://unicons.iconscout.com/release-pro/v4.0.0/css/solid.css" rel="stylesheet"></link>

      </Head>
      <Component {...pageProps} />
    </>
  )

}

export default MyApp
