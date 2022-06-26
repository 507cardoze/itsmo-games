import { db } from './firebase-config';
import {
	getDoc,
	doc,
	setDoc,
	updateDoc,
	collection,
	query,
	where,
	getDocs,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { firestoreUserType } from '../redux/slices/auth-slice';
import { Order } from '../redux/slices/my-orders-slice';

const collectionName: string = 'users';

const pageSize: number = 20;

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

export const getClientOrdersByUid = async (id_client: string) => {
	try {
		const q = query(
			collection(db, 'orders'),
			where('userUid', '==', id_client),
			orderBy('created_at', 'desc')
		);
		const querySnapShot = await getDocs(q);
		if (querySnapShot.empty) return [];

		let data: Order[] = [];

		querySnapShot.forEach((doc) => {
			const order: Order = doc.data() as Order;
			data.push({
				...order,
			});
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const getClientByUid = async (uid: string) => {
	const clientRef = doc(db, collectionName, uid);

	try {
		const snapShot = await getDoc(clientRef);
		if (!snapShot.exists) throw new Error('Client not found');
		const client = snapShot.data() as firestoreUserType;
		return client;
	} catch (error) {
		throw error;
	}
};

export type UpdatedDataType = {
	displayName?: string;
	credit?: number;
	email?: string;
	isAdmin?: boolean;
	isBanned?: boolean;
};

export const updateClientByUid = async (
	uid: string,
	updatedData: UpdatedDataType
) => {
	const clientRef = doc(db, collectionName, uid);

	try {
		const snapShot = await getDoc(clientRef);
		if (!snapShot.exists) throw new Error('Client not found');
		await updateDoc(clientRef, updatedData);
	} catch (error) {
		throw error;
	}
};

export const getClientPaginated = async () => {
	try {
		const q = query(
			collection(db, collectionName),
			orderBy('displayName', 'desc'),
			limit(pageSize)
		);
		const querySnapShot = await getDocs(q);
		if (querySnapShot.empty) return [];

		let data: firestoreUserType[] = [];

		querySnapShot.forEach((doc) => {
			const client: firestoreUserType = doc.data() as firestoreUserType;
			data.push({
				...client,
			});
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const getClientPaginatedNextPage = async (last: string) => {
	try {
		const lastClientRef = doc(db, collectionName, last);
		const lastClientSnapshot = (await getDoc(lastClientRef)).data();

		if (!lastClientSnapshot) return [];

		const q = query(
			collection(db, collectionName),
			orderBy('displayName', 'desc'),
			startAfter(lastClientSnapshot['displayName']),
			limit(pageSize)
		);
		const querySnapShot = await getDocs(q);
		if (querySnapShot.empty) return [];

		let data: firestoreUserType[] = [];

		querySnapShot.forEach((doc) => {
			const client: firestoreUserType = doc.data() as firestoreUserType;
			data.push({
				...client,
			});
		});

		return data;
	} catch (error) {
		throw error;
	}
};