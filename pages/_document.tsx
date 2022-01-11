import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head >
          {/* google font  */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
          {/* icons library cdn */}
          <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>
          <link data-n-head="ssr" href="https://unicons.iconscout.com/release-pro/v4.0.0/css/solid.css" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <div id='modal-portal'></div>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument