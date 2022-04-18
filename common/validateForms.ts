import { round } from "lodash";
import { store } from "../redux/store";

export const validateCheckoutForm = (formData: {
	metodoPago: string;
	phoneNumber: string;
	address1: string;
	address2: string;
	city: string;
	useCredit: number;
}): boolean => {
	const { metodoPago, phoneNumber, address1, address2, city, useCredit } =
		formData;
	const cartItems = store.getState().cartListSlice.items;
	const currentUser = store.getState().AuthSlice.currentUser;

	if (!currentUser) return true;
	if (cartItems.length <= 0) return true;

	if (!metodoPago) return true;
	if (!phoneNumber) return true;
	if (!address1) return true;
	if (!address2) return true;
	if (!city) return true;

	if (currentUser.credit > 0) {
		if (useCredit < 0) return true;

		const subtotal = cartItems.reduce((acc, item) => {
			const cantES = item.quantitySpanish ? item.quantitySpanish : 0;
			const cantEN = item.quantityEnglish ? item.quantityEnglish : 0;
			const qty = cantES + cantEN;
			return acc + item.price * qty;
		}, 0);
		const itbms = subtotal * 0.07;

		const total = subtotal + itbms;

		if (useCredit > round(total, 2)) return true;

		if (useCredit > currentUser.credit) return true;
	}

	return false;
};
