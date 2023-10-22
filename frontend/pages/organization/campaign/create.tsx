import { forwardRef, useContext, useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { OrgContext } from "../../../contexts/OrgContext";
import connect from "../../../constants/connect";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "../../../components/icons";

type Props = {
  value: string;
  onClick: () => void;
};

const Create = () => {
  //@ts-ignore
  const { org } = useContext(OrgContext);
  const { address } = useAccount();
  const [campaignDb, setCampaignDb] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [campaign, setCampaign] = useState({
    name: "",
    target: "",
    description: "",
  });

  const router = useRouter();
  const { chain } = useNetwork();

  // eslint-disable-next-line react/display-name
  const ExpiryDatePicker = forwardRef(({ value, onClick }: Props, ref) => (
    <input
      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      value={value}
      onClick={onClick}
      //@ts-ignore
      ref={ref}
      readOnly
    />
  ));

  const {
    config,
    refetch,
    isSuccess: IsRefreshed,
  } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.sanctum?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[chain?.id]?.abi,
    functionName: "createCampaign",
    args: [
      org?.id,
      //@ts-ignore
      campaignDb?.id,
      //@ts-ignore
      campaignDb?.target,
      deadline?.getTime() / 1000,
    ],
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
      router.push("/organization/campaign");
    },
  });

  const createCampaignDb = async () => {
    setIsWriting(true);
    const { data } = await axios.post("/api/organization/create-campaign", {
      ...campaign,
      deadline,
      orgId: org?.id,
      address,
    });

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

  //@ts-ignore
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
                disabled={isWriting || isCreating || isWaitingTx}
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
                disabled={isWriting || isCreating || isWaitingTx}
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
                disabled={isWriting || isCreating || isWaitingTx}
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
            <div className="mt-2 w-full">
              <DatePicker
                selected={deadline}
                //@ts-ignore
                customInput={<ExpiryDatePicker />}
                //@ts-ignore
                onChange={(date) => setDeadline(date)}
              />
            </div>
          </div>
          <button
            onClick={() => createCampaignDb()}
            disabled={isWriting || isCreating || isWaitingTx}
            type="button"
            className=" w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 "
          >
            {isWriting || isCreating || isWaitingTx ? (
              <Spinner load />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Create;
