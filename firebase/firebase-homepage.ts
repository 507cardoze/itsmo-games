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

const collectionName = "homePageData";

export type FirestoreHomePageData = {
	calendarUrl: string;
};

export const getHomePageData = async (): Promise<
	FirestoreHomePageData | unknown
> => {
	const HomePageCollectionSnapshot = await getDocs(
		collection(db, collectionName),
	);

	let data = {} as FirestoreHomePageData;

	HomePageCollectionSnapshot.forEach((doc) => {
		let homePageData = doc.data() as FirestoreHomePageData;
		data = {
			...homePageData,
		};
	});

	return data;
};
