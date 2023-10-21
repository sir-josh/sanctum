import Link from "next/link";
import { useState } from "react";
import { CampaignCard } from "../../components/organization";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/icons";

const ActiveCampaigns = () => {
  const [isActive, setIsActive] = useState(true);

  const fetchCampaigns = async () => {
    const { data } = await axios.get(`/api/donor/get-active-campaigns`);

    console.log(data);
    return data;
  };

  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  return (
    <section>
      <div>
        <h3 className="font-medium mb-4">Active campaigns</h3>

        {isActive ? (
          <div className="grid grid-cols-2 gap-x-8">
            {campaigns?.length > 0 ? (
              campaigns.map((campaign) => (
                <CampaignCard key={campaign?.id} campaign={campaign} donor />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        ) : (
          <p> No campaigns found</p>
        )}
      </div>
    </section>
  );
};
export default ActiveCampaigns;
