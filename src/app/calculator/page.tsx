"use client"
import { useState } from "react";
import { Form } from "@/components/form/Form";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ResultData } from "@/types";
import '../animation.css';


export default function Calculator() {
  const [showForm, setShowForm] = useState(true);
  const [resultValue, setResultValue] = useState<ResultData>();

  const switchToForm = () => {
    setShowForm(true);
  }

  const switchToDashboard = () => {
    setShowForm(false);
  }
  
  return showForm ? (
    <Form setResultValue={setResultValue} switchToDashboard={switchToDashboard} />
  ) : (
    <Dashboard result={resultValue} switchToForm={switchToForm} />
  );
  
}