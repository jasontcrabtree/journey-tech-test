import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Lato } from 'next/font/google'
import { createContext, useState } from 'react'

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'], preload: true
})

const defaultCurrencyContext: {
  currencyCtx: string;
  updateCtx: (currency: string) => void;
} = {
  currencyCtx: "NZD",
  updateCtx: () => { }
};

export const CurrencyContext = createContext(defaultCurrencyContext);

export default function App({ Component, pageProps }: AppProps) {
  const [currencyCtx, setCurrency] = useState("NZD");

  const updateCtx = (currency: string) => {
    setCurrency(currency);
  };

  return (
    <>
      <Head>
        <title>Journey Tech Test</title>
        <meta name="description" content="Generated by Journey Tech Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CurrencyContext.Provider value={{ currencyCtx, updateCtx }}>
        <div className={`${lato.className}`}>
          <Component {...pageProps} />
        </div>
      </CurrencyContext.Provider>
    </>
  )
}
