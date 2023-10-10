import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { WorkDaysFormData } from "@/types";
import { numPattern, validateMax } from "@/lib/form";
import { useFormContext } from "../FormContext";
import { error_blank, error_number, error_min_1, error_max_7 } from "../error_message";
import form from '../form.module.css';

type WorkDaysFormProps = {
  callback: (data: WorkDaysFormData) => void;
}

export const WorkDaysForm = ({ callback }: WorkDaysFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkDaysFormData>({
    mode: 'onChange'
  });
  const { setPreviousNumber } = useFormContext();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 1;
  const maxNum: number = 7;

  const onSubmit: SubmitHandler<WorkDaysFormData> = (data) => {
    let inputValue: string = data.workDays.toString();
    inputValue = inputValue.replace(/\D/g, "");
    data.workDays = Number(inputValue);

    if(data.workDays <= maxNum) {
      setPreviousNumber(Number(data.workDays));
      callback(data);
    }
  }

  const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(numPattern.test(e.target.value)) {
      const inputValue: string = e.target.value.replace(/\D/g, "");
      setErrorMessage(validateMax(inputValue, maxNum, error_max_7));
      const formattedValue: string = Number(inputValue).toLocaleString();
      e.target.value = formattedValue;
    }
  }


  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>1週間で何日間、働きますか？</p>
        <input
          inputMode="numeric"
          placeholder="日"
          {...register('workDays', {
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
        {errors.workDays && <div className={form.error_message}>{errors.workDays.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}