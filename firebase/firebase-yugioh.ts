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
import axios from "axios";
import { YugiohCardType } from "../redux/slices/yugioh-slice";

const APIbaseURL =
	"https://private-anon-e0b4a3a079-yugiohprices.apiary-proxy.com/api/";

const collectionName = "yugiohCardList";

export const getCardList = async (): Promise<YugiohCardType[] | unknown> => {
	const cardListCollectionSnapshot = await getDocs(
		collection(db, collectionName),
	);

	let data = [] as YugiohCardType[];

	cardListCollectionSnapshot.forEach((doc) => {
		let cardList = doc.data() as YugiohCardType;
		data.push({
			...cardList,
		});
	});

	return data;
};

export const getCardData = async (name: string) => {
	const request = await axios.get(`${APIbaseURL}card_data/${name}`);
	return {
		...request.data.data,
	};
};

export const getCardPricing = async (tag: string) => {
	const request = await axios.get(`${APIbaseURL}price_for_print_tag/${tag}`);
	return {
		...request.data.data.price_data.price_data.data.prices,
	};
};

export const saveCard = async (
	card: {
		name: string;
		url: string;
		printTag: string;
		setName: string;
		rarity: string;
		cardType: string;
		attribute: string;
		Spanish: number;
		English: number;
		isActive: boolean;
	},
	uid: string,
): Promise<YugiohCardType | unknown> => {
	const cardRef = doc(db, collectionName, uid);

	try {
		await setDoc(cardRef, { ...card, uid });
		return (await getDoc(cardRef)).data() as YugiohCardType;
	} catch (error) {
		return error;
	}
};

export const updateCard = async (
	updatedCard: {
		name: string;
		url: string;
		printTag: string;
		setName: string;
		rarity: string;
		cardType: string;
		attribute: string;
		Spanish: number;
		English: number;
		isActive: boolean;
	},
	uid: string,
): Promise<YugiohCardType | unknown> => {
	const cardRef = doc(db, collectionName, uid);
	const snapShot = await getDoc(cardRef);
	if (snapShot.exists()) {
		try {
			await updateDoc(cardRef, updatedCard);
			return (await getDoc(cardRef)).data() as YugiohCardType;
		} catch (error) {
			return error;
		}
	}
}; 

//https://private-anon-e0b4a3a079-yugiohprices.apiary-proxy.com/api/price_for_print_tag/MAGO-EN023
