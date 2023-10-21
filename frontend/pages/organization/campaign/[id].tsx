import axios from "axios";
import BigCampaignCard from "../../../components/organization/BigCampaignCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DonationHistory from "../../../components/organization/DonationHistory";

const people = [
  {
    name: "John Doe",
    title: "Front-end Developer",
    department: "Engineering",
    email: "john@devui.com",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "Jane Doe",
    title: "Back-end Developer",
    department: "Engineering",
    email: "jane@devui.com",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

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
