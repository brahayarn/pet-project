import { Product } from "@/src/redux/types";

export type Props = {
    item: Product;
    liked: Product[];
    dispatch: (action: any) => void;
    toggleLiked: (item: any) => any;
};