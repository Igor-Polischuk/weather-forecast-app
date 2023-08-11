import { Route, BrowserRouter, Routes } from "react-router-dom";
import { FC } from "react";

import { AccessControl } from "@/modules/auth";
import { AccessLevel } from "@/modules/auth/access-levels";
import { IModule } from "@/modules/common";

export const AppRouter: FC<{modules: IModule[]}> = ({modules}) => {
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