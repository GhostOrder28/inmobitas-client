import { AxiosInstance } from "axios";

export type Action<T> = {
  type: T;
} 

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
}

export type ActionWithDependency<T> = {
  type: T;
  http: AxiosInstance;
}

export type ActionWithDependencyAndPayload<T, P> = {
  type: T;
  payload: P;
  http: AxiosInstance;
}

export function createAction<T extends string>(type: T, payload: void): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload: P){
  return ({ type, payload })
}

export function createActionWithDependencyAndPayload<T extends string, P>(type: T, payload: P, http: AxiosInstance): ActionWithDependencyAndPayload<T, P>;
export function createActionWithDependencyAndPayload<T extends string, P>(type: T, payload: P, http: AxiosInstance){
  return ({ type, payload, http })
}

export function createActionWithDependency<T extends string>(type: T, http: AxiosInstance): ActionWithDependency<T>;
export function createActionWithDependency<T extends string>(type: T, http: AxiosInstance){
  return ({ type, http })
}

