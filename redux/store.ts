import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { ThunkMiddleware } from "redux-thunk";
import reduxThunk from "redux-thunk";

//persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//reducers
import AuthSlice from "./slices/auth-slice";
import YugiohCardListSlice from "./slices/yugioh-slice";
import cartListSlice from "./slices/carrito-slice";
import CheckoutSlice from "./slices/checkout-slice";
import MyOrderSlice from "./slices/my-orders-slice";
import HomePageSlice from "./slices/home-page-slice";
import adminPanelSlice from './slices/admin-panel';

let middlewares = [reduxThunk as ThunkMiddleware];

const persistConfig = {
	key: "istmo-games_v1",
	storage: storage,
	blacklist: [],
};

const reducers = combineReducers({
	YugiohCardListSlice,
	AuthSlice,
	cartListSlice,
	CheckoutSlice,
	MyOrderSlice,
	HomePageSlice,
	adminPanelSlice,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducers,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ['persist/PERSIST'],
			},
		}).concat(middlewares),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
