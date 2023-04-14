import Head from 'next/head'
import './globals.css'
import Header from './header'
import Footer from './footer'
import Provider from './Provider'
export const metadata = {
  title: 'Vef2-2023-H2',
  description: '....',
}

export default async function RootLayout({  children}: {  children: React.ReactNode}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="" content=""></meta>
        <link rel="" href="/favaicon.ico"></link>
      </Head>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
