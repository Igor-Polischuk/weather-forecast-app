import { AccessControl } from "@/modules/auth";
import { IModule } from "@/modules/common/interfaces/IModule";
import { FC } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

interface IPagesProps {
  modules: IModule[];
}

export const Pages: FC<IPagesProps> = ({ modules }) => {
  const pages = modules.flatMap((module) => {
    return module.pages.map((page) => {
      return (
        <Route key={page.routePath}
          path={page.routePath}
          element={
            <AccessControl access={page.accessLevel}>
              {page.pageComponent}
            </AccessControl>
          }
        />
      );
    });
  });

  return <BrowserRouter><Routes>{pages}</Routes></BrowserRouter>;
};
