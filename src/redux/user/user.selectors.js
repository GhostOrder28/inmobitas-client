import { createSelector } from 'reselect';

export const selectCurrentUser = state => state.user.currentUser;
