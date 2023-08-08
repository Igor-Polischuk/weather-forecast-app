import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import React from "react";


import { loginSchema } from "@modules/auth/schemas/login-validation-schema";
import InputField from "@modules/common/components/InputField";
import { useLogin } from "@modules/auth/hooks/useLogin";

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
    resolver: yupResolver(loginSchema),
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
      <p className={styles.error_message}>{error?.message}</p>
    </form>
  );
};
