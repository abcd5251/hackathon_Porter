import React, { createContext, useContext, useState } from "react";
import { tokenDetails as initialTokenDetails } from "../config/tokenBalance";

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [tokenDetails, setTokenDetails] = useState(initialTokenDetails);

  return (
    <TokenContext.Provider value={{ tokenDetails, setTokenDetails }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenDetails = () => useContext(TokenContext);
