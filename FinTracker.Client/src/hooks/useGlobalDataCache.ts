import { useContext } from "react";
import { GlobalDataCacheContext } from "../contexts/GlobalDataCacheContext";

export default function useGlobalDataCache() {
    return useContext(GlobalDataCacheContext)
}