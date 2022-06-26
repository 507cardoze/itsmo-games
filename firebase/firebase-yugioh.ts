import { db } from './firebase-config';
import {
	getDoc,
	doc,
	setDoc,
	updateDoc,
	collection,
	query,
	getDocs,
	limit,
	orderBy,
	where,
	startAfter,
	QueryDocumentSnapshot,
	DocumentData,
} from 'firebase/firestore';
import axios from 'axios';
import { YugiohCardType } from '../redux/slices/yugioh-slice';

const pageSize: number = 12;

const APIbaseURL: string =
	'https://private-anon-309aa231ab-yugiohprices.apiary-proxy.com/api/';

const collectionName: string = 'yugiohCardList';

export type YugiohResultType = {
	data: YugiohCardType[];
	lastVisible: QueryDocumentSnapshot<DocumentData> | null;
};

export const getCardList = async (): Promise<YugiohCardType[] | unknown> => {
	const cardListCollectionSnapshot = await getDocs(
		query(
			collection(db, collectionName),
			orderBy('name', 'asc'),
			limit(pageSize)
		)
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

export const getMoreCardList = async (
	last: string
): Promise<YugiohCardType[] | unknown> => {
	try {
		const lastRef = doc(db, collectionName, last);
		const lastSnapshot = (await getDoc(lastRef)).data();

		if (!lastSnapshot) return [];

		const q = query(
			collection(db, collectionName),
			orderBy('name', 'asc'),
			startAfter(lastSnapshot['name']),
			limit(pageSize)
		);

		const querySnapShot = await getDocs(q);
		if (querySnapShot.empty) return [];

		let data: YugiohCardType[] = [];

		querySnapShot.forEach((doc) => {
			let cardList = doc.data() as YugiohCardType;
			data.push({
				...cardList,
			});
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const getCardByTag = async (tag: string) => {
	const q = query(collection(db, collectionName), where('printTag', '==', tag));
	const querySnapShot = await getDocs(q);

	if (!querySnapShot.empty && querySnapShot.size > 0) {
		const card = querySnapShot.docs[0].data() as YugiohCardType;
		return card;
	} else {
		return null;
	}
};

export const getCardData = async (name: string) => {
	const encoded = encodeURI(name);
	try {
		const request = await axios.get(`${APIbaseURL}card_data/${encoded}`);
		return {
			...request.data.data,
		};
	} catch (error) {
		throw error;
	}
};

export const getCardPricing = async (tag: string) => {
	const encoded = encodeURI(tag);
	try {
		const request = await axios.get(
			`${APIbaseURL}price_for_print_tag/${encoded}`
		);
		return {
			...request.data.data.price_data.price_data.data.prices,
		};
	} catch (error) {
		throw error;
	}
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
	uid: string
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
	uid: string
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
