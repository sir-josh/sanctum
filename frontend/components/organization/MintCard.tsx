import { useContext } from "react";
import { OrgContext } from "../../contexts/OrgContext";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import connect from "../../constants/connect";
import { Spinner } from "../icons";

const MintCard = () => {
  //@ts-ignore
  const { org } = useContext(OrgContext);

  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const verifyOrg = async (orgId: string) => {
    const { data } = await axios.post(`/api/organization/verify-org`, {
      orgId,
      address,
    });
    return data;
  };

  const { mutate, isLoading: isApproving } = useMutation({
    mutationFn: verifyOrg,
    onSuccess: () => {
      // Invalidate and refetch
      console.log("written to db");
      queryClient.invalidateQueries({ queryKey: ["org"] });
    },
  });

  const { config } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.sanctum?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[chain?.id]?.abi,
    functionName: "verifyOrg",
    args: [org?.id],
  });

  const {
    write: mintVerification,
    data,
    isLoading: isMinting,
  } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(tx) {
      console.log("onchain completed", tx);
      mutate(org?.id);
    },
  });

  return (
    <div className="">
      <p>Your application has been approved successfully!</p>

      <p>Mint your Verification NFT to start creating campaigns.</p>

      <button
        className="mt-4 w-[200px] items-center justify-center rounded-md bg-black px-3 py-2 font-semibold leading-7 text-white hover:bg-black/80 "
        onClick={() => mintVerification?.()}
      >
        {isLoading || isMinting ? (
          <Spinner load />
        ) : (
          <span> Mint Verification </span>
        )}
      </button>
    </div>
  );
};
export default MintCard;
