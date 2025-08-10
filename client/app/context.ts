import { unstable_createContext } from "react-router";
import { type UserAuth } from "./types";

export const userContext = unstable_createContext<UserAuth | null>(null);
