import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";

export type CartItemType = {
	uid: string;
	url: string;
	name: string;
	tag: string;
	price: number;
	quantity: number;
};

export type CartListTypeState = {
	items: CartItemType[];
};

const initialState = {
	items: [],
} as CartListTypeState;

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const cartListSlice = createSlice({
	name: "cartListSlice",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const { uid, url, name, tag, price } = action.payload;
			const product = {
				uid,
				url,
				name,
				tag,
				price,
			} as CartItemType;

			const itemExist = state.items.find((item) => item.uid === uid);

			if (itemExist) {
				let newCartItems = [] as CartItemType[];
				state.items.forEach((item) => {
					if (item.uid === uid) {
						newCartItems.push({
							uid: item.uid,
							url: item.url,
							name: item.name,
							tag: item.tag,
							price: item.price,
							quantity: item.quantity + 1,
						});
					} else {
						newCartItems.push(item);
					}
				});
				state.items = newCartItems;
			} else {
				state.items.push({ ...product, quantity: 1 });
			}
		},
		deleteItem: (state, action) => {
			const { uid } = action.payload;
			const newCartItems = state.items.filter((item) => item.uid !== uid);
			state.items = newCartItems;
		},
		lessItem: (state, action) => {
			const { uid } = action.payload;
			const itemExist = state.items.find((item) => item.uid === uid);

			if (itemExist) {
				if (itemExist.quantity == 1) {
					state.items = state.items.filter((item) => item.uid !== uid);
				} else {
					let newCartItems = [] as CartItemType[];
					state.items.forEach((item) => {
						if (item.uid === uid) {
							newCartItems.push({
								uid: item.uid,
								url: item.url,
								name: item.name,
								tag: item.tag,
								price: item.price,
								quantity: item.quantity - 1,
							});
						} else if (item.quantity > 0) {
							newCartItems.push(item);
						}
					});
					state.items = newCartItems;
				}
			}
		},
	},
});

export const { addItem, lessItem, deleteItem } = cartListSlice.actions;

export default cartListSlice.reducer;
