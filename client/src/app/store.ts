import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";
import authReducer from "@/features/auth/authSlice";
import registerReducer from "@/features/register/registerSlice";
import accountReducer from "@/features/account/accountSlice";
import projectsReducer from "@/features/projects/projectSlice";
import bugsReducer from "@/features/bugs/bugSlice";
import commentReducer from "@/features/comments/commentSlice";
import systemReducer from "@/features/system/systemSlice";

const appReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  account: accountReducer,
  projects: projectsReducer,
  bugs: bugsReducer,
  comments: commentReducer,
  system: systemReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "reset") {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  whitelist: ["auth.isLoggedIn"],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
