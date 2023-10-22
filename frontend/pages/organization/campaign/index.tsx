import { useContext, useState } from "react";
import CampaignCard from "../../../components/organization/CampaignCard";
import Link from "next/link";
import { OrgContext } from "../../../contexts/OrgContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { org } = useContext(OrgContext);

  //getter  for fetching campaigns
  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-org-campaigns?orgId=${org?.id}`
    );

    const actives = data?.filter((d) => d?.isActive == true);

    return actives;
  };

  const { data: campaigns } = useQuery({
    queryKey: ["campaigns", org],
    queryFn: fetchCampaigns,
  });

  if (!org) {
    return (
      <div className="flex flex-col gap-y-3">
        <h3>Hi there, </h3>
        <p>You don't seem to have a verified organization yet</p>
        <Link
          href={"/organization/create"}
          className="px-3 py-2 bg-black text-white border-b-2 border rounded-md w-fit"
        >
          Create an account
        </Link>
      </div>
    );
  }

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
