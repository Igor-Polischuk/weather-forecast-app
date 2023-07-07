import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React from "react";

import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { schema } from "./validation-schema";
import InputField from "./components/InputField";

import styles from "./styles.module.scss";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onSubmit"
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="email"
        control={control}
        placeholder="Email"
        prefix={<MailOutlined />}
        errorMessage={errors.email?.message}
      />
      <InputField
        name="password"
        control={control}
        placeholder="Password"
        prefix={<LockOutlined />}
        type="password"
        errorMessage={errors.password?.message}
      />
      <Button type="primary" htmlType="submit" size="large" block>
        Log in
      </Button>
    </form>
  );
};
