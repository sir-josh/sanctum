import Link from "next/link";
import CampaignCard from "./CampaignCard";

const ActiveTab = ({ campaigns }) => {
  return (
    <>
      {campaigns?.length > 0 ? (
        <div className="lg:grid lg:grid-cols-2 gap-3 min-h-[150px]">
          {campaigns?.map((campaign) => (
            <CampaignCard key={campaign?.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center  min-h-[150px] flex flex-col  items-center justify-center">
          <p className="mb-2">No Active Campaign</p>
          <Link
            href="/organization/campaign/create"
            className="bg-black inline-block text-white rounded-md leading-none py-2 px-4  hover:bg-black/80"
          >
            Create campaign
          </Link>
        </div>
      )}
    </>
  );
};
export default ActiveTab;
