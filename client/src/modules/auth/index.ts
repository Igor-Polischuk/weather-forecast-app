import { AccessControl } from '@/modules/auth/hoc/AccessControl';
import { LoginForm } from "./components/LoginForm";
import { AuthPage } from './pages/AuthPage';
import { LogOut } from './components/LogOut';
import { AccessLevel } from './access-levels';
import { IModule } from '../common/interfaces/IModule';

export const AuthModule: IModule = {
    pages: [{
        pageComponent: AuthPage(),
        routePath: '/login',
        accessLevel: AccessLevel.UNAUTHORIZED
    }]
}

export {LoginForm, AccessControl, AccessLevel, AuthPage, LogOut};