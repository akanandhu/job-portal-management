import { useDispatch, useSelector } from "react-redux";

import type { AppDispatchI, RootStateI } from "@/app/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatchI>();
export const useAppSelector = useSelector.withTypes<RootStateI>();
