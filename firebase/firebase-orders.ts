import { db } from "./firebase-config";
import {
	getDoc,
	doc,
	setDoc,
	updateDoc,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";

const collectionName = "orders";

export type order = {
	uid: string;
	userUid: string;
	address1: string;
	address2: string;
	city: string;
	metodoPago: string;
	phoneNumber: string;
	useCredit: number;
	items: any;
	created_at: string;
	status: string;
};

export const saveOrder = async (order: order) => {
	const orderRef = doc(db, collectionName, order.uid);
	try {
		await setDoc(orderRef, order);
		return (await getDoc(orderRef)).data() as order;
	} catch (error) {
		return error;
	}
};
