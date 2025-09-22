export interface Product {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
}
interface Productstate {
    products: Product[];
    liked: Product[];
    loading: boolean;
    error: string | null;
}
export const initialState: Productstate = {
    products: [],
    liked: [],
    loading: false,
    error: null,
};