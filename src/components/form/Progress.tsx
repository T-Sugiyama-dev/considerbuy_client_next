"use client"
import { useState, useEffect } from "react";
import form from './form.module.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const calculatedPercentage = ((currentStep - 1) / totalSteps) * 100;
      setPercentage(calculatedPercentage);
    };

    calculatePercentage();
  }, [currentStep, totalSteps]);

  if (currentStep === 10) {
    return null;
  }

  return (
    <div className={form.progress_bar}>
      <div className={form.progress} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};