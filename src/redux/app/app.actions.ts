import { createAction, Action, ActionWithPayload } from "../../utils/action-creator";
import appActionTypes from "./app.types";
import { withMatcher } from "../../utils/utility-functions/utility-functions";

type SetIsLoading = ActionWithPayload<appActionTypes.SET_LOADER, string>;
type UnsetIsLoading = Action<appActionTypes.UNSET_LOADER>;

export const setIsLoading = withMatcher((message: string): SetIsLoading => 
  createAction(appActionTypes.SET_LOADER, message));

export const unsetIsLoading = withMatcher((): UnsetIsLoading => 
  createAction(appActionTypes.UNSET_LOADER));
