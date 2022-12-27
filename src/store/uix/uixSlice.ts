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
  isFetching: 0,
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
    increaseIsFetching: (state) => {
      state.isFetching += 1;
    },
    decreaseIsFetching: (state) => {
      if (state.isFetching > 0) {
        state.isFetching -= 1;
      }
    },
    resetIsFetching: (state) => {
      state.isFetching = 0;
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
        state.isFetching -= 1;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isFetching += 1;
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.isFetching -= 1;
        state.message = { type: 'error', text: payload.message };
      });
  },
});

export const {
  resetMessage,
  setMessage,
  increaseIsFetching,
  decreaseIsFetching,
  resetIsFetching,
} = uixSlice.actions;
