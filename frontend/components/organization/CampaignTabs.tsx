import axios from "axios";
import { useContext, useState } from "react";
import { OrgContext } from "../../contexts/OrgContext";
import { useQuery } from "@tanstack/react-query";
import CompletedTab from "./CompletedTab";
import ActiveTab from "./ActiveTab";
import Campaign from "../../types/campaign";

const CampaignTabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Active");

  const tabs = ["Active", "Completed"];
  //@ts-ignore
  const { org } = useContext(OrgContext);

  const getCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-org-campaigns?orgId=${org?.id}`
    );
    return data;
  };

  const { data: campaigns } = useQuery({
    queryKey: ["campaigns", org],
    queryFn: getCampaigns,
  });

  //filter campaigns by status
  const active: Campaign[] = campaigns?.filter(
    (d: Campaign) => d.isActive == true
  );
  const completed: Campaign[] = campaigns?.filter(
    (d: Campaign) => d.isActive == false
  );

  return (
    <div className="max-w-2xl mt-5 rounded-xl  p-4 shadow">
      <div className="border rounded-lg p-2 mb-4 flex gap-x-2">
        {tabs.map((d, i) => (
          <h3
            key={i}
            onClick={() => setSelectedTab(d)}
            className={`${
              selectedTab == d && "bg-black/80 text-white"
            } w-fit rounded-md leading-none p-2 cursor-pointer hover:text-white hover:bg-black/80 active:bg-gray-700  transition-colors`}
          >
            {d} Campaigns
          </h3>
        ))}
      </div>

      {/* Tabs */}
      {selectedTab == "Active" ? (
        <ActiveTab campaigns={active} />
      ) : selectedTab == "Completed" ? (
        <CompletedTab campaigns={completed} />
      ) : (
        <div> Loading.. </div>
      )}
    </div>
  );
};
export default CampaignTabs;
