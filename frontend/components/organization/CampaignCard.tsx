import Link from "next/link";
import { Verified } from "../icons";
import Campaign from "../../types/campaign";
import Image from "next/image";
import campaignImg from "../../public/img/campaign.png";
import orgImg from "../../public/img/org.jpg";

export function CampaignCard({
  campaign,
  donor = false,
}: {
  campaign: Campaign;
  donor?: boolean;
}) {
  return (
    <Link
      href={`/${donor ? "donor" : "organization"}/campaign/${campaign?.id}`}
    >
      <div className="rounded-md border hover:shadow-sm">
        <div className="">
          <Image
            src={campaignImg}
            alt="Campaign Image"
            className="h-[200px] w-full rounded-t-md object-cover"
          />
        </div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {campaign?.name}
          </h1>
          <p className="mt-3 text-sm text-gray-600">{campaign?.description}</p>
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
    </Link>
  );
}

export default CampaignCard;
