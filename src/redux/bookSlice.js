import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
	name: 'book',
	initialState: {
		data: [],
		searchStatus: 'idle',
	},
	reducers: {
		searchBook: (state, action) => {
			state.data = action.payload;
			state.searchStatus = 'succeeded';
		},
		getAllBook: (state, action) => {
			state.data = action.payload;
			state.searchStatus = 'succeeded';
		},
		setSearchStatus: (state, action) => {
			state.searchStatus = action.payload;
		},
	},
});

export const { searchBook, getAllBook, setSearchStatus } = bookSlice.actions;

export default bookSlice.reducer;
