import Campaign from "./campaign";

export interface Donation {
  id: string;
  donor: string;
  campaignId: string;
  amount: string;
  createdAt: string;
  campaign: Campaign;
}

export default Donation;
