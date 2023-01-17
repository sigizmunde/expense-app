import { IStatisticsState } from '../../types/data';
import { RootState } from '../store';

export const statisticsSelectors = {
  getStatistics: (state: RootState): IStatisticsState =>
    state.rootReducer.statistics,
};
