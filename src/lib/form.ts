export const numPattern = /^(?!,)([0-9]+,?)+$/;
export const decimalPattern = /^(?!,)([0-9]+,?)*(\.[0-9]{1,2})?$/;

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