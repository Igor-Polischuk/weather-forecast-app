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
  icon: Scalars['String']['output'];
  maxTemperature: Scalars['Float']['output'];
  minTemperature: Scalars['Float']['output'];
  pop: Scalars['Float']['output'];
  pressure: Scalars['Int']['output'];
  rainPerHour: Scalars['Float']['output'];
  temperature: Scalars['Float']['output'];
  weatherCondition: Scalars['String']['output'];
  weatherDescription: Scalars['String']['output'];
  windSpeed: Scalars['Float']['output'];
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
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginOutput;
  logout: Scalars['String']['output'];
  refresh: Scalars['String']['output'];
  removeCity: Array<City>;
  saveCity: Array<City>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  currentWeather: CurrentWeatherOutput;
  forecast: ForecastOutput;
  getCitiesTips: Array<CitiesNameOutput>;
  getCurrentWeatherInUserCities: UserCitiesCurrentWeatherOutput;
  getUserCities: Array<City>;
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


export type QueryGetCurrentWeatherInUserCitiesArgs = {
  UserCitiesCurrentWeatherInput: UserCitiesCurrentWeatherInput;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
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
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type UserCitiesCurrentWeather = {
  __typename?: 'UserCitiesCurrentWeather';
  city: City;
  weatherInCity: CurrentWeatherOutput;
};

export type UserCitiesCurrentWeatherInput = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type UserCitiesCurrentWeatherOutput = {
  __typename?: 'UserCitiesCurrentWeatherOutput';
  list: Array<UserCitiesCurrentWeather>;
  pageInfo: PageInfo;
};

export type Weather = {
  __typename?: 'Weather';
  clouds: Scalars['Float']['output'];
  feelsLike: Scalars['Float']['output'];
  humidity: Scalars['Int']['output'];
  icon: Scalars['String']['output'];
  maxTemperature: Scalars['Float']['output'];
  minTemperature: Scalars['Float']['output'];
  pressure: Scalars['Int']['output'];
  rainPerHour: Scalars['Float']['output'];
  temperature: Scalars['Float']['output'];
  weatherCondition: Scalars['String']['output'];
  weatherDescription: Scalars['String']['output'];
  windSpeed: Scalars['Float']['output'];
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

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logout: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', user: { __typename?: 'User', id: number, email: string } } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: string };

export type RemoveCityMutationVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type RemoveCityMutation = { __typename?: 'Mutation', cities: Array<{ __typename?: 'City', fullname: string, lat: number, lon: number, name: string }> };

export type SaveCityMutationVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type SaveCityMutation = { __typename?: 'Mutation', cities: Array<{ __typename?: 'City', fullname: string, lat: number, lon: number, name: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: number, email: string } };

export type UserCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', fullname: string, lat: number, lon: number, name: string }> };

export type GetCitiesTipsQueryVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type GetCitiesTipsQuery = { __typename?: 'Query', getCitiesTips: Array<{ __typename?: 'CitiesNameOutput', name: string, fullname: string, lat: number, lon: number }> };

export type GetCurrentWeatherQueryVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type GetCurrentWeatherQuery = { __typename?: 'Query', currentWeather: { __typename?: 'CurrentWeatherOutput', weather: { __typename?: 'Weather', temperature: number, feelsLike: number, pressure: number, humidity: number, weatherCondition: string, weatherDescription: string, windSpeed: number, icon: string } } };

export type GetForecastQueryVariables = Exact<{
  cityName: Scalars['String']['input'];
}>;


export type GetForecastQuery = { __typename?: 'Query', forecast: { __typename?: 'ForecastOutput', items: Array<{ __typename?: 'ForecastItem', temperature: number, icon: string, pop: number, date: number, weatherCondition: string, weatherDescription: string, windSpeed: number, pressure: number, humidity: number }> } };

export type WeatherInUserCitiesQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type WeatherInUserCitiesQuery = { __typename?: 'Query', getCurrentWeatherInUserCities: { __typename?: 'UserCitiesCurrentWeatherOutput', list: Array<{ __typename?: 'UserCitiesCurrentWeather', city: { __typename?: 'City', fullname: string }, weatherInCity: { __typename?: 'CurrentWeatherOutput', weather: { __typename?: 'Weather', temperature: number, feelsLike: number, pressure: number, humidity: number, windSpeed: number, weatherCondition: string, weatherDescription: string, icon: string } } }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, pageSize: number, totalPages: number, totalElements: number } } };


export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginInput: {email: $email, password: $password}) {
    user {
      id
      email
    }
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
  refresh
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
export const RemoveCityDocument = gql`
    mutation RemoveCity($cityName: String!) {
  cities: removeCity(city: $cityName) {
    fullname
    lat
    lon
    name
  }
}
    `;
export type RemoveCityMutationFn = Apollo.MutationFunction<RemoveCityMutation, RemoveCityMutationVariables>;

/**
 * __useRemoveCityMutation__
 *
 * To run a mutation, you first call `useRemoveCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCityMutation, { data, loading, error }] = useRemoveCityMutation({
 *   variables: {
 *      cityName: // value for 'cityName'
 *   },
 * });
 */
export function useRemoveCityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCityMutation, RemoveCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveCityMutation, RemoveCityMutationVariables>(RemoveCityDocument, options);
      }
export type RemoveCityMutationHookResult = ReturnType<typeof useRemoveCityMutation>;
export type RemoveCityMutationResult = Apollo.MutationResult<RemoveCityMutation>;
export type RemoveCityMutationOptions = Apollo.BaseMutationOptions<RemoveCityMutation, RemoveCityMutationVariables>;
export const SaveCityDocument = gql`
    mutation SaveCity($cityName: String!) {
  cities: saveCity(city: $cityName) {
    fullname
    lat
    lon
    name
  }
}
    `;
export type SaveCityMutationFn = Apollo.MutationFunction<SaveCityMutation, SaveCityMutationVariables>;

/**
 * __useSaveCityMutation__
 *
 * To run a mutation, you first call `useSaveCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCityMutation, { data, loading, error }] = useSaveCityMutation({
 *   variables: {
 *      cityName: // value for 'cityName'
 *   },
 * });
 */
export function useSaveCityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveCityMutation, SaveCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SaveCityMutation, SaveCityMutationVariables>(SaveCityDocument, options);
      }
export type SaveCityMutationHookResult = ReturnType<typeof useSaveCityMutation>;
export type SaveCityMutationResult = Apollo.MutationResult<SaveCityMutation>;
export type SaveCityMutationOptions = Apollo.BaseMutationOptions<SaveCityMutation, SaveCityMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
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
export const UserCitiesDocument = gql`
    query UserCities {
  cities: getUserCities {
    fullname
    lat
    lon
    name
  }
}
    `;

/**
 * __useUserCitiesQuery__
 *
 * To run a query within a React component, call `useUserCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserCitiesQuery, UserCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserCitiesQuery, UserCitiesQueryVariables>(UserCitiesDocument, options);
      }
export function useUserCitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserCitiesQuery, UserCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserCitiesQuery, UserCitiesQueryVariables>(UserCitiesDocument, options);
        }
export type UserCitiesQueryHookResult = ReturnType<typeof useUserCitiesQuery>;
export type UserCitiesLazyQueryHookResult = ReturnType<typeof useUserCitiesLazyQuery>;
export type UserCitiesQueryResult = Apollo.QueryResult<UserCitiesQuery, UserCitiesQueryVariables>;
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
export const GetCurrentWeatherDocument = gql`
    query getCurrentWeather($cityName: String!) {
  currentWeather(WeatherInput: {city: $cityName}) {
    weather {
      temperature
      feelsLike
      pressure
      humidity
      weatherCondition
      weatherDescription
      windSpeed
      icon
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
  forecast(WeatherInput: {city: $cityName}) {
    items {
      temperature
      icon
      pop
      date
      weatherCondition
      weatherDescription
      windSpeed
      pressure
      humidity
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
export const WeatherInUserCitiesDocument = gql`
    query WeatherInUserCities($page: Int!, $pageSize: Int!) {
  getCurrentWeatherInUserCities(
    UserCitiesCurrentWeatherInput: {page: $page, pageSize: $pageSize}
  ) {
    list {
      city {
        fullname
      }
      weatherInCity {
        weather {
          temperature
          feelsLike
          pressure
          humidity
          windSpeed
          weatherCondition
          weatherDescription
          icon
        }
      }
    }
    pageInfo {
      currentPage
      pageSize
      totalPages
      totalElements
    }
  }
}
    `;

/**
 * __useWeatherInUserCitiesQuery__
 *
 * To run a query within a React component, call `useWeatherInUserCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWeatherInUserCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWeatherInUserCitiesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useWeatherInUserCitiesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<WeatherInUserCitiesQuery, WeatherInUserCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<WeatherInUserCitiesQuery, WeatherInUserCitiesQueryVariables>(WeatherInUserCitiesDocument, options);
      }
export function useWeatherInUserCitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WeatherInUserCitiesQuery, WeatherInUserCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<WeatherInUserCitiesQuery, WeatherInUserCitiesQueryVariables>(WeatherInUserCitiesDocument, options);
        }
export type WeatherInUserCitiesQueryHookResult = ReturnType<typeof useWeatherInUserCitiesQuery>;
export type WeatherInUserCitiesLazyQueryHookResult = ReturnType<typeof useWeatherInUserCitiesLazyQuery>;
export type WeatherInUserCitiesQueryResult = Apollo.QueryResult<WeatherInUserCitiesQuery, WeatherInUserCitiesQueryVariables>;