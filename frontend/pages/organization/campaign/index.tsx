import { useState } from "react";
import CampaignCard from "../../../components/organization/CampaignCard";
import Link from "next/link";

const Index = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div>
      <h3 className="font-medium mb-4">Active campaigns</h3>

      {isActive ? (
        <div className="space-y-9">
          <div className="mb-4">
            <Link
              href={"/organization/campaign/create"}
              className="bg-black px-3 py-2 text-white rounded-md"
            >
              Add New
            </Link>
          </div>

          <CampaignCard />
        </div>
      ) : (
        <p> No campaigns found</p>
      )}
    </div>
  );
};
export default Index;
