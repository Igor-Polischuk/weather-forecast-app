import { AccessLevel } from "@/modules/auth/access-levels";

export interface IModule<T extends string = ''> {
    pages: IModulePage[]
    modules?: IModule[]
    components?: Record<T, JSX.Element>
    providers?: JSX.Element[]
}

export interface IModulePage {
    pageComponent: JSX.Element;
    routePath: string;
    accessLevel?: AccessLevel;
}