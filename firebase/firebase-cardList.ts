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
import { CardDetail, CardType } from "../redux/slices/card-list-slice";
import axios from "axios";

export const getCardList = async (): Promise<CardType[] | unknown> => {
	const cardListCollectionSnapshot = await getDocs(collection(db, "cardList"));

	let data = [] as CardType[];

	cardListCollectionSnapshot.forEach((doc) => {
		let cardList = doc.data() as CardType;
		data.push({
			...cardList,
		});
	});

	return data;
};

export const getCardDetail = async (): Promise<CardDetail | unknown> => {
	try {
		return (
			await axios.get(`https://yugiohprices.com/api/price_for_print_tag/${"MAGO-EN023"}`)
		).data.data;
	} catch (error) {
		return error;
	}
};
//https://yugiohprices.com/api/price_for_print_tag/MAGO-EN023