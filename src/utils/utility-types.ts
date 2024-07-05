export type Nullable<T> = { [K in keyof T]: T[K] | null };
export type RouteSource = { [index: string]: any };
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;

export type Uncertain<T> = {
  [ K in keyof T ]?: any
}

type UnionKeys<T> = T extends T ? keyof T : never;

export type OneOf<T extends {}[]> = {
  [K in keyof T]: T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>;
}[number];
