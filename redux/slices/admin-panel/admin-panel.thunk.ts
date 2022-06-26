import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import handleRequestError from '../../../common/handleRequestError';
import { successToast } from '../../../common/toast';
import {
	getClientByUid,
	getClientOrdersByUid,
	getClientPaginated,
	getClientPaginatedNextPage,
	getDBClients,
	updateClientByUid,
	UpdatedDataType,
} from '../../../firebase/firebase-clients';
import {
	getCardList,
	getMoreCardList,
	saveCard,
	updateCard,
} from '../../../firebase/firebase-yugioh';
import { AppDispatch, RootState } from '../../store';
import { firestoreUserType } from '../auth-slice';
import { Order } from '../my-orders-slice';
import { YugiohCardType } from '../yugioh-slice';

type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };

export const loadYugiOhInventory = createAsyncThunk<
	YugiohCardType[],
	undefined,
	AsyncThunkConfig
>('admin-panel/loadYugiOhInventory', async (_, thunkAPI) => {
	try {
		const cardsCollection = await getCardList();
		return cardsCollection as YugiohCardType[];
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const loadMoreYugiOhInventory = createAsyncThunk<
	YugiohCardType[],
	{
		last: string;
	},
	AsyncThunkConfig
>('yugiohCardListSlice/loadMoreYugiOhInventory', async (args, thunkAPI) => {
	const { last } = args;
	try {
		const cardsCollection = await getMoreCardList(last);
		return cardsCollection as YugiohCardType[];
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const saveNewCard = createAsyncThunk<
	YugiohCardType,
	{
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
	AsyncThunkConfig
>('admin-panel/saveCard', async (card, thunkAPI) => {
	try {
		const {
			name,
			url,
			printTag,
			setName,
			rarity,
			cardType,
			attribute,
			Spanish,
			English,
			isActive,
		} = card;
		const uid = nanoid();

		const savedCard = (await saveCard(
			{
				name,
				url,
				printTag,
				setName,
				rarity,
				cardType,
				attribute,
				Spanish,
				English,
				isActive,
			},
			uid
		)) as YugiohCardType;

		successToast('Carta guardada', 'La carta fue guardada correctamente.');

		return savedCard;
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const updateCardItem = createAsyncThunk<
	YugiohCardType,
	{
		uid: string;
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
	AsyncThunkConfig
>('admin-panel/updateCardItem', async (card, thunkAPI) => {
	try {
		const {
			name,
			url,
			printTag,
			setName,
			rarity,
			cardType,
			attribute,
			Spanish,
			English,
			uid,
			isActive,
		} = card;

		const savedCard = (await updateCard(
			{
				name,
				url,
				printTag,
				setName,
				rarity,
				cardType,
				attribute,
				Spanish,
				English,
				isActive,
			},
			uid
		)) as YugiohCardType;

		successToast(
			'Carta Actualizada.',
			'La carta fue actualizada correctamente.'
		);

		return savedCard;
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const getClientList = createAsyncThunk<
	firestoreUserType[],
	void,
	AsyncThunkConfig
>('admin-panel/getClientList', async (_, thunkAPI) => {
	try {
		const listClient = await getDBClients();
		if (listClient) return listClient;
		return thunkAPI.rejectWithValue('No se pudo obtener la lista de clientes');
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const getClientOrdersById = createAsyncThunk<
	Order[],
	{
		id_client: string;
	},
	AsyncThunkConfig
>('admin-panel/getClientOrdersById', async (args, thunkAPI) => {
	const { id_client } = args;
	try {
		const orders = await getClientOrdersByUid(id_client);
		return orders;
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const getClientInfo = createAsyncThunk<
	firestoreUserType,
	{
		id_client: string;
	},
	AsyncThunkConfig
>('admin-panel/getClientInfo', async (args, thunkAPI) => {
	const { id_client } = args;
	try {
		const client = await getClientByUid(id_client);
		return client;
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const updateClientInfo = createAsyncThunk<
	void,
	{
		id_client: string;
		updateData: UpdatedDataType;
	},
	AsyncThunkConfig
>('admin-panel/updateClientInfo', async (args, thunkAPI) => {
	const { id_client, updateData } = args;
	try {
		await updateClientByUid(id_client, updateData);
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const getClientInit = createAsyncThunk<
	firestoreUserType[],
	void,
	AsyncThunkConfig
>('admin-panel/getClientInit', async (_, thunkAPI) => {
	try {
		const response = await getClientPaginated();
		return response;
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const getNextClient = createAsyncThunk<
	firestoreUserType[],
	{
		last: string;
	},
	AsyncThunkConfig
>('admin-panel/getNextClient', async (args, thunkAPI) => {
	const { last } = args;
	try {
		const response = await getClientPaginatedNextPage(last);
		return response;
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

