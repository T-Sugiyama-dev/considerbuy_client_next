import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RunningCostFormData } from "@/types";
import { numPattern, validateMax } from "@/lib/form";
import { error_blank, error_number, error_min_0, error_max_1000000000 } from "../error_message";
import form from '../form.module.css';

type RunningCostFormProps = {
  callback: (data: RunningCostFormData) => void;
}

export const RunningCostForm = ({ callback }: RunningCostFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RunningCostFormData>({
    mode: 'onChange'
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 0;
  const maxNum: number = 1000000000;

  const onSubmit: SubmitHandler<RunningCostFormData> = (data) => {
    let inputValue: string = data.runningCost.toString();
    inputValue = inputValue.replace(/\D/g, "");
    data.runningCost = Number(inputValue);

    if(data.runningCost <= maxNum) {
      callback(data);
    }
  }

  const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(numPattern.test(e.target.value)) {
      const inputValue: string = e.target.value.replace(/\D/g, "");
      setErrorMessage(validateMax(inputValue, maxNum, error_max_1000000000));
      const formattedValue: string = Number(inputValue).toLocaleString();
      e.target.value = formattedValue;
    }
  }

  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>年間のランニングコストを入力してください。</p>
        <input
          inputMode="numeric"
          placeholder="¥"
          {...register('runningCost', {
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
              message: error_min_0
            },
            onChange(event) {
              addComma(event);
            }
          })}
        />
        {errors.runningCost && <div className={form.error_message}>{errors.runningCost.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}