import React, { createContext, ReactNode, useState } from "react";

type User = {
  email: string;
};

type UserContextType = {
  user: User | null;
  login: (userInfo: User) => void;
  logout: () => void;
};

const defaultContextValue: UserContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userInfo: User) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
