import { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { OrgContext } from "../../../contexts/OrgContext";
import connect from "../../../constants/connect";
import axios from "axios";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const Create = () => {
  const { org } = useContext(OrgContext);
  const { address } = useAccount();
  const [campaignDb, setCampaignDb] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [campaign, setCampaign] = useState({
    name: "",
    target: "",
    description: "",
    deadline: "",
  });

  const router = useRouter();

  const {
    config,
    refetch,
    isLoading,
    isSuccess: IsRefreshed,
  } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.sanctum?.address,
    //@ts-ignore
    abi: connect?.sanctum?.abi,
    functionName: "createCampaign",
    args: [org?.id, campaignDb?.id, campaignDb?.target, campaignDb?.deadline],
    enabled: false,
  });

  const {
    write: createCampaign,
    data,
    isLoading: isCreating,
  } = useContractWrite(config);

  const { isLoading: isWaitingTx } = useWaitForTransaction({
    hash: data?.hash,
    async onSuccess(tx) {
      //enable save button
      console.log("written Onchain");
      console.log(tx.blockHash);
      router.push("/organization/campaign");
    },
  });

  const createCampaignDb = async () => {
    const { data } = await axios.post("/api/organization/create-campaign", {
      ...campaign,
      orgId: org?.id,
      address,
    });

    data && console.log(data);
    setIsCreated(true);
    setCampaignDb(data);
  };

  const writeOnChain = async () => {
    await refetch();

    createCampaign?.();
  };

  useEffect(() => {
    if (campaignDb) {
      console.log(campaignDb);
      writeOnChain();
    }
  }, [campaignDb, IsRefreshed]);

  const handleInput = (e) => {
    setCampaign({ ...campaign, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <h3>Create new campaign</h3>

      <div className="w-[50%] mt-4">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleInput(e)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Ex. Support African Kids Education"
                id="name"
              ></input>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-900"
            >
              Target
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleInput(e)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="500 aUSDC"
                id="target"
              ></input>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-base font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                onChange={(e) => handleInput(e)}
                rows={5}
                id="description"
                placeholder="We have young minds from Lagos, Nigeria who we're actively supporting in school fees and educational accessories."
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              ></textarea>
            </div>
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="text-base font-medium text-gray-900"
            >
              Deadline
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleInput(e)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="target"
                id="deadline"
              ></input>
            </div>
          </div>
          <button
            onClick={() => createCampaignDb()}
            type="button"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
export default Create;
