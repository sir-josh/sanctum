import { useContext } from "react";
import { OrgContext } from "../../contexts/OrgContext";
import { Pending, Raised, Verified } from "../icons";
import MintCard from "./MintCard";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import connect from "../../constants/connect";
import { ethers } from "ethers";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CampaignTabs from "./CampaignTabs";

const Dashboard = () => {
  //@ts-ignore
  const { org } = useContext(OrgContext);
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { data: usdcBal, isLoading: isLoadingBal } = useContractRead({
    //@ts-ignore
    address: connect?.ausdc?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.ausdc?.[chain?.id]?.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const { data: orgB } = useContractRead({
    //@ts-ignore
    address: connect?.sanctum?.[1442]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[1442]?.abi,
    functionName: "orgs",
    args: [org?.id],
    watch: true,
  });

  orgB && console.log(orgB);

  //getter for fetching campaigns
  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-org-campaigns-count?orgId=${org?.id}`
    );

    return data;
  };

  const { data: campaignCt, isSuccess } = useQuery({
    queryKey: ["scs", org],
    queryFn: fetchCampaigns,
  });

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2 className="flex items-center gap-x-1 font-medium text-lg">
          {org?.name} {org?.isVerified && <Verified />}{" "}
        </h2>
      </div>

      {org?.isVerified ? (
        <>
          <div>
            <div className="flex items-center justify-between max-w-2xl">
              <div className="bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
                <div className=" w-8 h-8 flex items-center justify-center rounded-full">
                  <Raised />
                </div>
                <div>
                  <b>
                    {parseFloat(
                      //@ts-ignore
                      ethers?.formatUnits(usdcBal || "0", 6)
                    ).toFixed(2)}
                  </b>
                  <p className="text-[14px]">aUSDC balance </p>
                </div>
              </div>

              <div className="bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
                <div className=" w-8 h-8 flex items-center justify-center rounded-full">
                  <Raised />
                </div>
                <div>
                  <b>
                    {
                      //@ts-ignore
                      parseFloat(
                        //@ts-ignore
                        ethers?.formatUnits(orgB?.[3] || "0", 6)
                      )?.toFixed(2)
                    }{" "}
                    aUSDC
                  </b>
                  <p className="text-[14px]">Total Settlement </p>
                </div>
              </div>

              <div className="bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
                <div className=" w-8 h-8 flex items-center justify-center rounded-full">
                  <Pending />
                </div>
                <div>
                  <b>{campaignCt}</b>
                  <p className="text-[14px]"> Active campaigns</p>
                </div>
              </div>
            </div>
          </div>

          <CampaignTabs />
        </>
      ) : (
        <MintCard />
      )}
    </div>
  );
};
export default Dashboard;
