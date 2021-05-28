import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import Head from 'next/head';

import {createStore} from 'redux';
import rootReducer from '../redux/reducers';
import {Provider} from 'react-redux';

const store = createStore(rootReducer);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
