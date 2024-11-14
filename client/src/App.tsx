import React from "react";
import "./GlobalStyles.scss";
import { AppRouter } from "./routing/Router";
import { UserProvider } from "./contexts/UserContext";

export const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};
