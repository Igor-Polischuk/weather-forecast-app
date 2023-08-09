interface ForecastItem {
    temperature: number;
    pop: number;
    date: number;
    icon: string;
    humidity: number
    windSpeed: number
    weatherCondition: string
    weatherDescription: string
    pressure: number
}

interface WeatherData {
    time: string;
    temperature: number;
    icon: string;
    pop: number;
    humidity: number
    windSpeed: number
    weatherCondition: string
    weatherDescription: string
    pressure: number
}

export interface WeatherByDay {
    dayName: string;
    data: WeatherData[];
}

export function groupWeatherByDay(forecastItems: ForecastItem[]): WeatherByDay[] {
    const days: { [day: string]: WeatherData[] } = {};

    for (const item of forecastItems) {
        const date = new Date(item.date);
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'long' });

        const time = date.toLocaleTimeString('ua-UA', { hour: '2-digit', minute: '2-digit' });
        const weatherData: WeatherData = {
            time,
            temperature: item.temperature,
            icon: item.icon,
            pop: item.pop,
            humidity: item.humidity,
            windSpeed: item.windSpeed,
            weatherCondition: item.weatherCondition,
            weatherDescription: item.weatherDescription,
            pressure: item.pressure
        };

        if (!days[dayKey]) {
            days[dayKey] = [weatherData];
        } else {
            days[dayKey].push(weatherData);
        }
    }

    const weatherByDay: WeatherByDay[] = Object.keys(days).map((dayName) => ({
        dayName,
        data: days[dayName],
    }));

    return weatherByDay;
}