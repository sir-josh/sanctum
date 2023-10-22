import Campaign from "./campaign";

export interface Org {
  id: string;
  owner: string;
  name: string;
  description: string;
  isVerified: boolean;
  isApproved: boolean;
  campaign_list: Campaign[];
  createdAt: string;
}

export default Org;
