import { useContext } from "react";
import { OrgContext } from "../../contexts/OrgContext";
import { Pending, Raised, Verified } from "../icons";
import MintCard from "./MintCard";
import { useAccount, useContractRead } from "wagmi";
import connect from "../../constants/connect";
import { ethers } from "ethers";
import DonationHistory from "./DonationHistory";

const Dashboard = () => {
  const { org } = useContext(OrgContext);
  const { address } = useAccount();

  const { data: usdcBal, isLoading: isLoadingBal } = useContractRead({
    address: connect.ausdc.address,
    abi: connect.ausdc.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2 className="flex items-center gap-x-1">
          {org?.name} {org?.isVerified && <Verified />}{" "}
        </h2>
        <div className="text-right">3 STK</div>
      </div>

      {org?.isVerified ? (
        <div>
          <div className="flex items-center gap-x-4">
            <div className="bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
              <div className=" w-8 h-8 flex items-center justify-center rounded-full">
                <Raised />
              </div>
              <div>
                <b>
                  {parseFloat(
                    //@ts-ignore
                    ethers?.formatUnits(usdcBal || "0.1", 6)
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
                      ethers?.formatUnits(usdcBal || "0.1", 6)
                    ).toFixed(2)
                  }
                </b>
                <p className="text-[14px]">Total raised yet </p>
              </div>
            </div>

            <div className="bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
              <div className=" w-8 h-8 flex items-center justify-center rounded-full">
                <Pending />
              </div>
              <div>
                <b>5</b>
                <p className="text-[14px]"> Active campaigns</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MintCard />
      )}
    </div>
  );
};
export default Dashboard;
