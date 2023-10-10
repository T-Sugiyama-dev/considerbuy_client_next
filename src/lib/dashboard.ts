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

