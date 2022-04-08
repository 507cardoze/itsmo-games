import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import {
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase-config";
import { successToast, errorToast, warnToast } from "../../common/toast";
import { FirebaseError } from "firebase/app";
import { createUserProfileDocument } from "../../firebase/firebase-auth";

export type userAuthType = {
	uid: string;
	displayName: string | null;
	email: string | null;
	phoneNumber: null | string;
};

export type firestoreUserType = {
	uid: string;
	email: string;
	displayName: string;
	phoneNumber: string;
	createdAt: string;
	isAdmin: boolean;
	isBanned: boolean;
	credit: number;
};

export type AuthStateType = {
	currentUser: firestoreUserType | null;
	isAuthLoading: boolean;
	isOpenAuthModal: boolean;
	isDrawerOpen: boolean;
	authForm: "login" | "register";
};

const initialState = {
	currentUser: null,
	isAuthLoading: false,
	isOpenAuthModal: false,
	isDrawerOpen: false,
	authForm: "login",
} as AuthStateType;

type AsyncThunkConfig = { state: RootState; dispatch?: AppDispatch };

export const createUserWithEmail = createAsyncThunk<
	firestoreUserType,
	{
		email: string;
		password: string;
		displayName: string;
	},
	AsyncThunkConfig
>("auth/createUserWithEmail", async (args, thunkAPI) => {
	const { email, password, displayName } = args;
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const userQuery = (await createUserProfileDocument(userCredentials.user, {
			displayName,
			phoneNumber: "",
		})) as firestoreUserType;

		if (userQuery.isBanned) {
			errorToast(
				"Auth - Error",
				"Tu cuenta esta suspendida, contacte al administrador",
			);
			return thunkAPI.rejectWithValue("banned player");
		} else {
			successToast(
				"Inicio de sesión exitoso.",
				"¡Has validado tu información correctamente!, ¡bienvenido!",
			);
			return userQuery as firestoreUserType;
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Auth - Error", "Fallo la creación de usuario.");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const signInUserWithEmail = createAsyncThunk<
	firestoreUserType,
	{
		email: string;
		password: string;
	},
	AsyncThunkConfig
>("auth/signInUserWithEmail", async (args, thunkAPI) => {
	const { email, password } = args;
	try {
		const userCredentials = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const userQuery = (await createUserProfileDocument(
			userCredentials.user,
			{},
		)) as firestoreUserType;

		if (userQuery.isBanned) {
			errorToast(
				"Auth - Error",
				"Tu cuenta esta suspendida, contacte al administrador.",
			);
			return thunkAPI.rejectWithValue("banned player");
		} else {
			successToast(
				"Inicio de sesión exitoso.",
				"¡Has validado tu información correctamente!",
			);
			return userQuery as firestoreUserType;
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast(
				"Auth - Error",
				"Fallo el inicio de sesión con correo y contrasena.",
			);
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const signInWithGoogle = createAsyncThunk<
	firestoreUserType,
	void,
	AsyncThunkConfig
>("auth/signInWithGoogle", async (_, thunkAPI) => {
	try {
		const userCredentials = await signInWithPopup(auth, googleProvider);
		const userQuery = (await createUserProfileDocument(userCredentials.user, {
			phoneNumber: userCredentials.user.phoneNumber
				? userCredentials.user.phoneNumber
				: "",
		})) as firestoreUserType;

		if (userQuery.isBanned) {
			errorToast(
				"Auth - Error",
				"Tu cuenta esta suspendida, contacte al administrador.",
			);
			return thunkAPI.rejectWithValue("banned player");
		} else {
			successToast(
				"Inicio de sesión exitoso.",
				"¡Has validado tu información correctamente!",
			);
			return userQuery as firestoreUserType;
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Auth - Error", "Fallo el inicio de sesión con google.");
		}
		return thunkAPI.rejectWithValue(error);
	}
});

export const signoutSession = createAsyncThunk<
	void,
	void | string,
	AsyncThunkConfig
>("auth/signoutSession", async (args, thunkAPI) => {
	try {
		await signOut(auth);
		if (args === "withToast") {
			warnToast(
				"Has cerrado sesión con exito.",
				"¡Esperamos tenerte de vuelta!",
			);
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			errorToast(`${error.name}`, `${error.code}`);
		} else {
			errorToast("Auth - Error", "Fallo al cerrar sesión.");
		}
		thunkAPI.rejectWithValue(error);
	}
});

export const isUserAuthenticated = createAsyncThunk<
	firestoreUserType,
	userAuthType | null,
	AsyncThunkConfig
>("auth/isUserAuthenticated", async (userAuth, thunkAPI) => {
	try {
		if (!userAuth) {
			return thunkAPI.rejectWithValue("No existing session active.");
		}
		const restoredUserInfo = (await createUserProfileDocument(
			userAuth as userAuthType,
			{},
		)) as firestoreUserType;

		if (restoredUserInfo.isBanned) {
			thunkAPI.dispatch(signoutSession());
			errorToast(
				"Auth - Error",
				"Tu cuenta esta suspendida, contacte al administrador.",
			);
			return thunkAPI.rejectWithValue("banned player");
		} else {
			return restoredUserInfo as firestoreUserType;
		}
	} catch (error) {
		thunkAPI.dispatch(signoutSession());
		return thunkAPI.rejectWithValue(error);
	}
});

export const AuthSlice = createSlice({
	name: "auth-slice",
	initialState,
	reducers: {
		startAuthLoading: (state) => {
			state.isAuthLoading = true;
		},
		stopAuthLoading: (state) => {
			state.isAuthLoading = false;
		},
		setAuthFormToLogin: (state) => {
			state.authForm = "login";
		},
		setAuthFormToRegister: (state) => {
			state.authForm = "register";
		},
		onCloseModalAuth: (state) => {
			state.isOpenAuthModal = false;
		},
		onOpenModalAuth: (state) => {
			state.isOpenAuthModal = true;
		},
		onCloseDrawerMenu: (state) => {
			state.isDrawerOpen = false;
		},
		onOpenDrawerMenu: (state) => {
			state.isDrawerOpen = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				return;
			})
			.addCase(createUserWithEmail.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				return;
			})
			.addCase(signInUserWithEmail.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				return;
			})
			.addCase(isUserAuthenticated.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				return;
			})
			.addCase(signoutSession.fulfilled, (state) => {
				state.currentUser = null;
				return;
			});
	},
});

export const {
	startAuthLoading,
	stopAuthLoading,
	onCloseModalAuth,
	onOpenModalAuth,
	setAuthFormToLogin,
	setAuthFormToRegister,
	onCloseDrawerMenu,
	onOpenDrawerMenu,
} = AuthSlice.actions;

export default AuthSlice.reducer;
