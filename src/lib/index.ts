import axios from 'axios';
import { API_URL } from '../config';

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const numPattern = /^(?!,)([0-9]+,?)+$/;
export const decimalPattern = /^(?!,)([0-9]+,?)*(\.[0-9]{1,2})?$/;

export const convertHours = (savedHours: number, workHours: number, monthlyWorkDays: number, annualWorkDays: number) => {

  const hoursInDay = workHours;
  const daysInMonth = monthlyWorkDays;
  const daysInYear = annualWorkDays;

  const totalDays = savedHours / hoursInDay;
  const years = Math.floor(totalDays / daysInYear);
  const remainingDays1 = totalDays % daysInYear;

  const months = Math.floor(remainingDays1 / daysInMonth);
  const remainingDays2 = remainingDays1 % daysInMonth;

  return years + "年 " + months + "ヶ月 " + Math.floor(remainingDays2) + "日";
}

export const checkPayback = (paybackDays: number, toolTerm: number) => {
  const totalToolDays: number = toolTerm * 365.25;
  if(paybackDays > Math.floor(totalToolDays)) {
    return false;
  }
  return true;
}

export const convertDays = (paybackDays: number, monthlyWorkDays: number, annualWorkDays: number) => {
  const daysInMonth = monthlyWorkDays;
  const daysInYear = annualWorkDays;

  const years = Math.floor(paybackDays / daysInYear);
  const remainingDays1 = paybackDays % daysInYear;

  const months = Math.floor(remainingDays1 / daysInMonth);
  const remainingDays2 = remainingDays1 % daysInMonth;

  return years + "年 " + months + "ヶ月 " + Math.floor(remainingDays2) + "日";
}

export const topDelay: number = 0.5;
export const dashboardDelay: number = 0.25;

export const topProps = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export const dashboardProps = {
  initial: {
    x: 100,
    opacity: 0,
    scale: 0.7,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export const addComma = (e: React.ChangeEvent<HTMLInputElement>) => {
  if(numPattern.test(e.target.value)) {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = Number(value).toLocaleString();
    e.target.value = formattedValue;
  }
}

export const validateMax = (inputValue: string, validateNum: number, message: string) => {
  if(Number(inputValue) > validateNum) {
    return message;
  } else {
    return "";
  }
}
