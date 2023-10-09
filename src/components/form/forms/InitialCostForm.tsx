import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InitialCostFormData } from "@/types";
import { numPattern, validateMax } from "@/lib";
import { error_blank, error_number, error_min_0, error_max_1000000000 } from "../error_message";
import form from '../form.module.css';

type InitialCostFormProps = {
  callback: (data: InitialCostFormData) => void;
}

export const InitialCostForm = ({ callback }: InitialCostFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialCostFormData>({
    mode: 'onChange'
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 0;
  const maxNum: number = 1000000000;

  const onSubmit: SubmitHandler<InitialCostFormData> = (data) => {
    let inputValue: string = data.initialCost.toString();
    inputValue = inputValue.replace(/\D/g, "");
    data.initialCost = Number(inputValue);

    if(data.initialCost <= maxNum) {
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
        <p className={form.form_title}>初期費用を入力してください。</p>
        <input
          inputMode="numeric"
          placeholder="¥"
          {...register('initialCost', {
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
              message: error_min_0,
            },
            onChange(event) {
              addComma(event);
            },
          })}
        />
        {errors.initialCost && <div className={form.error_message}>{errors.initialCost.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}
