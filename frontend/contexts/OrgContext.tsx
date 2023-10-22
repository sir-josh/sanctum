import { ReactNode, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

export const OrgContext = createContext(null);

export const OrgContextProvider = ({ children }: { children: ReactNode }) => {
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
    <OrgContext.Provider
      //@ts-ignore
      value={{ org, isLoading }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export default OrgContextProvider;
