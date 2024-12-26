import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
	name: 'review',
	initialState: {
		data: [],
	},
	reducers: {
		setReviews: (state, action) => {
			const newState = { ...state };
			newState.data = action.payload;
			return newState;
		},
	},
});

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
