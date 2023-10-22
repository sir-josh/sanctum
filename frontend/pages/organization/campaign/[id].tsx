import axios from "axios";
import BigCampaignCard from "../../../components/organization/BigCampaignCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DonationHistory from "../../../components/organization/DonationHistory";
import { useNetwork } from "wagmi";

const ViewCampaign = () => {
  const router = useRouter();

  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-campaign?campaignId=${router?.query?.id}`
    );

    return data;
  };

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaign", router],
    queryFn: fetchCampaigns,
  });

  return (
    <div>
      <BigCampaignCard campaign={campaign} isLoadingC={isLoading} />

      <DonationHistory campaign={campaign} />
    </div>
  );
};
export default ViewCampaign;
