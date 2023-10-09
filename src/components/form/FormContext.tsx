import React, { createContext, useContext, useState, ReactNode } from 'react';

const FormContext = createContext<any>(0);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [previousNumber, setPreviousNumber] = useState<number>();

  return (
    <FormContext.Provider value={{ previousNumber, setPreviousNumber }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => useContext(FormContext);
