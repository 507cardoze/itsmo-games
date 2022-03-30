import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { ThunkMiddleware } from "redux-thunk";
import reduxThunk from "redux-thunk";
import CardListSlice from "./slices/card-list-slice";

let middlewares = [reduxThunk as ThunkMiddleware];

const reducers = combineReducers({ CardListSlice });

export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
