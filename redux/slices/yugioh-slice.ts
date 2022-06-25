import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast } from "../../common/toast";
import {
	getCardByTag,
	getCardData,
	getCardList,
	getCardPricing,
} from '../../firebase/firebase-yugioh';
import handleRequestError from '../../common/handleRequestError';
import { performAlgoliaSearch } from '../../algolia/yugiohList';

export type YugiohCardType = {
	dateCreated: string;
	name: string;
	printTag: string;
	uid: string;
	url: string;
	English: number;
	Spanish: number;
	rarity: string;
	attribute: string;
	cardType: string;
	tcgName: string;
	setName: string;
	cardProperty: string;
	isActive: boolean;
};

export type YugiohCardTypeAPI = {
	dateCreated: string;
	name: string;
	printTag: string;
	uid: string;
	url: string;
	cardType: string;
	family: string;
	property: string;
	attribute: string;
	setName: string;
	type: string;
	rarity: string;
	text: string;
	prices: Prices;
	atk: number;
	def: number;
	level: number;
	English: number;
	Spanish: number;
};

export interface Prices {
	high: number;
	low: number;
	average: number;
	shift: number;
	shift_3: number;
	shift_7: number;
	shift_21: number;
	shift_30: number;
	shift_90: number;
	shift_180: number;
	shift_365: number;
	updated_at: string;
}

export type YugiohCartListTypeState = {
	cardList: YugiohCardType[];
	cardDetail: YugiohCardTypeAPI | null;
	isLoadingCardList: boolean;
	isOpenLenguageModal: boolean;
	lenguageModalType: 'add' | 'less';
};

const initialState = {
	cardList: [],
	cardDetail: null,
	isLoadingCardList: false,
	isOpenLenguageModal: false,
	lenguageModalType: 'add',
} as YugiohCartListTypeState;

type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };

export const getCards = createAsyncThunk<
	YugiohCardType[],
	void,
	AsyncThunkConfig
>('yugiohCardListSlice/getCards', async (_, thunkAPI) => {
	try {
		const cardsCollection = await getCardList();
		return cardsCollection as YugiohCardType[];
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const getCardBySearchName = createAsyncThunk<
	YugiohCardType[],
	{
		searchTerm: string;
	},
	AsyncThunkConfig
>('yugiohCardListSlice/getCardBySearchName', async (args, thunkAPI) => {
	const { searchTerm } = args;

	try {
		const data = await performAlgoliaSearch(searchTerm);
		return data;
	} catch (error) {
		console.log('error: ', error);
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const getCardDetails = createAsyncThunk<
	YugiohCardTypeAPI,
	any,
	AsyncThunkConfig
>('yugiohCardListSlice/getCardDetails', async (args, thunkAPI) => {
	try {
		const { tag, name } = args;
		if (!tag || !name) {
			return thunkAPI.rejectWithValue('No tag or name');
		}

		let data = {} as any;

		const localCollection = thunkAPI.getState().YugiohCardListSlice.cardList;

		if (localCollection.length) {
			data = localCollection.find((card) => card.printTag === tag);
		} else {
			const cardObject = (await getCardByTag(tag)) as YugiohCardType;

			data = cardObject;

			if (!data) {
				errorToast('Error', 'No se encontró la carta');
				return thunkAPI.rejectWithValue('No cards in DB');
			}
		}

		const APIcardData = await getCardData(name);

		if (!APIcardData) {
			errorToast('Error', 'No se encontró la data de la carta');
			return thunkAPI.rejectWithValue('No data in API externo');
		}

		const APIcardPricing = await getCardPricing(tag);

		if (!APIcardPricing) {
			errorToast('Error', 'No se encontró el precio de la carta');
			return thunkAPI.rejectWithValue('No price in API externo');
		}

		data = { ...data, ...APIcardData, prices: { ...APIcardPricing } };

		return data;
	} catch (error) {
		console.log(error);
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const YugiohCardListSlice = createSlice({
	name: 'yugiohCardListSlice',
	initialState,
	reducers: {
		startFetchingCardList: (state) => {
			state.isLoadingCardList = true;
		},
		stopFetchingCardList: (state) => {
			state.isLoadingCardList = false;
		},
		setOpenLenguageModal: (state) => {
			state.isOpenLenguageModal = true;
		},
		setCloseLenguageModal: (state) => {
			state.isOpenLenguageModal = false;
		},
		setlenguageModalType: (state, action) => {
			state.lenguageModalType = action.payload;
		},
		setResetCardDetail: (state) => {
			state.cardDetail = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getCards.fulfilled, (state, action) => {
				state.cardList = action.payload;
			})
			.addCase(getCardBySearchName.fulfilled, (state, action) => {
				state.cardList = action.payload;
				state.isLoadingCardList = false;
			})
			.addCase(getCardBySearchName.pending, (state) => {
				state.isLoadingCardList = true;
			})
			.addCase(getCardBySearchName.rejected, (state) => {
				state.cardList = [];
				state.isLoadingCardList = false;
			})
			.addCase(getCardDetails.fulfilled, (state, action) => {
				state.cardDetail = action.payload;
			});
	},
});

export const {
	startFetchingCardList,
	stopFetchingCardList,
	setOpenLenguageModal,
	setCloseLenguageModal,
	setlenguageModalType,
	setResetCardDetail,
} = YugiohCardListSlice.actions;

export default YugiohCardListSlice.reducer;
