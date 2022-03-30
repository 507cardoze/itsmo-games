import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { FirebaseError } from "firebase/app";
import { getCardDetail, getCardList } from "../../firebase/firebase-cardList";
import { errorToast } from "../../common/toast";

export type CardType = {
	dateCreated: string;
	name: string;
	printTag: string;
	uid: string;
	url: string;
};

export interface CardDetail {
	name: string;
	card_type: string;
	property: null;
	family: string;
	type: string;
	price_data: CardDetailPriceData;
}

export interface CardDetailPriceData {
	name: string;
	print_tag: string;
	rarity: string;
	price_data: PriceDataPriceData;
}

export interface PriceDataPriceData {
	status: string;
	data: Data;
}

export interface Data {
	listings: any[];
	prices: Prices;
}

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
	cardDetail: CardDetail | null;
	isLoadingCardList: boolean;
};

const initialState = {
	cardList: [],
	cardDetail: null,
	isLoadingCardList: false,
} as CartListTypeState;

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const getCards = createAsyncThunk<
	CardType[],
	undefined,
	AsyncThunkConfig
>("cardList-slice/getCards", async (_, thunkAPI) => {
	try {
		const cardsCollecton = await getCardList();
		return cardsCollecton as CardType[];
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Firebase error", "Fallo al consultar la base de datos");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const getDetailsByname = createAsyncThunk<
	CardDetail,
	undefined,
	AsyncThunkConfig
>("cardList-slice/getDetailsByname", async (_, thunkAPI) => {
	try {
		const CardDetail = await getCardDetail();
		console.log("CardDetail: ", CardDetail);
		if (!CardDetail) {
			errorToast("API error", "Fallo al consultar el API externo");
			return thunkAPI.rejectWithValue("Fallo al consultar el API externo");
		}
		return CardDetail as CardDetail;
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Firebase error", "Fallo al consultar la base de datos");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const CartListSlice = createSlice({
	name: "cartList",
	initialState,
	reducers: {
		startFetchingCardList: (state) => {
			state.isLoadingCardList = true;
		},
		stopFetchingCardList: (state) => {
			state.isLoadingCardList = false;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getCards.fulfilled, (state, action) => {
				state.cardList = action.payload;
			})
			.addCase(getDetailsByname.fulfilled, (state, action) => {
				state.cardDetail = action.payload;
			});
	},
});

export const { startFetchingCardList, stopFetchingCardList } =
	CartListSlice.actions;

export default CartListSlice.reducer;
