import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ItemChecker = {
  id: number;
  checked: boolean;
  price: number;
  quantity: number;
};

export interface ItemState {
  itemCheckers: ItemChecker[];
  total: number;
}

const initialState: ItemState = {
  itemCheckers: [],
  total: 0,
};

type ItemSliceActionType = {
  id: number;
  price: number;
  quantity: number;
};

export const itemSlice = createSlice({
  name: 'ITEM',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemSliceActionType>) => {
      const newItem = {
        id: action.payload.id,
        checked: false,
        price: action.payload.price,
        quantity: action.payload.quantity,
      };
      state.itemCheckers.push(newItem);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const idx = state.itemCheckers.findIndex((x) => x.id === action.payload);
      if (idx > -1) state.itemCheckers.splice(idx, 1);
    },
    incItem: (state, action: PayloadAction<number>) => {
      const item = state.itemCheckers.find((x) => x.id === action.payload);
      if (item) item.quantity++;
    },
    decItem: (state, action: PayloadAction<number>) => {
      const item = state.itemCheckers.find((x) => x.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
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

export const {
  addItem,
  removeItem,
  checkItem,
  checkAllItem,
  unCheckAllItem,
  incItem,
  decItem,
  setTotal,
} = itemSlice.actions;

export default itemSlice;
