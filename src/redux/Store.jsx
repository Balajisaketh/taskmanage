// import { configureStore } from '@reduxjs/toolkit';
// import taskReducer from '../redux/taskSlice'

// const store = configureStore({
//     reducer: {
//         tasks: taskReducer,
//     },
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import counterReducer from './counterSlice'; // Example reducer
import { PersistGate } from 'redux-persist/integration/react';
import taskReducer from '../redux/taskSlice'
const persistConfig = {
  key: 'root', // The key in localStorage/sessionStorage
  storage, // The storage engine to use
};

// Combine reducers
const rootReducer = combineReducers({
    tasks: taskReducer, // Example slice
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Persist the store
const persistor = persistStore(store);

export { store, persistor };
