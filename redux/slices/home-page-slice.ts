import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { getHomePageData } from "../../firebase/firebase-homepage";
import handleRequestError from "../../common/handleRequestError";

export type HomePageState = {
	isLoadingHomePage: boolean;
	calendarUrl: string | null;
};

const initialState = {
	isLoadingHomePage: true,
	calendarUrl: null,
} as HomePageState;

type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };

export const loadHomePageInfo = createAsyncThunk<any, void, AsyncThunkConfig>(
	"homePage/loadData",
	async (_, thunkAPI) => {
		try {
			const homePageData = await getHomePageData();

			if (!homePageData) return thunkAPI.rejectWithValue("No data");

			return homePageData;
		} catch (error) {
			handleRequestError(error);
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const HomePageSlice = createSlice({
	name: "homePageSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadHomePageInfo.pending, (state, action) => {
			state.isLoadingHomePage = true;
		});
		builder.addCase(loadHomePageInfo.fulfilled, (state, action) => {
			state.calendarUrl = action.payload.calendarUrl as string;
			state.isLoadingHomePage = false;
		});
		builder.addCase(loadHomePageInfo.rejected, (state, action) => {
			state.isLoadingHomePage = false;
		});
	},
});

export default HomePageSlice.reducer;
