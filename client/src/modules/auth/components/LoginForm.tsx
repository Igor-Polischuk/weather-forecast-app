import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React from "react";

import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { schema } from "../validation-schema";
import InputField from "./InputField";
import { useLogin } from "../hooks/useLogin";

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
    mode: "onSubmit",
    defaultValues: {
      email: 'somebody@gmail.com',
      password: 'qwerty123'
    }
  });

  const { loading, error, onSubmit } = useLogin();

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
      <Button type="primary" htmlType="submit" size="large" block loading={loading}>
        Log in
      </Button>
      {error && <p className={styles.error_message}>{error.message}</p>}
    </form>
  );
};
