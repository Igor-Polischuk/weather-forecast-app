import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CitiesCurrentWeatherOutput = {
  __typename?: 'CitiesCurrentWeatherOutput';
  city: City;
  timezone: Timezone;
  weather: Weather;
};

export type CitiesNameOutput = {
  __typename?: 'CitiesNameOutput';
  fullname: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type City = {
  __typename?: 'City';
  fullname: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type CurrentWeatherOutput = {
  __typename?: 'CurrentWeatherOutput';
  timezone: Timezone;
  weather: Weather;
};

export type ForecastItem = {
  __typename?: 'ForecastItem';
  clouds: Scalars['Float']['output'];
  date: Scalars['Float']['output'];
  feelsLike: Scalars['Float']['output'];
  humidity: Scalars['Int']['output'];
  maxTemperature: Scalars['Float']['output'];
  minTemperature: Scalars['Float']['output'];
  pop: Scalars['Float']['output'];
  pressure: Scalars['Int']['output'];
  rainPerHour: Scalars['Float']['output'];
  temperature: Scalars['Float']['output'];
  weather: Scalars['String']['output'];
  weatherDescription: Scalars['String']['output'];
};

export type ForecastOutput = {
  __typename?: 'ForecastOutput';
  items: Array<ForecastItem>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginOutput;
  logout: Scalars['String']['output'];
  refresh: RefreshOutput;
  removeCity: User;
  saveCity: User;
  signup: User;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveCityArgs = {
  city: Scalars['String']['input'];
};


export type MutationSaveCityArgs = {
  city: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  loginUserInput: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  currentWeather: CurrentWeatherOutput;
  forecast: ForecastOutput;
  getCitiesTips: Array<CitiesNameOutput>;
  getCurrentWeatherInUserCities: Array<CitiesCurrentWeatherOutput>;
  user: User;
  users: Array<User>;
};


export type QueryCurrentWeatherArgs = {
  WeatherInput: WeatherInput;
};


export type QueryForecastArgs = {
  WeatherInput: WeatherInput;
};


export type QueryGetCitiesTipsArgs = {
  cityName: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RefreshOutput = {
  __typename?: 'RefreshOutput';
  accessToken: Scalars['String']['output'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Timezone = {
  __typename?: 'Timezone';
  sunrise: Scalars['Int']['output'];
  sunset: Scalars['Int']['output'];
  timezone: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  cities: Array<City>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type Weather = {
  __typename?: 'Weather';
  clouds: Scalars['Float']['output'];
  feelsLike: Scalars['Float']['output'];
  humidity: Scalars['Int']['output'];
  maxTemperature: Scalars['Float']['output'];
  minTemperature: Scalars['Float']['output'];
  pressure: Scalars['Int']['output'];
  rainPerHour: Scalars['Float']['output'];
  temperature: Scalars['Float']['output'];
  weather: Scalars['String']['output'];
  weatherDescription: Scalars['String']['output'];
};

export type WeatherInput = {
  city: Scalars['String']['input'];
  units?: WeatherUnits;
};

export enum WeatherUnits {
  Imperial = 'Imperial',
  Metric = 'Metric',
  Standard = 'Standard'
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', accessToken: string, user: { __typename?: 'User', id: number, email: string } } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'RefreshOutput', accessToken: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: number, email: string } };

export type GetCitiesTipsQueryVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type GetCitiesTipsQuery = { __typename?: 'Query', getCitiesTips: Array<{ __typename?: 'CitiesNameOutput', name: string, fullname: string, lat: number, lon: number }> };

export type GeCurrentWeatherQueryVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type GeCurrentWeatherQuery = { __typename?: 'Query', currentWeather: { __typename?: 'CurrentWeatherOutput', weather: { __typename?: 'Weather', temperature: number, feelsLike: number, maxTemperature: number, minTemperature: number, pressure: number, humidity: number }, timezone: { __typename?: 'Timezone', timezone: number, sunrise: number, sunset: number } } };

export type GetCurrentWeatherQueryVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type GetCurrentWeatherQuery = { __typename?: 'Query', currentWeather: { __typename?: 'CurrentWeatherOutput', weather: { __typename?: 'Weather', temperature: number, feelsLike: number, maxTemperature: number, minTemperature: number, pressure: number, humidity: number }, timezone: { __typename?: 'Timezone', timezone: number, sunrise: number, sunset: number } } };

export type GetForecastQueryVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type GetForecastQuery = { __typename?: 'Query', forecast: { __typename?: 'ForecastOutput', items: Array<{ __typename?: 'ForecastItem', temperature: number, pop: number, date: number }> } };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginInput: {email: $email, password: $password}) {
    user {
      id
      email
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshDocument = gql`
    mutation Refresh {
  refresh {
    accessToken
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetCitiesTipsDocument = gql`
    query getCitiesTips($cityName: String!) {
  getCitiesTips(cityName: $cityName) {
    name
    fullname
    lat
    lon
  }
}
    `;

/**
 * __useGetCitiesTipsQuery__
 *
 * To run a query within a React component, call `useGetCitiesTipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesTipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesTipsQuery({
 *   variables: {
 *      cityName: // value for 'cityName'
 *   },
 * });
 */
export function useGetCitiesTipsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCitiesTipsQuery, GetCitiesTipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCitiesTipsQuery, GetCitiesTipsQueryVariables>(GetCitiesTipsDocument, options);
      }
export function useGetCitiesTipsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCitiesTipsQuery, GetCitiesTipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCitiesTipsQuery, GetCitiesTipsQueryVariables>(GetCitiesTipsDocument, options);
        }
export type GetCitiesTipsQueryHookResult = ReturnType<typeof useGetCitiesTipsQuery>;
export type GetCitiesTipsLazyQueryHookResult = ReturnType<typeof useGetCitiesTipsLazyQuery>;
export type GetCitiesTipsQueryResult = Apollo.QueryResult<GetCitiesTipsQuery, GetCitiesTipsQueryVariables>;
export const GeCurrentWeatherDocument = gql`
    query geCurrentWeather($cityName: String!) {
  currentWeather(WeatherInput: {city: "$cityName"}) {
    weather {
      temperature
      feelsLike
      maxTemperature
      minTemperature
      pressure
      humidity
    }
    timezone {
      timezone
      sunrise
      sunset
    }
  }
}
    `;

/**
 * __useGeCurrentWeatherQuery__
 *
 * To run a query within a React component, call `useGeCurrentWeatherQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeCurrentWeatherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeCurrentWeatherQuery({
 *   variables: {
 *      cityName: // value for 'cityName'
 *   },
 * });
 */
export function useGeCurrentWeatherQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GeCurrentWeatherQuery, GeCurrentWeatherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GeCurrentWeatherQuery, GeCurrentWeatherQueryVariables>(GeCurrentWeatherDocument, options);
      }
export function useGeCurrentWeatherLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GeCurrentWeatherQuery, GeCurrentWeatherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GeCurrentWeatherQuery, GeCurrentWeatherQueryVariables>(GeCurrentWeatherDocument, options);
        }
export type GeCurrentWeatherQueryHookResult = ReturnType<typeof useGeCurrentWeatherQuery>;
export type GeCurrentWeatherLazyQueryHookResult = ReturnType<typeof useGeCurrentWeatherLazyQuery>;
export type GeCurrentWeatherQueryResult = Apollo.QueryResult<GeCurrentWeatherQuery, GeCurrentWeatherQueryVariables>;
export const GetCurrentWeatherDocument = gql`
    query getCurrentWeather($cityName: String!) {
  currentWeather(WeatherInput: {city: "$cityName"}) {
    weather {
      temperature
      feelsLike
      maxTemperature
      minTemperature
      pressure
      humidity
    }
    timezone {
      timezone
      sunrise
      sunset
    }
  }
}
    `;

/**
 * __useGetCurrentWeatherQuery__
 *
 * To run a query within a React component, call `useGetCurrentWeatherQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentWeatherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentWeatherQuery({
 *   variables: {
 *      cityName: // value for 'cityName'
 *   },
 * });
 */
export function useGetCurrentWeatherQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCurrentWeatherQuery, GetCurrentWeatherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCurrentWeatherQuery, GetCurrentWeatherQueryVariables>(GetCurrentWeatherDocument, options);
      }
export function useGetCurrentWeatherLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentWeatherQuery, GetCurrentWeatherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCurrentWeatherQuery, GetCurrentWeatherQueryVariables>(GetCurrentWeatherDocument, options);
        }
export type GetCurrentWeatherQueryHookResult = ReturnType<typeof useGetCurrentWeatherQuery>;
export type GetCurrentWeatherLazyQueryHookResult = ReturnType<typeof useGetCurrentWeatherLazyQuery>;
export type GetCurrentWeatherQueryResult = Apollo.QueryResult<GetCurrentWeatherQuery, GetCurrentWeatherQueryVariables>;
export const GetForecastDocument = gql`
    query getForecast($cityName: String!) {
  forecast(WeatherInput: {city: "$cityName"}) {
    items {
      temperature
      pop
      date
    }
  }
}
    `;

/**
 * __useGetForecastQuery__
 *
 * To run a query within a React component, call `useGetForecastQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForecastQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForecastQuery({
 *   variables: {
 *      cityName: // value for 'cityName'
 *   },
 * });
 */
export function useGetForecastQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetForecastQuery, GetForecastQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetForecastQuery, GetForecastQueryVariables>(GetForecastDocument, options);
      }
export function useGetForecastLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetForecastQuery, GetForecastQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetForecastQuery, GetForecastQueryVariables>(GetForecastDocument, options);
        }
export type GetForecastQueryHookResult = ReturnType<typeof useGetForecastQuery>;
export type GetForecastLazyQueryHookResult = ReturnType<typeof useGetForecastLazyQuery>;
export type GetForecastQueryResult = Apollo.QueryResult<GetForecastQuery, GetForecastQueryVariables>;