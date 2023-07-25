import { useCallback, useState } from "react";
import { AutoComplete, Input } from "antd";

import { useGetCitiesTipsLazyQuery } from "@/gql";
import { debounce } from "../../../common/utils/debounce";
import { currentCityVar } from "@/apollo/weather-vars";

export const SearchCity = () => {
  const { Search } = Input;

  const [getCity, {data}] = useGetCitiesTipsLazyQuery();
  const [searchText, setSearchText] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCityDebounce = useCallback(debounce(getCity, 600), [])


  const onSelect = (data: string) => {
    currentCityVar(data)
  };

  const getOptions = () => {
    if (searchText === '' || !data) {
      return [];
    }

    return data.getCitiesTips.map(city => ({value: city.fullname, key: `${city.lat}${city.lon}`}));
  }

  const getPanelValue = (searchText: string) => {
    const city = searchText.trim()
    setSearchText(city);

    if (city === "") {
      return
    }

    getCityDebounce({ variables: { cityName: city } });
  };

  const onSearch = (value: string) => {
    const cityFullname = options[0]?.value || value
    console.log('onSearch ', cityFullname)
    currentCityVar(cityFullname)
  };

  const options = getOptions();

  return (
    <AutoComplete
      options={options}
      style={{ width: '100%' }}
      onSelect={onSelect}
      onSearch={(text) => getPanelValue(text)}
    >
      <Search
        placeholder="Input city"
        onSearch={onSearch}
        enterButton
      />
    </AutoComplete>
  );
};
