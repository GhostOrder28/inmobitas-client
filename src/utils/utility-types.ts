export type Nullable<T> = { [K in keyof T]: T[K] | null };
export type RouteSource = { [index: string]: any };
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
