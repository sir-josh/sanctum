import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import connect from "../../constants/connect";
import { Spinner } from "../icons";
import { useRouter } from "next/router";

const ApproveCard = ({ org }) => {
  const queryClient = useQueryClient();
  const { chain } = useNetwork();
  const approveOrg = async ({
    orgId,
    orgOwner,
  }: {
    orgId: string;
    orgOwner: string;
  }) => {
    const { data } = await axios.post(`/api/organization/approve-org`, {
      orgId,
      orgOwner,
    });
    return data;
  };

  const { mutate, isLoading: isApproving } = useMutation({
    mutationFn: approveOrg,
    onSuccess: () => {
      // Invalidate and refetch
      console.log("written to db");
      queryClient.invalidateQueries({ queryKey: ["pending"] });
    },
  });

  const { config } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.sanctum?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[chain?.id]?.abi,
    functionName: "approveOrg",
    args: [org?.id],
  });

  const {
    write: approveOrgChain,
    data,
    isLoading: isWriting,
  } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(tx) {
      console.log("onchain completed", tx);
      mutate({ orgId: org?.id, orgOwner: org?.owner });
    },
  });

  return (
    <div className="flex gap-x-5">
      <span> {org?.name}</span>

      {isLoading || isApproving || isWriting ? (
        <Spinner />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => approveOrgChain?.()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </div>
  );
};
export default ApproveCard;
