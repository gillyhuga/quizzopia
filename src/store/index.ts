import { combineReducers, configureStore } from "@reduxjs/toolkit";
import question from "./question";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import answer from "./answer";

const reducers = combineReducers({
    questions: question,
    answers: answer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['questions','answers'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;