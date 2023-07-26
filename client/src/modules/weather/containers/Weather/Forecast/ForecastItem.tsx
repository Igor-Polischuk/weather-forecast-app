import { FC } from "react";

import drop from "@assets/drop.png";
import styles from './styles.module.scss';

interface IForecastItemProps {
    temperature: number
    icon: JSX.Element
    time: string
    pop: number
}

export const ForecastItem: FC<IForecastItemProps> = ({icon, temperature, time, pop}) => {
    return (
        <div className={styles.forecastItem}>
            <p className={styles.forecastItem_time}>{time}</p>
            {icon}
            <p className={styles.forecastItem_temp}>{temperature}°</p>
            <p className={styles.forecastItem_rain}>
                <img src={drop} alt="drop" />
                <span>{pop}%</span>
            </p>
        </div>
    );
};