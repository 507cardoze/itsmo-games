import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { successToast } from "../../common/toast";
import { nanoid } from "@reduxjs/toolkit";
import { order, saveOrder } from "../../firebase/firebase-orders";
import handleRequestError from "../../common/handleRequestError";

const initialState = {
	submittingOrder: false,
};

type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };

export const setOrder = createAsyncThunk<
	any,
	{
		metodoPago: string;
		phoneNumber: string;
		address1: string;
		address2: string;
		city: string;
		useCredit: number;
		clientName?: string;
		clientEmail?: string;
	},
	AsyncThunkConfig
>("checkout/setOrder", async (args, thunkAPI) => {
	try {
		const { currentUser } = thunkAPI.getState().AuthSlice;
		const { items } = thunkAPI.getState().cartListSlice;
		if (items.length === 0)
			return thunkAPI.rejectWithValue("No hay items en el carrito");
		if (!currentUser) return thunkAPI.rejectWithValue("No user logged in");
		const { uid, displayName, email } = currentUser;
		const { address1, address2, city, phoneNumber, useCredit, metodoPago } =
			args;
		const created_at = new Date().toISOString();
		const status = "Pendiente";
		const orderData = {
			uid: nanoid(),
			userUid: uid,
			address1,
			address2,
			city,
			metodoPago,
			phoneNumber,
			useCredit,
			items,
			created_at,
			status,
			clientName: displayName,
			clientEmail: email,
		} as order;

		const order = await saveOrder(orderData);
		if (!order) return thunkAPI.rejectWithValue("Error al guardar el pedido");
		successToast("¡Orden creada!", "¡Has hecho tu orden!");
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const CheckoutSlice = createSlice({
	name: "checkout-slice",
	initialState,
	reducers: {
		startSubmittingOrder(state) {
			state.submittingOrder = true;
		},
		stopSubmittingOrder(state) {
			state.submittingOrder = false;
		},
	},
});

export const { startSubmittingOrder, stopSubmittingOrder } =
	CheckoutSlice.actions;

export default CheckoutSlice.reducer;
