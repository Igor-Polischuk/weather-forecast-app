import { CloseCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { FC, ReactElement, useState } from "react";
import styles from "./styles.module.scss";
import { Col, Row } from "antd";
import { UserActionDropdown } from "@/modules/user/components/UserActionDropdown";

interface IBurgerProps {
  children: ReactElement;
}

export const Burger: FC<IBurgerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeClass = isOpen ? (styles.active as string) : "";

  const handleToggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  document.body.style.overflow = isOpen ? "hidden" : "auto";

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={handleToggleMenu}></div>
      )}
      <div className={styles.burgerWrapper}>
        <MenuOutlined className={styles.burger} onClick={handleToggleMenu} />

        <div className={`${styles.burgerBody} ${activeClass}`}>
          <Row justify={"space-between"} className={styles.burgerHeader}>
            <Col>
              <CloseCircleOutlined onClick={handleToggleMenu} />
            </Col>
            <Col>
              <Row justify={"end"}>
                <UserActionDropdown />
              </Row>
            </Col>
          </Row>
          <div className={styles.burgerContent}>{children}</div>
        </div>
      </div>
    </>
  );
};
