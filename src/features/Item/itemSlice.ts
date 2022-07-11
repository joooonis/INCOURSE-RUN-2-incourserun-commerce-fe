import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ItemChecker = {
  id: number;
  checked: boolean;
};

export interface ItemState {
  itemCheckers: ItemChecker[];
}

const initialState: ItemState = {
  itemCheckers: [],
};

export const itemSlice = createSlice({
  name: 'ITEM',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const newItem = {
        id: action.payload,
        checked: false,
      };
      state.itemCheckers.push(newItem);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const idx = state.itemCheckers.findIndex((x) => x.id === action.payload);
      if (idx > -1) state.itemCheckers.splice(idx, 1);
    },
    checkItem: (state, action: PayloadAction<number>) => {
      const target = state.itemCheckers.find((x) => x.id === action.payload);
      if (target) target.checked = !target.checked;
    },
    checkAllItem: (state) => {
      state.itemCheckers.forEach((itemChecker) => (itemChecker.checked = true));
    },
    unCheckAllItem: (state) => {
      state.itemCheckers.forEach(
        (itemChecker) => (itemChecker.checked = false),
      );
    },
  },
});

export const { addItem, removeItem, checkItem, checkAllItem, unCheckAllItem } =
  itemSlice.actions;

export default itemSlice;
