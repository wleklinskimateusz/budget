declare const brand: unique symbol;

export type Branded<T, TBrand> = T & { [brand]: TBrand };
