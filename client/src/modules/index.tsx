import { Route, BrowserRouter, Routes } from "react-router-dom";
import { FC } from "react";

import { CommonModule, IModule } from "@modules/common";
import { AccessLevel } from "@/enums/access-levels";
import { AccessControl, AuthModule } from "./auth";
import { WeatherModule } from "./weather";

const modules: IModule[] = [AuthModule, CommonModule, WeatherModule];

export const RootModule: FC = () => {
  const pages = modules.flatMap((module) => {
    return module.pages.map((page) => {
      return (
        <Route
          key={page.routePath}
          path={page.routePath}
          element={
            <AccessControl access={page.accessLevel || AccessLevel.PUBLIC}>
              {page.pageComponent}
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
