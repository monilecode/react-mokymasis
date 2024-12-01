import React from "react";
import { AppRouter } from "./routing/Router";
import { UserProvider } from "./contexts/UserContext";
import { QueryClientProvider, QueryClient } from "react-query";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </QueryClientProvider>
  );
};
