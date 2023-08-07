import { UserActionDropdown } from "@/modules/user/components/UserActionDropdown";
import { Col, Row } from "antd";

import { Burger } from "@/modules/common/components/Burger";
import { WeatherCards } from "../../components/WeatherCards";
import { SearchCity } from "../../components/SearchCity";

import styles from "./styles.module.scss";

export const TopBar = () => {
  return (
    <Row justify={"space-between"} align={"middle"} className={styles.topBar}>
      <Col lg={16} md={14} xs={24}>
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
      <Col xs={0} md={9} lg={7}>
        <Row justify={"end"}>
          <UserActionDropdown />
        </Row>
      </Col>
    </Row>
  );
};
