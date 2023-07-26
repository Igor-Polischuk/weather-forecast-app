import { UserDropdown } from "@/modules/user/components/UserDropdown";
import { Col, Row } from "antd";

import { Burger } from "@/modules/common/components/Burger";
import { SearchCity } from "../SearchCity";
import { WeatherCards } from "../WeatherCards";

export const TopBar = () => {
  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col md={16} xs={24}>
        <Row justify={"space-between"} align={"middle"}>
          <Col xs={20} md={24}>
           <SearchCity/>
          </Col>
          <Col xs={4} md={0}>
            <Row justify={"end"}>
              <Burger>
                <WeatherCards/>
              </Burger>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col md={7} xs={0}>
        <Row justify={"end"}>
          <UserDropdown />
        </Row>
      </Col>
    </Row>
  );
};
