import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // Redux Provider
import { PersistGate } from 'redux-persist/integration/react';
import{store,persistor} from './redux/Store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
            {/* Ensure the persisted state is rehydrated before rendering */}
            
                {/* <App /> */}
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>

            
        </Provider>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
