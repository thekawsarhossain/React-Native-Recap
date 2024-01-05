import { Product, RootState } from "./productsInterface";

export const selectStatus = (state: RootState): string => state.products.status;

export const selectFeaturedProducts = (state: RootState): Product[] => {
    return state.products?.products?.filter((product) => product.is_featured)
};

export const seflectHeadphones = (state: RootState): Product[] =>
    state.products?.products?.filter((product) => product.category === 'headphones');

export const selectSpeakers = (state: RootState): Product[] =>
    state.products?.products?.filter((product) => product.category === 'speakers');

export const selectEarphones = (state: RootState): Product[] =>
    state.products?.products?.filter((product) => product.category === 'earphones');

export const selectProductById = (state: RootState, id: any): Product | undefined =>
    state.products?.products?.find((product) => product.id === id);
