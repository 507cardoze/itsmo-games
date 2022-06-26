import { createSlice } from '@reduxjs/toolkit';
import {
	getClientInfo,
	getClientInit,
	getClientList,
	getClientOrdersById,
	getNextClient,
	loadMoreYugiOhInventory,
	loadYugiOhInventory,
	saveNewCard,
	updateCardItem,
} from './admin-panel.thunk';
import { initialState } from './admin-panel.state';

export const adminPanelSlice = createSlice({
	name: 'admin-panel-slice',
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
		resetClientdata: (state) => {
			state.clientData = null;
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
		builder.addCase(loadMoreYugiOhInventory.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.yugiohInventory = [...state.yugiohInventory, ...action.payload];
		});
		builder.addCase(loadYugiOhInventory.rejected, (state) => {
			state.isFetchingData = false;
		});
		builder.addCase(saveNewCard.fulfilled, (state, action) => {
			state.yugiohInventory.push(action.payload);
		});
		builder.addCase(updateCardItem.fulfilled, (state, action) => {
			const index = state.yugiohInventory.findIndex(
				(card) => card.uid === action.payload.uid
			);
			state.yugiohInventory[index] = action.payload;
		});
		builder.addCase(getClientList.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.clientList = action.payload;
		});
		builder.addCase(getClientList.pending, (state) => {
			state.isFetchingData = true;
		});
		builder.addCase(getClientList.rejected, (state) => {
			state.isFetchingData = false;
		});
		builder.addCase(getClientOrdersById.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.clientOrders = action.payload;
		});
		builder.addCase(getClientOrdersById.pending, (state) => {
			state.isFetchingData = true;
		});
		builder.addCase(getClientOrdersById.rejected, (state) => {
			state.isFetchingData = false;
		});
		builder.addCase(getClientInfo.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.clientData = action.payload;
		});
		builder.addCase(getClientInfo.pending, (state) => {
			state.isFetchingData = true;
		});
		builder.addCase(getClientInfo.rejected, (state) => {
			state.isFetchingData = false;
		});
		//
		builder.addCase(getClientInit.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.clientList = action.payload;
		});
		builder.addCase(getNextClient.fulfilled, (state, action) => {
			state.isFetchingData = false;
			state.clientList = [...state.clientList, ...action.payload];
		});
	},
});

export const {
	setModalInventory,
	setYugiohEditable,
	setisSubmmiting,
	resetClientdata,
} = adminPanelSlice.actions;

export default adminPanelSlice.reducer;
