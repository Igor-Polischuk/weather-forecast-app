import { AuthModule } from "./auth";
import { CommonModule } from "./common";
import { IModule } from "./common/interfaces/IModule";
import { WeatherModule } from "./weather";
import { Pages } from "./main/components/Pages";

export class MainModule {
  private modules: IModule[] = [AuthModule, CommonModule, WeatherModule];
  Pages = <Pages modules={this.modules}/>
}
