import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
>>>>>>> dev
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ModalProvider } from './context/Modal';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();
<<<<<<< HEAD
=======
const root = createRoot(document.getElementById('root'));
>>>>>>> dev

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

<<<<<<< HEAD
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
=======
// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
>>>>>>> dev
);
