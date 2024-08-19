import { AnyAction } from "redux";
import { setIsLoading, unsetIsLoading } from "./app.actions";

export type AppState = {
  readonly isLoading: boolean;
  readonly loaderMessage: string;
}

const INITIAL_STATE: AppState = {
  isLoading: false,
  loaderMessage: "",
}

const appReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {
  if (setIsLoading.match(action)) {
    return { 
      ...state,
      isLoading: true,
      loaderMessage: action.payload
    }
  };

  if (unsetIsLoading.match(action)) {
    return { 
      ...state,
      isLoading: false,
      loaderMessage: ""
    }
  };

  return state;
}

export default appReducer;
