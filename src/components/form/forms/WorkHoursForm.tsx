import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormContext } from "../FormContext";
import { WorkHoursFormData } from "@/types";
import { numPattern, decimalPattern, validateMax } from "@/lib";
import { error_blank, error_number_decimal, error_min_001, error_max_24 } from "../error_message";
import form from '../form.module.css';

type WorkHoursFormProps = {
  callback: (data: WorkHoursFormData) => void;
}

export const WorkHoursForm = ({ callback }: WorkHoursFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkHoursFormData>({
    mode: 'onChange'
  });
  const { setPreviousNumber } = useFormContext();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 0.01;
  const maxNum: number = 24;

  const onSubmit: SubmitHandler<WorkHoursFormData> = (data) => {
    let inputValue: string = data.workHours.toString();
    inputValue = inputValue.replace(/\D/g, "");
    data.workHours = Number(inputValue);

    if(data.workHours <= maxNum) {
      setPreviousNumber(Number(data.workHours));
      callback(data);
    }
  }

  const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(numPattern.test(e.target.value)){
      const inputValue: string = e.target.value.replace(/\D/g, "");
      setErrorMessage(validateMax(inputValue, maxNum, error_max_24));
      const formattedValue: string = Number(inputValue).toLocaleString();
      e.target.value = formattedValue;
    }else if(decimalPattern.test(e.target.value)) {
      const inputValue: string = e.target.value;
      setErrorMessage(validateMax(inputValue, maxNum, error_max_24));
      e.target.value = inputValue;
    }
  }

  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>1日の何時間、働きますか？</p>
        <input
          inputMode="numeric"
          placeholder="時間"
          {...register('workHours', {
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
              message: error_min_001,
            },
            onChange(event) {
              addComma(event);
            }
          })}
        />
        {errors.workHours && <div className={form.error_message}>{errors.workHours.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}