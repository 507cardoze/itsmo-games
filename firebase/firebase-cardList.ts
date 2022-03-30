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
import {
	//CardDetail,
	CardType,
} from "../redux/slices/card-list-slice";
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

export const getCardData = async (name: string) => {
	const request = await axios.get(
		`https://private-anon-e0b4a3a079-yugiohprices.apiary-proxy.com/api/card_data/${name}`,
	);
	return {
		...request.data.data,
	};
};

export const getCardPricing = async (tag: string) => {
	const request = await axios.get(
		`https://private-anon-e0b4a3a079-yugiohprices.apiary-proxy.com/api/price_for_print_tag/${tag}`,
	);
	return {
		...request.data.data.price_data.price_data.data.prices,
	};
}

//https://private-anon-e0b4a3a079-yugiohprices.apiary-proxy.com/api/price_for_print_tag/MAGO-EN023