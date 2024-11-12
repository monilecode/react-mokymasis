import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BaseLayout } from "../components/layout/BaseLayout";
import { HomePage } from "../pages/HomePage";
import { ServicesPage } from "../pages/ServicesPage";
import { AboutPage } from "../pages/AboutPage";
import { LoginPage } from "../pages/LoginPage";
import { SearchCategoryPage } from "../pages/SearchCategoryPage";
import { RegisterPage } from "../pages/RegisterPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/search/:category", element: <SearchCategoryPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={Router} />;
};
