import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addData: (state, action) => {
            const index = state.value.findIndex(obj => obj.title === action.payload.title);
            if (index === -1)
                state.value.push(action.payload);
            else {
                state.value[index].quantity += action.payload.quantity;
            }
        },
        emptyCart: (state) => {
            state.value = []
        },
        removeSpecificItem: (state, action) => {
            const index = state.value.findIndex(obj => obj.title === action.payload.title);

            if (index > -1) {
                const data = state.value;
                data.splice(index, 1);
                state.value = data;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addData, emptyCart, removeSpecificItem } = cartSlice.actions;

export default cartSlice.reducer;