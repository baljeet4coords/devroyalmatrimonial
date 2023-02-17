import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../ducks/rootReducer";
import rootSaga from "../ducks/rootSaga";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["checked", "error"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    sagaMiddleware,
  ],
});

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
