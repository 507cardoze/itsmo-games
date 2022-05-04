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
import { firestoreUserType } from "../redux/slices/auth-slice";

const collectionName = "users";

export const getDBClients = async (): Promise<firestoreUserType[] | null> => {
	try {
		const clientSnapshot = await getDocs(collection(db, collectionName));
		let data = [] as firestoreUserType[];
		clientSnapshot.forEach((doc) => {
			let client = doc.data() as firestoreUserType;
			data.push({
				...client,
			});
		});
		return data;
	} catch (error) {
		return null;
	}
};
