
export type InitialCostFormData = {
  initialCost: number;
}

export type RunningCostFormData = {
  runningCost: number;
}

export type ToolTermFormData = {
  toolTerm: number;
}

export type ToolDaysFormData = {
  toolDays: number;
}

export type ToolHoursFormData = {
  toolHours: number;
}

export type ProductivityFormData = {
  productivity: number;
}

export type IncomeFormData = {
  income: number;
}

export type WorkDaysFormData = {
  workDays: number;
}

export type WorkHoursFormData = {
  workHours: number;
}

export type FormData = InitialCostFormData 
                     & RunningCostFormData
                     & ToolTermFormData
                     & ToolDaysFormData
                     & ToolHoursFormData
                     & ProductivityFormData
                     & IncomeFormData
                     & WorkDaysFormData
                     & WorkHoursFormData

export type ResultData = {
  toolTerm         : number;
  workHours        : number;
  monthlyWorkDays  : number;
  annualWorkDays   : number;
  hourlyWage       : number;
  dailySavedMinutes: number;
  dailyProfit      : number;
  savedTime        : number;
  profit           : number;
  totalCost        : number;
  roi              : number;
  paybackDays      : number;
}