import { TMessage } from '../../types/uix';
import { RootState } from '../store';

export const uixSelectors = {
  getIsFetching: (state: RootState): boolean =>
    state.rootReducer.uix.isFetching,
  getMessage: (state: RootState): TMessage => state.rootReducer.uix.message,
};
