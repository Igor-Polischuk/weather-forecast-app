/* eslint-disable prettier/prettier */

interface IGetWeatherIconUrlParams {
  weatherCondition: string,
  weatherDescription: string,
  isDay: boolean
}

export function getWeatherIconUrl({ weatherCondition, weatherDescription, isDay }: IGetWeatherIconUrlParams) {
  const timeOfDay = isDay ? 'd' : 'n';
  const weatherConditionLower = weatherCondition.toLowerCase();
  const weatherDescriptionLower = weatherDescription.toLowerCase();

  const iconMapping = {
    clouds: {
      ['few clouds']: `few_clouds_${timeOfDay}`,
      default: `clouds`
    },
    clear: {
      default: `clear_${timeOfDay}`
    },
    rain: {
      ['light rain']: `rain_${timeOfDay}`,
      ['moderate rain']: `rain_${timeOfDay}`,
      default: `shower_rain`
    },
    snow: {
      default: `snow`
    },
    thunderstorm: {
      default: `thunderstorm`
    },
    default: 'mist'
  };

  const baseUrl = 'http://localhost:3000/static/weather-icons';
  let icon: string;

  if (weatherConditionLower in iconMapping) {
    const conditionMapping = iconMapping[weatherConditionLower];

    if (weatherDescriptionLower in conditionMapping) {
      icon = conditionMapping[weatherDescriptionLower];
    } else {
      icon = conditionMapping['default'];
    }
  } else {
    icon = iconMapping['default'];
  }

  const iconUrl = `${baseUrl}/${icon}.svg`;

  return iconUrl;
}