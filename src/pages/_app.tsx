import { Provider } from 'react-redux'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '../store'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
