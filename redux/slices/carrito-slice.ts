import { createSlice } from "@reduxjs/toolkit";

export type CartItemType = {
	uid: string;
	url: string;
	name: string;
	tag: string;
	price: number;
	quantitySpanish: number;
	quantityEnglish: number;
};

export type CartListTypeState = {
	items: CartItemType[];
	cartDrawerOpen: boolean;
};

const initialState = {
	items: [],
	cartDrawerOpen: false,
} as CartListTypeState;

export const cartListSlice = createSlice({
	name: "cartListSlice",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const { uid, url, name, tag, price, type } = action.payload;
			const product = {
				uid,
				url,
				name,
				tag,
				price,
			} as CartItemType;

			const itemExist = state.items.find((item) => item.uid === uid);

			if (itemExist && type === "spanish") {
				let newCartItems = [] as CartItemType[];

				state.items.forEach((item) => {
					const cantES = item.quantitySpanish ? item.quantitySpanish : 0;

					if (item.uid === uid) {
						newCartItems.push({
							...item,
							quantitySpanish: cantES + 1,
						});
					} else {
						newCartItems.push(item);
					}
				});

				state.items = newCartItems;
			} else if (itemExist && type === "english") {
				let newCartItems = [] as CartItemType[];

				state.items.forEach((item) => {
					const cantEN = item.quantityEnglish ? item.quantityEnglish : 0;

					if (item.uid === uid) {
						newCartItems.push({
							...item,
							quantityEnglish: cantEN + 1,
						});
					} else {
						newCartItems.push(item);
					}
				});

				state.items = newCartItems;
			} else {
				if (type === "spanish") {
					state.items.push({ ...product, quantitySpanish: 1 });
				} else if (type === "english") {
					state.items.push({ ...product, quantityEnglish: 1 });
				}
			}
		},
		deleteItem: (state, action) => {
			const { uid } = action.payload;
			const newCartItems = state.items.filter((item) => item.uid !== uid);
			state.items = newCartItems;
		},
		lessItem: (state, action) => {
			const { uid, type } = action.payload;
			const itemExist = state.items.find((item) => item.uid === uid);

			if (itemExist) {
				if (type === "spanish") {
					if (itemExist.quantitySpanish == 1) {
						state.items = state.items.filter((item) => item.uid !== uid);
					} else {
						let newCartItems = [] as CartItemType[];
						state.items.forEach((item) => {
							if (item.uid === uid) {
								newCartItems.push({
									...item,
									quantitySpanish: item.quantitySpanish - 1,
								});
							} else if (item.quantitySpanish > 0) {
								newCartItems.push(item);
							}
						});
						state.items = newCartItems;
					}
				} else if (type === "english") {
					if (itemExist.quantityEnglish == 1) {
						state.items = state.items.filter((item) => item.uid !== uid);
					} else {
						let newCartItems = [] as CartItemType[];
						state.items.forEach((item) => {
							if (item.uid === uid) {
								newCartItems.push({
									...item,
									quantityEnglish: item.quantityEnglish - 1,
								});
							} else if (item.quantityEnglish > 0) {
								newCartItems.push(item);
							}
						});
						state.items = newCartItems;
					}
				}
			}
		},
		setClosecartDrawerOpen: (state) => {
			state.cartDrawerOpen = false;
		},
		setOpencartDrawerOpen: (state) => {
			state.cartDrawerOpen = true;
		},
	},
});

export const {
	addItem,
	lessItem,
	deleteItem,
	setClosecartDrawerOpen,
	setOpencartDrawerOpen,
} = cartListSlice.actions;

export default cartListSlice.reducer;
