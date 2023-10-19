import Link from "next/link";
import { useState } from "react";
import { Card } from "../../components/organization/CampaignCard";

const ActiveCampaigns = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <section>
      <div>
        <h3 className="font-medium mb-4">Active campaigns</h3>

        {isActive ? (
          <div className="grid grid-cols-3">
            <Card />
            <Card />
            <Card />
          </div>
        ) : (
          <p> No campaigns found</p>
        )}
      </div>
    </section>
  );
};
export default ActiveCampaigns;
