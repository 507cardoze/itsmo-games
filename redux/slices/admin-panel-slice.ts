import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { errorToast, successToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";
import { nanoid } from "@reduxjs/toolkit";
import { YugiohCardType } from "./yugioh-slice";
import { getCardList } from "../../firebase/firebase-yugioh";

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
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Firebase error", "Fallo al consultar la base de datos");
		}
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
			label: "Usuarios",
			children: [
				{
					label: "Clientes",
					subLabel: "Módulo de cliente para la administración pedidos.",
					href: "/panel-admin/client-panel",
				},
				// {
				// 	label: "Empleados",
				// 	subLabel: "Módulo de empleados para la administración de accesos.",
				// 	href: "#",
				// },
			],
		},
		{
			label: "Inventarios",
			children: [
				{
					label: "Yu-Gi-Oh! TCG",
					subLabel: "Módulo de administración cartas de Yu-Gi-Oh!.",
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
	},
});

export const { setModalInventory, setYugiohEditable, setisSubmmiting } =
	adminPanelSlice.actions;

export default adminPanelSlice.reducer;
