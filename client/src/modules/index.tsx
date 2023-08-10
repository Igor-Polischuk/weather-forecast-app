import { Route, BrowserRouter, Routes } from "react-router-dom";
import { FC } from "react";

import { CommonModule, IModule } from "@modules/common";
import { AccessLevel } from "@/modules/auth/access-levels";
import { AccessControl, AuthModule } from "./auth";
import { WeatherModule } from "./weather";

const modules: IModule[] = [AuthModule, CommonModule, WeatherModule];

export const RootModule: FC = () => {
  const pages = modules.flatMap((module) => {
    return module.pages.map((pageInfo) => {
      return (
        <Route
          key={pageInfo.routePath}
          path={pageInfo.routePath}
          element={
            <AccessControl access={pageInfo.accessLevel || AccessLevel.PUBLIC}>
              {pageInfo.pageComponent}
            </AccessControl>
          }
        />
      );
    });
  });

  return (
    <BrowserRouter>
      <Routes>{pages}</Routes>
    </BrowserRouter>
  );
};
