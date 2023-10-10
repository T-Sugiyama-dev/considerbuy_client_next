import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToolTermFormData } from "@/types";
import { numPattern, decimalPattern, validateMax } from "@/lib/form";
import { error_blank, error_number_decimal, error_min_001, error_max_100 } from "../error_message";
import form from '../form.module.css';

type ToolTermFormProps = {
  callback: (data: ToolTermFormData) => void;
}

export const ToolTermForm = ({ callback }: ToolTermFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolTermFormData>({
    mode: 'onChange'
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 0.01;
  const maxNum: number = 100;

  const onSubmit: SubmitHandler<ToolTermFormData> = (data) => {
    let inputValue: string = data.toolTerm.toString();
    inputValue = inputValue.replace(/[^\d.]/g, "");
    data.toolTerm = Number(inputValue);

    if(data.toolTerm <= maxNum) {
      callback(data);
    }
  }

  const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(numPattern.test(e.target.value)){
      const inputValue: string = e.target.value.replace(/\D/g, "");
      setErrorMessage(validateMax(inputValue, maxNum, error_max_100));
      const formattedValue: string = Number(inputValue).toLocaleString();
      e.target.value = formattedValue;
    }else if(decimalPattern.test(e.target.value)) {
      const inputValue: string = e.target.value;
      setErrorMessage(validateMax(inputValue, maxNum, error_max_100));
      e.target.value = inputValue;
    }
  }

  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>何年間、そのツールを使用する予定ですか？</p>
        <input
          inputMode="numeric"
          placeholder="年"
          {...register('toolTerm', {
            required: {
              value: true,
              message: error_blank
            },
            pattern: {
              value: decimalPattern,
              message: error_number_decimal
            },
            min: {
              value: minNum,
              message: error_min_001
            },
            onChange(event) {
              addComma(event);
            }
          })}
        />
        {errors.toolTerm && <div className={form.error_message}>{errors.toolTerm.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}