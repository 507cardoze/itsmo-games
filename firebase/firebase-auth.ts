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
import {
	confirmPasswordReset,
	deleteUser,
	getAuth,
	reauthenticateWithCredential,
	sendPasswordResetEmail,
	updatePassword,
} from "firebase/auth";

const collectionName = "users";

export const createUserProfileDocument = async (
	userAuth: userAuthType,
	additionalData: {
		phoneNumber?: string;
		displayName?: string;
	},
): Promise<firestoreUserType | unknown> => {
	if (!userAuth) return null;
	const userRef = doc(db, collectionName, userAuth.uid);
	const snapShot = await getDoc(userRef);

	if (!snapShot.exists()) {
		let newUserData = {
			uid: userAuth.uid,
			email: userAuth.email,
			displayName: userAuth.displayName,
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

// const reauthenticate = async () => {
// 	const auth = getAuth();
// const user = auth.currentUser;
// const credential = promptForCredentials();

// await reauthenticateWithCredential(user, credential);
// }

export const updateUserPassword = async (newPassword: string) => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (!user) return null;
	try {
		await updatePassword(user, newPassword);
	} catch (error) {
		return error;
	}
};

export const sendUserPasswordResetEmail = async (email: string) => {
	const auth = getAuth();

	// const actionCodeSettings = {
	// 	url: `https://www.example.com/?email=${email}`,
	// };

	//await sendPasswordResetEmail(auth, email, actionCodeSettings);
	await sendPasswordResetEmail(auth, email);
};

export const confirmUserPasswordReset = async (
	code: string,
	newPassword: string,
) => {
	const auth = getAuth();
	await confirmPasswordReset(auth, code, newPassword);
};

export const deleteMyAccount = async () => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (!user) return null;
	await deleteUser(user);
};


