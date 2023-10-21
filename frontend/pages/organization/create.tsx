import axios from "axios";
import { useEffect, useState, forwardRef } from "react";
import connect from "../../constants/connect";
import { useRouter } from "next/router";
import {
  useAccount,
  useNetwork,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Spinner } from "../../components/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Dashboard = () => {
  const [org, setOrg] = useState({ name: "", description: "" });
  const [orgId, setOrgId] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  const { address } = useAccount();
  const router = useRouter();

  const handleInput = (e: any) => {
    setOrg({ ...org, [e.target.id]: e.target.value });
  };

  const { config, refetch, isLoading, isError, error, isSuccess } =
    usePrepareContractWrite({
      //@ts-ignore
      address: connect?.sanctum?.address,
      //@ts-ignore
      abi: connect?.sanctum?.abi,
      functionName: "registerOrg",
      args: [orgId],
      enabled: false,
    });

  const {
    write: registerOrg,
    data,
    isLoading: isRegistering,
  } = useContractWrite(config);

  const { isLoading: isWaitingTx } = useWaitForTransaction({
    hash: data?.hash,
    async onSuccess(tx) {
      //enable save button

      console.log(tx.blockHash);
      router.push("/organization");
    },
  });

  const createOrg = async () => {
    const { data: createdOrg } = await axios.post(
      "/api/organization/create-org",
      {
        ...org,
        address,
      }
    );

    setIsCreated(true);
    setOrgId(createdOrg?.id);

    console.log(createdOrg);
  };

  const writeOnChain = async () => {
    await refetch();
    if (isError) {
      console.log("error:", error);
    }

    registerOrg?.();
  };

  useEffect(() => {
    if (orgId) {
      console.log(orgId);
      writeOnChain();
    }
  }, [orgId, isSuccess]);

  return (
    <div>
      <ConnectButton />
      <h3 className="font-semibold">Enroll your Organization | {orgId}</h3>

      {isCreated && !isWaitingTx ? (
        <div className="w-[50%] mt-4">
          <p>Please confirm in wallet..</p>
          {isLoading && <span> Refteching..</span>}
          <Spinner />
        </div>
      ) : isCreated && isWaitingTx ? (
        <div className="w-[50%] mt-4">
          <p>Confirming Transaction..</p>
          <Spinner />
        </div>
      ) : (
        <div className="w-[50%] mt-4">
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="text-base  text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => handleInput(e)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Ex. Save a Girl Initiative"
                  id="name"
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="text-base  text-gray-900">
                Tell us about your Organization
              </label>
              <div className="mt-2">
                <textarea
                  onChange={(e) => handleInput(e)}
                  id="description"
                  rows={5}
                  className="flex  w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              onClick={createOrg}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
