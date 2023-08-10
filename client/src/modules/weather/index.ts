import { IModule } from '@modules/common/interfaces/IModule';
import { WeatherPage } from './pages/index';
import { AccessLevel } from '@/modules/auth/access-levels';

export const WeatherModule: IModule = {
    pages: [{
        pageComponent: WeatherPage(),
        routePath: '/weather',
        accessLevel: AccessLevel.AUTHORIZED
    }],
}


export { WeatherPage }