import { AccessLevel } from "@/modules/auth/access-levels";
import { IModule } from "./interfaces/IModule";
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

export type { IModule }