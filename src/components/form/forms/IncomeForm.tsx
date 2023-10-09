import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IncomeFormData } from "@/types";
import { error_not_selected } from "../error_message";
import form from '../form.module.css';

type IncomeFormProps = {
  callback: (data: IncomeFormData) => void;
}

export const IncomeForm = ({ callback }: IncomeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeFormData>();

  const onSubmit: SubmitHandler<IncomeFormData> = (data) => {
    data.income = Number(data.income);
    callback(data);
  }

  return (
    <div className={form.wrapper}>
      <form className={form.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <p className={form.form_title}>年間の収入で、一番近い金額を以下の選択肢から選んでください。</p>
        <div className={form.select_wrapper}>
          <select
            {...register('income', {
              required: {
                value: true,
                message: error_not_selected
              }
            })}
          >
            <option value="">選択してください</option>
            <option value="5000000">500万円</option>
            <option value="7000000">700万円</option>
            <option value="10000000">1000万円</option>
            <option value="15000000">1500万円</option>
            <option value="20000000">2000万円</option>
            <option value="30000000">3000万円</option>
            <option value="50000000">5000万円</option>
            <option value="100000000">1億円</option>
          </select>

        </div>

        {errors.income && <div className={form.error_message}>{errors.income.message}</div>}
      
        <div className={form.btn_wrapper}>
          <button className={form.btn_next} type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}