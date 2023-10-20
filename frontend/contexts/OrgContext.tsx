import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

export const OrgContext = createContext(null);

export const OrgContextProvider = ({ children }) => {
  const { address } = useAccount();

  const authCheck = async () => {
    const { data } = await axios.get(
      `/api/organization/check-auth?address=${address}`
    );

    return data;
  };

  const { data: org, isLoading } = useQuery({
    queryKey: ["org", address],
    queryFn: authCheck,
  });

  return (
    <OrgContext.Provider value={{ org, isLoading }}>
      {children}
    </OrgContext.Provider>
  );
};

export default OrgContextProvider;
