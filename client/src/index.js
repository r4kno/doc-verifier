import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
// authReducer: This is the default exported reducer from the ./state file, which handles the actions and updates the state for the authentication and user information.

// configureStore: This is a function from the @reduxjs/toolkit library that sets up and configures a new Redux store.

// Provider: This component from the react-redux library is used to provide the store to all connected components in the application.

// persistStore: This function from the redux-persist library is used to create a persistor, which is responsible for storing the state to and loading it from a storage medium (such as local storage).

// persistReducer: This function from the redux-persist library is used to create a version of the reducer that is compatible with the persistor.

// FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER: These are constants from the redux-persist library that are used to define the different stages of the persistence process.

// storage: This is a storage engine from the redux-persist library that uses the browser's local storage to save and load the state.

// PersistGate: This component from the redux-persist/integration/react library is used to delay the rendering of the application until the persisted state has been loaded and rehydrated.

// Overall, this code imports the necessary modules and libraries to configure a Redux store with persistence for an application. The authReducer is used to handle the actions and update the state, while the configureStore function is used to set up the store. The Provider component is used to provide the store to all connected components in the application, while the persistStore and persistReducer functions are used to handle the persistence of the state. The storage engine is used to save and load the state from local storage. Finally, the PersistGate component is used to delay the rendering of the application until the persisted state is loaded.
