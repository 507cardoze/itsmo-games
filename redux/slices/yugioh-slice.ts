import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";
import {
	getCardData,
	getCardList,
	getCardPricing,
} from "../../firebase/firebase-yugioh";

export type YugiohCardType = {
	dateCreated: string;
	name: string;
	printTag: string;
	uid: string;
	url: string;
	English: number;
	Spanish: number;
	rarity: string;
	cardType: string;
	tcgName: string;
	setName: string;
	cardProperty: string;
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
	searchTerm: string;
	filterBy: string;
	isOpenLenguageModal: boolean;
	lenguageModalType: "add" | "less";
};

const initialState = {
	cardList: [],
	cardDetail: null,
	isLoadingCardList: false,
	searchTerm: "",
	filterBy: "",
	isOpenLenguageModal: false,
	lenguageModalType: "add",
} as YugiohCartListTypeState;

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const getCards = createAsyncThunk<
	YugiohCardType[],
	undefined,
	AsyncThunkConfig
>("cardList-slice/getCards", async (_, thunkAPI) => {
	try {
		const cardsCollection = await getCardList();
		return cardsCollection as YugiohCardType[];
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Firebase error", "Fallo al consultar la base de datos");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const getCardDetails = createAsyncThunk<
	YugiohCardTypeAPI,
	any,
	AsyncThunkConfig
>("cardList-slice/getCardDetails", async (args, thunkAPI) => {
	try {
		const { tag, name } = args;
		if (!tag || !name) {
			return thunkAPI.rejectWithValue("No tag or name");
		}

		let data = {} as any;

		const cardsCollection = (await getCardList()) as YugiohCardType[];

		if (cardsCollection.length === 0) {
			errorToast("Error", "Esta carta no existe");
			return thunkAPI.rejectWithValue("Esta carta no existe");
		}

		data = cardsCollection.find((card) => card.printTag === tag);

		if (!data) {
			errorToast("Error", "No se encontró la carta");
			return thunkAPI.rejectWithValue("No cards in DB");
		}

		const APIcardData = await getCardData(name);

		if (!APIcardData) {
			errorToast("Error", "No se encontró la data de la carta");
			return thunkAPI.rejectWithValue("No data in API externo");
		}

		const APIcardPricing = await getCardPricing(tag);

		if (!APIcardPricing) {
			errorToast("Error", "No se encontró el precio de la carta");
			return thunkAPI.rejectWithValue("No price in API externo");
		}

		data = { ...data, ...APIcardData, prices: { ...APIcardPricing } };

		return data;
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Firebase error", "Fallo al consultar la base de datos");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const YugiohCardListSlice = createSlice({
	name: "yugiohCardListSlice",
	initialState,
	reducers: {
		startFetchingCardList: (state) => {
			state.isLoadingCardList = true;
		},
		stopFetchingCardList: (state) => {
			state.isLoadingCardList = false;
		},
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
		setFilterBy: (state, action) => {
			state.filterBy = action.payload;
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
			.addCase(getCardDetails.fulfilled, (state, action) => {
				state.cardDetail = action.payload;
			});
	},
});

export const {
	startFetchingCardList,
	stopFetchingCardList,
	setSearchTerm,
	setFilterBy,
	setOpenLenguageModal,
	setCloseLenguageModal,
	setlenguageModalType,
	setResetCardDetail,
} = YugiohCardListSlice.actions;

export default YugiohCardListSlice.reducer;
