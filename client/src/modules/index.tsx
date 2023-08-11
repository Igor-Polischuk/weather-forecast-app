import { AppRouter } from "@modules/navigation/components/AppRouter";
import { CommonModule, IModule } from "@modules/common";

import { WithRequired } from "./common/types/with-required";
import { WeatherModule } from "./weather";
import { AuthModule } from "./auth";

export const MainModule: WithRequired<IModule<'AppRouter'>, 'components'> = {
  pages: [],
  components: {
    AppRouter:  <AppRouter modules={[AuthModule, CommonModule, WeatherModule]}/>,
  }
}
