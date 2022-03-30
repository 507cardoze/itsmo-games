import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { FirebaseError } from "firebase/app";
import {
	getCardData,
	getCardList,
	getCardPricing,
} from "../../firebase/firebase-cardList";
import { errorToast } from "../../common/toast";

export type CardType = {
	dateCreated: string;
	name: string;
	printTag: string;
	uid: string;
	url: string;
};
export type CardTypeAPI = {
	dateCreated: string;
	name: string;
	printTag: string;
	uid: string;
	url: string;
	cardType: string;
	family: string;
	property: string;
	type: string;
	rarity: string;
	text: string;
	prices: Prices;
	atk: number;
	def: number;
	level: number;
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

export type CartListTypeState = {
	cardList: CardType[];
	cardDetail: CardTypeAPI | null;
	isLoadingCardList: boolean;
	searchTerm: string;
	filterBy: string;
};

const initialState = {
	cardList: [],
	cardDetail: null,
	isLoadingCardList: false,
	searchTerm: "",
	filterBy: "",
} as CartListTypeState;

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const getCards = createAsyncThunk<
	CardType[],
	undefined,
	AsyncThunkConfig
>("cardList-slice/getCards", async (_, thunkAPI) => {
	try {
		const cardsCollection = await getCardList();
		return cardsCollection as CardType[];
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
	CardTypeAPI,
	any,
	AsyncThunkConfig
>("cardList-slice/getCardDetails", async (args, thunkAPI) => {
	try {
		const { tag, name } = args;
		if (!tag || !name) {
			errorToast("Error", "Tag o nombre vacío");
			return thunkAPI.rejectWithValue(new Error("No tag or name"));
		}

		let data = {} as any;

		const cardsCollection = (await getCardList()) as CardType[];

		if (cardsCollection.length === 0) {
			errorToast("Error", "No hay cartas en la base de datos");
			return thunkAPI.rejectWithValue(new Error("No cards in DB"));
		}

		data = cardsCollection.find((card) => card.printTag === tag);

		if (!data) {
			errorToast("Error", "No se encontró la carta");
			return thunkAPI.rejectWithValue(new Error("No cards in DB"));
		}

		const APIcardData = await getCardData(name);

		if (!APIcardData) {
			errorToast("Error", "No se encontró la carta");
			return thunkAPI.rejectWithValue(new Error("No data in API externo"));
		}

		const APIcardPricing = await getCardPricing(tag);

		if (!APIcardPricing) {
			errorToast("Error", "No se encontró la carta");
			return thunkAPI.rejectWithValue(new Error("No price in API externo"));
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

export const CardListSlice = createSlice({
	name: "cardList",
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
} = CardListSlice.actions;

export default CardListSlice.reducer;
