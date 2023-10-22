import axios from "axios";
import { Verified } from "../icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import connect from "../../constants/connect";
import formatDateDb from "../../helpers/formatDateDb";

const BigCampaignCard = ({ campaign }) => {
  const queryClient = useQueryClient();

  //update db
  const deactivateCampaign = async () => {
    const { data } = await axios.post("/api/organization/withdraw-donation", {
      campaignId: campaign?.id,
    });

    console.log(data);
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
  const { config } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.sanctum?.address,
    //@ts-ignore
    abi: connect?.sanctum?.abi,
    functionName: "withdrawDonation",
    args: [campaign?.id],
    enabled: false,
  });

  const {
    write: withdraw,
    isLoading: isWithdrawing,
    data,
  } = useContractWrite(config);

  const { isLoading: isApprovingTx } = useWaitForTransaction({
    hash: data?.hash,
    async onSuccess(tx) {
      if (tx) {
        mutate();
      }
    },
  });

  return (
    <div className="flex w-full flex-col items-center rounded-md border ">
      <div className="h-full w-full md:h-[200px] ]">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="Laptop"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="w-full p-4">
        <div className=" w-full">
          <div className=" flex items-center space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full"
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt="Dan_Abromov"
            />
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900 flex items-center">
                {campaign?.organizer?.name} <Verified />
              </span>
            </span>
          </div>

          <h1 className="inline-flex items-center text-xl font-semibold">
            {campaign?.name}
          </h1>
          <p className="mt-3  text-gray-600">{campaign?.description}</p>

          <div className="flex items-baseline justify-between">
            <p className="mt-3 text-sm text-gray-600">
              Ends {formatDateDb(campaign?.deadline)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BigCampaignCard;
