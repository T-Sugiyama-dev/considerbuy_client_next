import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormContext } from "../FormContext";
import { ToolHoursFormData } from "@/types";
import { numPattern, decimalPattern, validateMax } from "@/lib/form";
import { error_blank, error_number_decimal, error_min_001, error_max_work_hours } from "../error_message";
import form from '../form.module.css';

type ToolHoursFormProps = {
  callback: (data: ToolHoursFormData) => void;
}

export const ToolHoursForm = ({ callback }: ToolHoursFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolHoursFormData>({
    mode: 'onChange'
  });
  const { previousNumber } = useFormContext();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 0.01;
  const maxNum: number = previousNumber;
  
  const onSubmit: SubmitHandler<ToolHoursFormData> = (data) => {
    let inputValue: string = data.toolHours.toString();
    inputValue = inputValue.replace(/[^\d.]/g, "");
    data.toolHours = Number(inputValue);

    if(data.toolHours <= maxNum) {
      callback(data);
    }
  }

  const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(numPattern.test(e.target.value)){
      const inputValue: string = e.target.value.replace(/\D/g, "");
      setErrorMessage(validateMax(inputValue, maxNum, error_max_work_hours));
      const formattedValue: string = Number(inputValue).toLocaleString();
      e.target.value = formattedValue;
    }else if(decimalPattern.test(e.target.value)) {
      const inputValue: string = e.target.value;
      setErrorMessage(validateMax(inputValue, maxNum, error_max_work_hours));
      e.target.value = inputValue;
    }
  }

  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>{previousNumber}時間の業務で、そのツールを何時間使用しますか？</p>
        <input
          inputMode="numeric"
          placeholder="時間"
          {...register('toolHours', {
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
        {errors.toolHours && <div className={form.error_message}>{errors.toolHours.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}