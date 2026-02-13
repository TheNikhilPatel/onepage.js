import { createContext } from "react";

/*
  AuthContext
  - Stores authenticated user & auth actions
  - NO components here (important for Fast Refresh)
*/
export const AuthContext = createContext(null);
