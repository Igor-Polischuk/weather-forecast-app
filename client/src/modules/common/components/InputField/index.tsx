import React from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "antd";

import styles from "./styles.module.scss";

interface InputFieldProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  defaultValue?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  type?: string;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  control,
  errorMessage,
  defaultValue = "",
  placeholder = "",
  prefix = null,
  type = "text",
}) => {
  return (
    <div className={styles.input_field}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            size="large"
            prefix={prefix}
            placeholder={placeholder}
            type={type}
            status={errorMessage && "error"}
            {...field}
          />
        )}
      />
      <p className={styles.errorMessage}>{errorMessage || "  "}</p>
    </div>
  );
};

export default InputField;
