import { AccessLevel } from "@/enums/access-levels";

export interface IModule {
    pages: IModulePage[]
}

export interface IModulePage {
    pageComponent: JSX.Element;
    routePath: string;
    accessLevel?: AccessLevel;
  }