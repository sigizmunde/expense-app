import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUixState, TMessageType } from '../../types/uix';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../actionTypeCheckers';
import { logOutUser, registerUser } from '../auth/authThunk';
import {
  addCategory,
  addTransaction,
  deleteCategory,
  deleteTransaction,
  updateCategory,
  updateTransaction,
} from '../data/dataThunk';

const initialState: IUixState = {
  isFetching: false,
  message: { type: undefined, text: null },
};

export const uixSlice = createSlice({
  name: 'uix',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = { type: undefined, text: null };
    },
    setMessage: (
      state,
      action: PayloadAction<{
        type: TMessageType;
        text: string;
      }>
    ) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'User successfully registered',
        };
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'Successfully logged out',
        };
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'New category added',
        };
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'Category deleted',
        };
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'Category updated',
        };
      })
      .addCase(addTransaction.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'New transaction added',
        };
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'Transaction deleted',
        };
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.message = {
          type: 'success',
          text: 'Transaction updated',
        };
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.isFetching = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.isFetching = false;
        state.message = { type: 'error', text: payload.message };
      });
  },
});

export const { resetMessage, setMessage } = uixSlice.actions;
