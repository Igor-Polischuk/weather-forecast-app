import { IModule } from "./interfaces/IModule";
import { AccessLevel } from "../auth";
import { MainPage, NotFound } from "./pages";

export const CommonModule: IModule = {
    pages: [{
        pageComponent: MainPage(),
        routePath: '/',
        accessLevel: AccessLevel.AUTHORIZED
    },
    {
        pageComponent: NotFound(),
        routePath: '*',
    }]
}