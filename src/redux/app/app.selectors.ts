import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { AppState } from "./app.reducer";

export const selectAppReducer = (state: RootState): AppState => state.app;

export const selectIsLoading = createSelector(
  [selectAppReducer],
  (appReducer) => appReducer.isLoading
);

export const selectLoaderMessage = createSelector(
  [selectAppReducer],
  (appReducer) => appReducer.loaderMessage
);
