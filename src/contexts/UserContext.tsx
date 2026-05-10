import React from "react";
import { UserDataType } from "../db/repositories/UserRepository.type"


type UserContextType = {
    currentUser: UserDataType | null;
    isAuthReady: boolean;
};

export const UserContext = React.createContext<UserContextType>({
    currentUser: null,
    isAuthReady: false,
});