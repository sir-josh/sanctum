import axios from "axios";
import BigCampaignCard from "../../../components/donor/BigCampaignCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import connect from "../../../constants/connect";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { Raised } from "../../../components/icons";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

const Donate = () => {
  const router = useRouter();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const debouncedAmount = useDebounce<string>(amount, 500);

  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/donor/get-campaign?campaignId=${router?.query?.id}`
    );

    return data;
  };

  const { data: campaign } = useQuery({
    queryKey: ["campaignS", router],
    queryFn: fetchCampaigns,
  });

  const recordDonationdb = async () => {
    const { data } = await axios.post("/api/donor/donate-campaign", {
      campaignId: router?.query?.id,
      amount: debouncedAmount,
      donor: address,
    });

    return data;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: recordDonationdb,
    onSuccess: (d) => {
      console.log(d);
      console.log("write to db!");
    },
  });

  const { data: usdcBal, isLoading: isLoadingBal } = useContractRead({
    address: connect?.ausdc?.[chain?.id]?.address,
    abi: connect?.ausdc?.[chain?.id]?.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  //---- approve ----//
  const { config: approveConfig, refetch: refetchAp } = usePrepareContractWrite(
    {
      //@ts-ignore
      address: connect?.ausdc?.[chain?.id]?.address,
      //@ts-ignore
      abi: connect?.ausdc?.[chain?.id]?.abi,
      functionName: "approve",
      args: [
        connect?.sanctum?.[chain?.id]?.address,
        ethers.parseUnits(debouncedAmount || "0", 6),
      ],
    }
  );

  const {
    write: approve,
    isLoading: isApproving,
    data: approveData,
  } = useContractWrite(approveConfig);

  const { isLoading: isApprovingTx } = useWaitForTransaction({
    hash: approveData?.hash,
    async onSuccess(tx) {
      if (tx) {
        setIsApproved(true);
        await refetch();
        donate?.();
      }
    },
  });

  //---- donate ----//
  const { config: saveConfig, refetch } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.sanctum?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[chain?.id]?.abi,
    functionName: "donateToCampaign",
    value: chain?.id == 44787 ? "0" : ethers.parseEther("2"),
    enabled: true,
    args:
      //if user is on Celo
      chain?.id == 44787
        ? [
            campaign?.id,
            Number(ethers.parseUnits(debouncedAmount || "0", 6) || "0"),
          ]
        : [
            "celo",
            connect?.sanctum?.[44787]?.address,
            "aUSDC",
            Number(ethers.parseUnits(debouncedAmount || "0", 6) || "0"),
            campaign?.id,
          ],
  });

  const {
    write: donate,
    data: saveData,
    isLoading: isSaving,
  } = useContractWrite(saveConfig);

  const { isLoading: isWaitingSaveTx } = useWaitForTransaction({
    hash: saveData?.hash,
    onSuccess(tx) {
      mutate();
      console.log("Successful!!!");
    },
  });

  return (
    <div>
      <h3 className="mb-4 font-medium">Donate Now </h3>
      <div className="flex gap-x-8">
        <BigCampaignCard campaign={campaign} />

        <div className="mt-1 mb-1 w-full">
          <div className="flex justify-between">
            <div className="w-[80%]">
              <p className="flex gap-x-1">
                <Raised />
                {
                  //@ts-ignore
                  parseFloat(ethers?.formatUnits(usdcBal || "0", 6)).toFixed(2)
                }{" "}
                aUSDC
              </p>

              <div className="mt-5 flex flex-col gap-y-5">
                <div>
                  <label htmlFor="amount" className="text-base  text-gray-900">
                    Amount
                  </label>
                  <div className="mt-1">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="5"
                      id="amount"
                      onChange={(e) => setAmount(e.target.value)}
                    ></input>
                  </div>
                </div>

                <button
                  onClick={() => approve?.()}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Donate;
