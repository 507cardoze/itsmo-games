import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast, successToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";
import { nanoid } from "@reduxjs/toolkit";
import { saveOrder } from "../../firebase/firebase-orders";

const initialState = {};

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const setOrder = createAsyncThunk<
	any,
	{
		metodoPago: string;
		phoneNumber: string;
		address1: string;
		address2: string;
		city: string;
		useCredit: number;
	},
	AsyncThunkConfig
>("checkout/setOrder", async (args, thunkAPI) => {
	try {
		const { currentUser } = thunkAPI.getState().AuthSlice;
		const { items } = thunkAPI.getState().cartListSlice;
		if (items.length === 0)
			return thunkAPI.rejectWithValue("No hay items en el carrito");
		if (!currentUser) return thunkAPI.rejectWithValue("No user logged in");
		const { uid } = currentUser;
		const { address1, address2, city, phoneNumber, useCredit, metodoPago } =
			args;
		const created_at = new Date().toISOString();
		const status = "pending";
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
		};

		const order = await saveOrder(orderData);
		if (!order) return thunkAPI.rejectWithValue("Error al guardar el pedido");
		successToast("Orden creada", "¡Hecho tu orden!");
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Firebase error", "Fallo al guardar la orden.");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const CheckoutSlice = createSlice({
	name: "checkout-slice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(setOrder.fulfilled, (state, action) => {});
	},
});

//export const {  } = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
