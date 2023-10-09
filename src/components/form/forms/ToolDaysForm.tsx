import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormContext } from "../FormContext";
import { ToolDaysFormData } from "@/types";
import { numPattern, validateMax } from "@/lib";
import { error_number, error_blank, error_min_1, error_max_work_days } from "../error_message";
import form from '../form.module.css';

type ToolDaysFormProps = {
  callback: (data: ToolDaysFormData) => void;
}

export const ToolDaysForm = ({ callback }: ToolDaysFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolDaysFormData>({
    mode: 'onChange'
  });
  const { previousNumber } = useFormContext();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 1;
  const maxNum: number = previousNumber;

  const onSubmit: SubmitHandler<ToolDaysFormData> = (data) => {
    let inputValue: string = data.toolDays.toString();
    inputValue = inputValue.replace(/\D/g, "");
    data.toolDays = Number(inputValue);

    if(data.toolDays <= maxNum) {
      callback(data);
    }
  }

  const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(numPattern.test(e.target.value)) {
      const inputValue: string = e.target.value.replace(/\D/g, "");
      setErrorMessage(validateMax(inputValue, maxNum, error_max_work_days));
      const formattedValue: string = Number(inputValue).toLocaleString();
      e.target.value = formattedValue;
    }
  }

  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>{previousNumber}日間の業務で、そのツールを何日間使用しますか？</p>
        <input
          inputMode="numeric"
          placeholder="日"
          {...register('toolDays', {
            required: {
              value: true,
              message: error_blank
            },
            pattern: {
              value: numPattern,
              message: error_number
            },
            min: {
              value: minNum,
              message: error_min_1,
            },
            onChange(event) {
              addComma(event);
            }
          })}
        />
        {errors.toolDays && <div className={form.error_message}>{errors.toolDays.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}
