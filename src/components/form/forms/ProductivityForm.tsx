import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductivityFormData } from "@/types";
import { numPattern, decimalPattern, validateMax } from "@/lib";
import { error_blank, error_number_decimal, error_min_0, error_max_1000000 } from "../error_message";
import form from '../form.module.css';

type ProductivityFormProps = {
  callback: (data: ProductivityFormData) => void;
}

export const ProductivityForm = ({ callback }: ProductivityFormProps) => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductivityFormData>({
    mode: 'onChange'
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const minNum: number = 0;
  const maxNum: number = 1000000;

  const onSubmit: SubmitHandler<ProductivityFormData> = (data) => {
    let inputValue: string = data.productivity.toString();
    inputValue = inputValue.replace(/\D/g, "");
    data.productivity = Number(inputValue);

    if(data.productivity <= maxNum) {
      callback(data);
    }
  }

  const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(numPattern.test(e.target.value)){
      const inputValue: string = e.target.value.replace(/\D/g, "");
      setErrorMessage(validateMax(inputValue, maxNum, error_max_1000000));
      const formattedValue: string = Number(inputValue).toLocaleString();
      e.target.value = formattedValue;
    }else if(decimalPattern.test(e.target.value)) {
      const inputValue: string = e.target.value;
      setErrorMessage(validateMax(inputValue, maxNum, error_max_1000000));
      e.target.value = inputValue;
    }
  }

  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>そのツールの使用によって、どのくらいの生産性の向上を見込んでいますか？</p>
        <input
          inputMode="numeric"
          placeholder="%"
          {...register('productivity', {
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
              message: error_min_0
            },
            onChange(event) {
              addComma(event);
            }
          })}
        />
        {errors.productivity && <div className={form.error_message}>{errors.productivity.message}</div>}
        <span className={form.error_message}>{errorMessage}</span>
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}