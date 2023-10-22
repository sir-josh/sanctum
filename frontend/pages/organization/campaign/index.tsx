import { useContext, useState } from "react";
import CampaignCard from "../../../components/organization/CampaignCard";
import Link from "next/link";
import { OrgContext } from "../../../contexts/OrgContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Campaign from "../../../types/campaign";
import { AwaitingCard } from "../../../components/organization";
import { Spinner } from "../../../components/icons";

const Index = () => {
  //@ts-ignore
  const { org } = useContext(OrgContext);

  //getter  for fetching campaigns
  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-org-campaigns?orgId=${org?.id}`
    );

    const actives: Campaign[] = data?.filter(
      (d: Campaign) => d?.isActive == true
    );

    return actives;
  };

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns", org],
    queryFn: fetchCampaigns,
  });

  if (!org) {
    return (
      <div className="flex flex-col gap-y-3">
        <h3>Hi there, </h3>
        <p>You don&apos;t seem to have a verified organization yet</p>
        <Link
          href={"/organization/create"}
          className="px-3 py-2 bg-black text-white border-b-2 border rounded-md w-fit"
        >
          Create an account
        </Link>
      </div>
    );
  }

  if (!org?.isVerified) {
    return <AwaitingCard />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-lg">Active campaigns</h3>
        {/* @ts-ignore */}
        {campaigns?.length > 0 && (
          <Link
            href={"/organization/campaign/create"}
            className="bg-black px-3 py-2 text-white rounded-md"
          >
            Add New
          </Link>
        )}
      </div>

      {isLoading && <Spinner />}

      {/* @ts-ignore */}
      {campaigns?.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* @ts-ignore */}
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
