import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { successToast } from "../../common/toast";
import { YugiohCardType } from "./yugioh-slice";
import {
	getCardList,
	saveCard,
	updateCard,
} from "../../firebase/firebase-yugioh";
import { firestoreUserType } from "./auth-slice";
import { getDBClients } from "../../firebase/firebase-clients";
import handleRequestError from "../../common/handleRequestError";

export type NavItem = {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
};

export type adminPanelState = {
	navItems: NavItem[];
	isFetchingData: boolean;
	isModalInventoryOpen: boolean;
	yugiohInventory: YugiohCardType[];
	yugiohEditable: YugiohCardType | null;
	yugiohCardTypes: string[];
	yugiohCardAttributes: string[];
	yugiohCardRarities: string[];
	isSubmmiting: boolean;
	clientList: firestoreUserType[];
};

export type YugiohCardMutableData = {
	url: string;
	name: string;
	rarity: string;
	attribute: string;
	cardType: string;
	printTag: string;
	setName: string;
	Spanish: number;
	English: number;
	isActive: boolean;
};

export const loadYugiOhInventory = createAsyncThunk<
	YugiohCardType[],
	undefined,
	AsyncThunkConfig
>("admin-panel/loadYugiOhInventory", async (_, thunkAPI) => {
	try {
		const cardsCollection = await getCardList();
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
>("admin-panel/saveCard", async (card, thunkAPI) => {
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
			uid,
		)) as YugiohCardType;

		successToast("Carta guardada", "La carta fue guardada correctamente.");

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
>("admin-panel/updateCardItem", async (card, thunkAPI) => {
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
			uid,
		)) as YugiohCardType;

		successToast(
			"Carta Actualizada.",
			"La carta fue actualizada correctamente.",
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
>("admin-panel/getClientList", async (_, thunkAPI) => {
	try {
		const listClient = await getDBClients();
		if (listClient) return listClient;
		return thunkAPI.rejectWithValue("No se pudo obtener la lista de clientes");
	} catch (error) {
		handleRequestError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	yugiohCardTypes: [
		"Agua",
		"Beast",
		"Beast-Warrior",
		"Cyberse",
		"Dinosaur",
		"Divine-Beast",
		"Dragon",
		"Effect",
		"Fairy",
		"Fiend",
		"Fish",
		"Fusion",
		"Insect",
		"Link",
		"Machine",
		"Pendulum",
		"Plant",
		"Psychic",
		"Pyro",
		"Reptile",
		"Ritual",
		"Rock",
		"Sea Serpent",
		"Spellcaster",
		"Thunder",
		"Tuner",
		"Warrior",
		"Winged Beast",
		"Wyrm",
		"Zombie",
	],
	yugiohCardAttributes: [
		"Air",
		"Dark",
		"Divine",
		"Earth",
		"Fire",
		"Light",
		"Water",
		"Wind",
	],
	yugiohCardRarities: [
		"Common",
		"Duel Terminal",
		"Ghost Rare",
		"Gold Rare",
		"Parallel",
		"Prismatic Secret Rare",
		"Rare",
		"Secret Rare",
		"Super Rare",
		"Ultimate Rare",
		"Ultra Rare",
	],
	isSubmmiting: false,
	yugiohEditable: null,
	isModalInventoryOpen: false,
	isFetchingData: true,
	yugiohInventory: [],
	navItems: [
		{
			label: "Ordenes",
			children: [
				{
					label: "Por clientes",
					//subLabel: "Ordenes por clientes",
					href: "/panel-admin/client-panel",
				},
				{
					label: "Por Ordenes individuales",
					//subLabel: "Ordenes por ordenes individuales",
					href: "/panel-admin/orders-panel",
				},
			],
		},
		{
			label: "Inventarios",
			children: [
				{
					label: "Yu-Gi-Oh! TCG",
					//åsubLabel: "Módulo de administración cartas",
					href: "/panel-admin/inventory?tcg=yugioh",
				},
				// {
				// 	label: "Pokémon TCG",
				// 	subLabel: "Módulo de administración cartas de Pokémon TCG.",
				// 	href: "#",
				// },
				// {
				// 	label: "Magic: The Gathering",
				// 	subLabel: "Módulo de administración cartas de Magic: The Gathering.",
				// 	href: "#",
				// },
			],
		},
	],
	clientList: [],
} as adminPanelState;

type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };



export const adminPanelSlice = createSlice({
	name: "admin-panel-slice",
	initialState,
	reducers: {
		setModalInventory: (state, action) => {
			state.isModalInventoryOpen = action.payload;
		},
		setYugiohEditable: (state, action) => {
			state.yugiohEditable = action.payload;
		},
		setisSubmmiting: (state, action) => {
			state.isSubmmiting = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadYugiOhInventory.pending, (state) => {
			state.isFetchingData = true;
		});
		builder.addCase(loadYugiOhInventory.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.yugiohInventory = action.payload;
		});
		builder.addCase(loadYugiOhInventory.rejected, (state) => {
			state.isFetchingData = false;
		});
		builder.addCase(saveNewCard.fulfilled, (state, action) => {
			state.yugiohInventory.push(action.payload);
		});
		builder.addCase(updateCardItem.fulfilled, (state, action) => {
			const index = state.yugiohInventory.findIndex(
				(card) => card.uid === action.payload.uid,
			);
			state.yugiohInventory[index] = action.payload;
		});
		builder.addCase(getClientList.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.clientList = action.payload;
		});
		builder.addCase(getClientList.pending, (state, action) => {
			state.isFetchingData = true;
		});
		builder.addCase(getClientList.rejected, (state, action) => {
			state.isFetchingData = false;
		});
	},
});

export const { setModalInventory, setYugiohEditable, setisSubmmiting } =
	adminPanelSlice.actions;

export default adminPanelSlice.reducer;
