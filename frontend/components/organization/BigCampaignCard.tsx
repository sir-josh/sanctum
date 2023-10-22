import axios from "axios";
import { Spinner, Verified } from "../icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import connect from "../../constants/connect";
import formatDateDb from "../../helpers/formatDateDb";
import Campaign from "../../types/campaign";
import Image from "next/image";
import campaignImg from "../../public/img/campaign.png";
import orgImg from "../../public/img/org.jpg";

const BigCampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const { chain } = useNetwork();
  const queryClient = useQueryClient();

  const { data: camps } = useContractRead({
    //@ts-ignore
    address: connect?.sanctum?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[chain?.id]?.abi,
    functionName: "getCampaignDonors",
    args: [campaign?.id],
  });

  //update db
  const deactivateCampaign = async () => {
    const { data } = await axios.post("/api/organization/withdraw-donation", {
      campaignId: campaign?.id,
    });

    return data;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: deactivateCampaign,
    onSuccess: (d) => {
      console.log(d);
      console.log("write to db!");
      queryClient.invalidateQueries({ queryKey: ["campaign"] });
    },
  });

  //blockchain
  const { config, refetch } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.sanctum?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[chain?.id]?.abi,
    functionName: "withdrawDonation",
    args: [campaign?.id],
    enabled: false,
  });

  const {
    write: withdraw,
    isLoading: isWithdrawing,
    data,
  } = useContractWrite(config);

  const handleWithDraw = async () => {
    await refetch();
    withdraw?.();
  };

  const { isLoading: isApprovingTx } = useWaitForTransaction({
    hash: data?.hash,
    async onSuccess(tx) {
      if (tx) {
        mutate();
      }
    },
  });

  return (
    <div className="flex max-w-2xl pl-4 flex-col items-center rounded-md border md:flex-row justify-between">
      <div className="h-full w-full md:h-[200px]">
        <Image
          src={campaignImg}
          alt="Campaign Image"
          className="h-[200px] w-full rounded-t-md object-cover"
        />
      </div>
      <div className="w-full">
        <div className="p-4 w-full">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {campaign?.name}
          </h1>

          <p className="mt-3  text-gray-600">{campaign?.description}</p>

          <div className="flex items-baseline justify-between gap-x-4  w-full">
            <p className="mt-3  text-gray-600">
              Ends {formatDateDb(campaign?.deadline)}
            </p>
            {/* @ts-ignore */}
            {camps?.length > 0 && (
              <button
                onClick={() => handleWithDraw()}
                className={`${
                  campaign?.isActive ? "bg-black" : "bg-black/20"
                } px-3 py-2 rounded-lg text-white`}
              >
                {isWithdrawing || isApprovingTx ? (
                  <Spinner load />
                ) : !campaign?.isActive ? (
                  "Ended"
                ) : (
                  "Withdraw"
                )}
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center space-x-2">
            <Image
              className="inline-block h-8 w-8 rounded-full object-cover"
              src={orgImg}
              alt="Org image"
            />
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900 flex items-center">
                {campaign?.organizer?.name} <Verified />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BigCampaignCard;
