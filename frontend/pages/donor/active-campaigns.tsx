import { CampaignCard } from "../../components/organization";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/icons";

const ActiveCampaigns = () => {
  const fetchCampaigns = async () => {
    const { data } = await axios.get(`/api/donor/get-active-campaigns`);
    return data;
  };

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  return (
    <section>
      <div>
        <h3 className="font-medium mb-4">Active campaigns</h3>

        <div className="grid grid-cols-2 gap-8 ">
          {isLoading ? (
            <Spinner />
          ) : campaigns?.length > 0 ? (
            //@ts-ignore
            campaigns.map((campaign) => (
              <CampaignCard key={campaign?.id} campaign={campaign} donor />
            ))
          ) : (
            <p> No campaigns found</p>
          )}
        </div>
      </div>
    </section>
  );
};
export default ActiveCampaigns;
