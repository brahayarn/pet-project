import { AppDispatch } from "@/src/redux/store";
import { Product } from "@/src/redux/types";
import { AnyAction } from "@reduxjs/toolkit";

export type Props = {
    item: Product;
    liked: Product[];
    dispatch: AppDispatch;
    toggleLiked: (id: Product['id']) => AnyAction;
};