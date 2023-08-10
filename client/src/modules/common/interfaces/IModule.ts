import { AccessLevel } from "@/enums/access-levels";

export interface IModule {
    pages: IModulePage[]
    modules?: IModule[]
    components?: Record<string, JSX.Element>
}

export interface IModulePage {
    pageComponent: JSX.Element;
    routePath: string;
    accessLevel?: AccessLevel;
}