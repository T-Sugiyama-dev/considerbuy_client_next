"use client"
import { useState } from "react";
import { ProgressBar } from "./Progress";
import { FormProvider } from "./FormContext";
import { InitialCostForm } from "@/components/form/forms/InitialCostForm";
import { RunningCostForm } from "./forms/RunningCostForm";
import { ToolTermForm } from "./forms/ToolTermForm";
import { ToolDaysForm } from "@/components/form/forms/ToolDaysForm";
import { ToolHoursForm } from "@/components/form/forms/ToolHoursForm";
import { ProductivityForm } from "@/components/form/forms/ProductivityForm";
import { IncomeForm } from "./forms/IncomeForm";
import { WorkDaysForm } from "./forms/WorkDaysForm";
import { WorkHoursForm } from "./forms/WorkHoursForm";
import { ConfirmForm } from "@/components/form/forms/ConfirmForm";
import { FormData, ResultData } from "@/types";
import { client } from "../../lib";
import '../../app/animation.css';
import form from './form.module.css';

interface FormProps {
  setResultValue: (result: ResultData) => void;
  switchToDashboard: () => void;
}

export const Form = ({ setResultValue, switchToDashboard }: FormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    initialCost: 0,
    runningCost: 0,
    toolTerm: 0,
    toolDays: 0,
    toolHours: 0,
    productivity: 0,
    income: 0,
    workDays: 0,
    workHours: 0
  });
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const nextForm = (data: Partial<FormData>) => {
    setIsAnimating(true);
    setFormData({ ...formData, ...data });
    setTimeout(() => {
      setStep(step + 1);
      setIsAnimating(false);
    }, 1000);
  };

  const SubmitForm = () => {
    client.post('calcValue', formData)
      .then(({ data }) => {
        setResultValue(data);
        switchToDashboard();
      })
      .catch(error => {
        window.alert("不明なエラーが発生しました。");
        location.reload();
      });
  };

  return (
    <div className={form.container}>
      <div>
        <ProgressBar currentStep={step} totalSteps={9} />
        <FormProvider>
          <div className={`${isAnimating ? "fadeout_form" : "fadein_form"}`}>
            {step === 1  && <InitialCostForm callback={nextForm} />}
            {step === 2  && <RunningCostForm callback={nextForm} />}
            {step === 3  && <ToolTermForm callback={nextForm} />}
            {step === 4  && <WorkDaysForm callback={nextForm} />}
            {step === 5  && <ToolDaysForm callback={nextForm} />}
            {step === 6  && <WorkHoursForm callback={nextForm} />}
            {step === 7  && <ToolHoursForm callback={nextForm} />}
            {step === 8  && <ProductivityForm callback={nextForm} />}
            {step === 9  && <IncomeForm callback={nextForm} />}
            {step === 10 && <ConfirmForm callback={SubmitForm} />}
          </div>
        </FormProvider>
      </div>
    </div>
  );
}