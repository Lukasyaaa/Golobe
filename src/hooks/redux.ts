import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { storeType } from "../store";

export const useTypedSelector : TypedUseSelectorHook<storeType> = useSelector;