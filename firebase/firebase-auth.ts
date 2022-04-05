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
import { firestoreUserType, userAuthType } from "../redux/slices/auth-slice";

export const createUserProfileDocument = async (
	userAuth: userAuthType,
	additionalData: {
		phoneNumber?: string;
		displayName?: string;
	},
): Promise<firestoreUserType | unknown> => {
	if (!userAuth) return null;
	const userRef = doc(db, "users", userAuth.uid);
	const snapShot = await getDoc(userRef);

	if (!snapShot.exists()) {
		let newUserData = {
			uid: userAuth.uid,
			email: userAuth.email,
			displayName: userAuth.displayName,
			address1: "",
			address2: "",
			city: "",
			state: "",
			country: "",
			credit: 0,
			createdAt: new Date().toISOString(),
			isAdmin: false,
			isBanned: false,
			...additionalData,
		} as firestoreUserType;

		try {
			await setDoc(userRef, newUserData);
		} catch (error) {
			return error;
		}
	}

	const updatedDBUser = (await getDoc(userRef)).data() as firestoreUserType;

	return {
		...updatedDBUser,
	};
};
