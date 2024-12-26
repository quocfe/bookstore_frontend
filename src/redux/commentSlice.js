import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
	name: 'comment',
	initialState: {
		data: [],
	},
	reducers: {
		addComments: (state, action) => {
			state.data = action.payload;
		},
		addComment: (state, action) => {
			state.data = [...state.data, action.payload];
		},
	},
});

export const { addComments, addComment } = commentSlice.actions;

export default commentSlice.reducer;
