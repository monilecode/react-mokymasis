import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BaseLayout } from "@components/layout/BaseLayout";
import { HomePage } from "@pages/HomePage";
import { ServicesPage } from "@pages/ServicesPage";
import { AboutPage } from "@pages/AboutPage";
import { LoginPage } from "@pages/LoginPage";
import { SearchCategoryPage } from "@pages/SearchCategoryPage";
import { RegisterPage } from "@pages/RegisterPage";
import { Routes } from "@routing/Routes";

const Router = createBrowserRouter([
  {
    path: Routes.HomePage,
    element: <BaseLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: Routes.ServicesPage, element: <ServicesPage /> },
      { path: Routes.AboutPage, element: <AboutPage /> },
      { path: Routes.LoginPage, element: <LoginPage /> },
      { path: Routes.SearchCategoryPage, element: <SearchCategoryPage /> },
      { path: Routes.RegisterPage, element: <RegisterPage /> },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={Router} />;
};
