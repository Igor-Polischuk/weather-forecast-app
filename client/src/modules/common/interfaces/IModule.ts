import { AccessLevel } from "@/modules/auth"

export interface IModule {
    pages: IModulePage[]
}

export interface IModulePage {
    pageComponent: JSX.Element;
    routePath: string;
    accessLevel?: AccessLevel;
  }