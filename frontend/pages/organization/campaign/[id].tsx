import axios from "axios";
import BigCampaignCard from "../../../components/organization/BigCampaignCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DonationHistory from "../../../components/organization/DonationHistory";

const ViewCampaign = () => {
  const router = useRouter();

  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-campaign?campaignId=${router?.query?.id}`
    );

    console.log(data);
    return data;
  };

  const { data: campaign } = useQuery({
    queryKey: ["campaign", router],
    queryFn: fetchCampaigns,
  });

  return (
    <div>
      <BigCampaignCard campaign={campaign} />

      <DonationHistory campaignId={campaign?.id} />
    </div>
  );
};
export default ViewCampaign;
