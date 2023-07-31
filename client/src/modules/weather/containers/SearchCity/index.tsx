import { useCallback, useState } from "react";
import { AutoComplete, Input } from "antd";

import { useGetCitiesTipsLazyQuery } from "@/gql";
import { debounce } from "../../../common/utils/debounce";
import { currentCityVar } from "@/apollo/weather-vars";

export const SearchCity = () => {
  const [getCity, { data }] = useGetCitiesTipsLazyQuery();
  const [searchText, setSearchText] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCityDebounce = useCallback(debounce(getCity, 600), []);

  const onSelect = (data: string) => {
    currentCityVar(data);
  };

  const getOptions = () => {
    if (searchText === "" || !data) {
      return [];
    }

    return data.getCitiesTips.map((city) => ({
      value: city.fullname,
      key: `${city.lat}${city.lon}`,
    }));
  };

  const getPanelValue = (searchText: string) => {
    const city = searchText.trim();
    setSearchText(city);

    if (city === "") {
      return;
    }

    getCityDebounce({ variables: { cityName: city } });
  };

  const options = getOptions();

  return (
    <AutoComplete
      options={options}
      style={{ width: "100%" }}
      onSelect={onSelect}
      onSearch={(text) => getPanelValue(text)}
    >
      <Input
        placeholder="Input city"
        onPressEnter={(e) => {
          const cityFullname = options[0]?.value || e.currentTarget.value;
          currentCityVar(cityFullname);
        }}
        allowClear
      />
    </AutoComplete>
  );
};
