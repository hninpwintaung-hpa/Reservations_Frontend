import React, { createContext, useState, useContext } from "react";

interface SuccessMessageContextProps {
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
}

const SuccessMessageContext = createContext<SuccessMessageContextProps>({
  successMessage: null,
  setSuccessMessage: () => {},
});

export const useSuccessMessage = () => useContext(SuccessMessageContext);

export const SuccessMessageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <SuccessMessageContext.Provider
      value={{ successMessage, setSuccessMessage }}
    >
      {children}
    </SuccessMessageContext.Provider>
  );
};
