import { Verified } from "../icons";
import formatDateDb from "../../helpers/formatDateDb";
import Campaign from "../../types/campaign";
import campaignImg from "../../public/img/campaign.png";
import orgImg from "../../public/img/org.jpg";
import Image from "next/image";

const BigCampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <div className="flex w-full flex-col items-center rounded-md border ">
      <div className="h-full w-full md:h-[200px]">
        <Image
          src={campaignImg}
          alt="Campaign Image"
          className="h-[200px] w-full rounded-t-md object-cover"
        />
      </div>

      <div className="w-full p-4">
        <div className=" w-full">
          <div className=" flex items-center space-x-2">
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
