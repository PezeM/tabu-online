import { ColorModeScript } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import './i18n';
import { Provider } from 'react-redux';
import { store } from './store';
import '@fontsource/lato/400.css';
import { MainSkeleton } from '@/components/Skeletons/MainSkeleton';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<MainSkeleton />}>
        <Provider store={store}>
          <ColorModeScript />
          <App />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register();
