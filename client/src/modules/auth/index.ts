import { LoginForm } from "./components/LoginForm";
import { AuthPage } from './pages/AuthPage';
import { LogOut } from './components/LogOut';

import { AccessControl } from '@/modules/auth/hoc/AccessControl';
import { IModule } from '@modules/common/interfaces/IModule';

export const AuthModule: IModule = {
    pages: [{
        pageComponent: AuthPage(),
        routePath: '/login',
    }]
}

export {LoginForm, AccessControl, AuthPage, LogOut};