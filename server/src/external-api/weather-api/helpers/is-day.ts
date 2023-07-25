/* eslint-disable prettier/prettier */
interface IIsDayParams {
  sunset: number
  sunrise: number
  now: number
}

export const isDayTime = ({ sunrise, sunset, now }: IIsDayParams): boolean => {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);
  const nowDate = new Date(now * 1000);

  const sunriseHours = sunriseDate.getHours();
  const sunriseMinutes = sunriseDate.getMinutes();
  const sunsetHours = sunsetDate.getHours();
  const sunsetMinutes = sunsetDate.getMinutes();
  const nowHours = nowDate.getHours();
  const nowMinutes = nowDate.getMinutes();

  const isAfterSunrise = nowHours > sunriseHours || (nowHours === sunriseHours && nowMinutes >= sunriseMinutes);
  const isBeforeSunset = nowHours < sunsetHours || (nowHours === sunsetHours && nowMinutes < sunsetMinutes);

  return isAfterSunrise && isBeforeSunset;
};
