import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";
import { getOrdersByUserUid } from "../../firebase/firebase-orders";
import { CartItemType } from "./carrito-slice";

export type Order = {
	uid: string;
	address1: string;
	address2: string;
	city: string;
	userUid: string;
	status: string;
	metodoPago: string;
	useCredit: number;
	phoneNumber: string;
	created_at: string;
	items: CartItemType[];
	clientName: string;
	clientEmail: string;
};

export type MyOrdersState = {
	myOrders: Order[];
	fetchingOrders: boolean;
};

const initialState = {
	myOrders: [],
	fetchingOrders: true,
} as MyOrdersState;

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const getOrderByUser = createAsyncThunk<
	any,
	{
		userUid: string;
	},
	AsyncThunkConfig
>("checkout/getOrderByUser", async (args, thunkAPI) => {
	try {
		const { userUid } = args;

		const orders = await getOrdersByUserUid(userUid);

		return orders;
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Firebase error", "Fallo al traer todas las ordenes.");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const MyOrderSlice = createSlice({
	name: "my-orders-slice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getOrderByUser.pending, (state, action) => {
			state.fetchingOrders = true;
		});
		builder.addCase(getOrderByUser.fulfilled, (state, action) => {
			state.myOrders = action.payload;
			state.fetchingOrders = false;
		});
		builder.addCase(getOrderByUser.rejected, (state, action) => {
			state.fetchingOrders = false;
		});
	},
});

//export const {} = CheckoutSlice.actions;

export default MyOrderSlice.reducer;
