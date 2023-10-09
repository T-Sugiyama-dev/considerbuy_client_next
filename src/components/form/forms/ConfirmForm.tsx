import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData } from "@/types";
import form from '../form.module.css';

type ConfirmFormProps = {
  callback: (data: FormData) => void;
}

export const ConfirmForm = ({ callback }: ConfirmFormProps) => {
  const {
    handleSubmit,
  } = useForm<FormData>();
  
  const onSubmit: SubmitHandler<FormData> = (data) => callback(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button className={form.btn_confirm} type="submit">See the dashboard</button>
    </form>
  );
}