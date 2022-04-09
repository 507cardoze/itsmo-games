import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast, successToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";
import { nanoid } from "@reduxjs/toolkit";
import { getOrdersByUserUid, saveOrder } from "../../firebase/firebase-orders";

const initialState = {
	myOrders: [],
	fetchingOrders: false,
};

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
		builder.addCase(getOrderByUser.fulfilled, (state, action) => {
			state.myOrders = action.payload;
		});
	},
});

//export const {} = CheckoutSlice.actions;

export default MyOrderSlice.reducer;
