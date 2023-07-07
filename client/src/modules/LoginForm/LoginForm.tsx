import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

import styles from "./styles.module.scss";

export const LoginForm: React.FC = () => {
  return (
    <form className={styles.login_form}>
      <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
      <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
      >
        Log in
      </Button>
    </form>
  );
};
