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
	LenguageCartModalState: boolean;
	editableItem: CartItemType | null;
	action: "add" | "less";
};

const initialState = {
	items: [],
	cartDrawerOpen: false,
	LenguageCartModalState: false,
	editableItem: null,
	action: "add",
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

			if (!itemExist) {
				if (type === "spanish") {
					state.items.push({ ...product, quantitySpanish: 1 });
				} else if (type === "english") {
					state.items.push({ ...product, quantityEnglish: 1 });
				}
				return;
			}

			let newCartItems = [] as CartItemType[];

			state.items.forEach((item) => {
				const cantEN = item.quantityEnglish ? item.quantityEnglish : 0;
				const cantES = item.quantitySpanish ? item.quantitySpanish : 0;

				if (item.uid === uid) {
					newCartItems.push({
						...item,
						[type === "spanish" ? "quantitySpanish" : "quantityEnglish"]:
							type === "spanish" ? cantES + 1 : cantEN + 1,
					});
				} else {
					newCartItems.push(item);
				}
			});

			state.items = newCartItems;
		},
		deleteItem: (state, action) => {
			const { uid } = action.payload;
			const newCartItems = state.items.filter((item) => item.uid !== uid);
			state.items = newCartItems;
		},
		lessItem: (state, action) => {
			const { uid, type } = action.payload;
			const itemExist = state.items.find((item) => item.uid === uid);
			if (!itemExist) return;
			switch (type) {
				case "spanish": {
					if (itemExist.quantitySpanish === 1 && !itemExist.quantityEnglish) {
						state.items = state.items.filter((item) => item.uid !== uid);
					} else {
						let newCartItems = [] as CartItemType[];

						const updatedValue =
							itemExist.quantitySpanish === 1
								? 0
								: itemExist.quantitySpanish - 1;

						state.items.forEach((item) => {
							if (item.uid === uid) {
								newCartItems.push({
									...item,
									quantitySpanish: updatedValue,
								});
							} else if (item.quantitySpanish > 0) {
								newCartItems.push(item);
							}
						});
						state.items = newCartItems;
					}
					break;
				}
				case "english": {
					if (!itemExist.quantitySpanish && itemExist.quantityEnglish === 1) {
						state.items = state.items.filter((item) => item.uid !== uid);
					} else {
						let newCartItems = [] as CartItemType[];

						const updatedValue =
							itemExist.quantityEnglish === 1
								? 0
								: itemExist.quantityEnglish - 1;

						state.items.forEach((item) => {
							if (item.uid === uid) {
								newCartItems.push({
									...item,
									quantityEnglish: updatedValue,
								});
							} else if (item.quantityEnglish > 0) {
								newCartItems.push(item);
							}
						});
						state.items = newCartItems;
					}
					break;
				}

				default: {
					break;
				}
			}
		},
		resetCart: (state) => {
			state.items = [];
		},
		setClosecartDrawerOpen: (state) => {
			state.cartDrawerOpen = false;
		},
		setOpencartDrawerOpen: (state) => {
			state.cartDrawerOpen = true;
		},
		setOpenLenguageCartModal: (state, { payload }) => {
			const { cartItem, action } = payload;
			state.action = action;
			state.editableItem = cartItem;
			state.LenguageCartModalState = true;
		},
		setCloseLenguageCartModal: (state) => {
			state.editableItem = null;
			state.LenguageCartModalState = false;
		},
	},
});

export const {
	addItem,
	lessItem,
	deleteItem,
	setClosecartDrawerOpen,
	setOpencartDrawerOpen,
	setOpenLenguageCartModal,
	setCloseLenguageCartModal,
	resetCart,
} = cartListSlice.actions;

export default cartListSlice.reducer;
