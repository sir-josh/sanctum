import { useContext, useState } from "react";
import CampaignCard from "../../../components/organization/CampaignCard";
import Link from "next/link";
import { OrgContext } from "../../../contexts/OrgContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { org } = useContext(OrgContext);

  //getter for fetching campaigns
  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-org-campaigns?orgId=${org?.id}`
    );

    console.log(data);
    return data;
  };

  const { data: campaigns } = useQuery({
    queryKey: ["campaigns", org],
    queryFn: fetchCampaigns,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-medium">Active campaigns</h3>

        {campaigns?.length > 0 && (
          <Link
            href={"/organization/campaign/create"}
            className="bg-black px-3 py-2 text-white rounded-md"
          >
            Add New
          </Link>
        )}
      </div>

      {campaigns?.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign?.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="">
          <p className="mb-2"> No campaigns found</p>
          <div>
            <Link
              href={"/organization/campaign/create"}
              className="bg-black px-3 py-2 text-white rounded-md"
            >
              Add New
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Index;
