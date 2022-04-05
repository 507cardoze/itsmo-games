import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";
import { WritableDraft } from "immer/dist/internal";

export type CheckoutFormType = {
	metodoPago: string;
	email: string;
	displayName: string;
	phoneNumber: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	useCredit: number;
};

const initialState = {
	metodoPago: "",
	email: "",
	displayName: "",
	phoneNumber: "",
	address1: "",
	address2: "",
	city: "",
	state: "",
	useCredit: 0,
} as CheckoutFormType;

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const CheckoutSlice = createSlice({
	name: "checkout-slice",
	initialState,
	reducers: {
		setField: (state, action) => {
			const { type, value } = action.payload;
			switch (type) {
				case "metodoPago":
					state.metodoPago = value;
					break;
				case "email":
					state.email = value;
					break;
				case "displayName":
					state.displayName = value;
					break;
				case "phoneNumber":
					state.phoneNumber = value;
					break;
				case "address1":
					state.address1 = value;
					break;
				case "address2":
					state.address2 = value;
					break;
				case "city":
					state.city = value;
					break;
				case "state":
					state.state = value;
					break;
				case "useCredit":
					state.useCredit = value;
					break;
				default:
					break;
			}
		},
	},
});

export const { setField } = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
