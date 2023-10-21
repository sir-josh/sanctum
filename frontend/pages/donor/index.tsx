import { useAccount, useContractRead, useNetwork } from "wagmi";
import { Donated, Pending, Raised } from "../../components/icons";
import connect from "../../constants/connect";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import formatDateDb from "../../helpers/formatDateDb";

const Dashboard = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: usdcBal, isLoading: isLoadingBal } = useContractRead({
    address: connect?.ausdc?.[chain?.id]?.address,
    abi: connect?.ausdc?.[chain?.id]?.abi,
    functionName: "balanceOf",
    args: [address],
  });

  const getDonations = async () => {
    const { data } = await axios.get(
      `/api/donor/get-total-donations?donor=${address}`
    );
    console.log(data);
    return data;
  };

  const { data: donations } = useQuery({
    queryKey: ["campaign", address],
    queryFn: getDonations,
  });

  const getTotal = (donations) => {
    return donations.reduce(
      (total, donation) => total + Number(donation?.amount),
      0
    );
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2>Hi {address.substring(0, 8)},</h2>
        <div className="text-right font-semibold">3 STK</div>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="w-[200px] bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
          <div className=" w-8 h-8 flex items-center justify-center rounded-full">
            <Raised />
          </div>
          <div>
            <b>
              {
                //@ts-ignore
                parseFloat(ethers?.formatUnits(usdcBal || "0", 6)).toFixed(2)
              }
            </b>
            <p className="text-[14px]">aUSDC Bal</p>
          </div>
        </div>

        <div className="w-[200px] bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
          <div className=" w-8 h-8 flex items-center justify-center rounded-full">
            <Donated />
          </div>
          <div>
            <b>{donations && getTotal(donations)} aUSDC</b>
            <p className="text-[14px]"> Donated so far</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mt-5 mb-1 font-medium">Recent Donations</h3>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 rounded-md overflow-hidden">
            <tr className="">
              <th
                scope="col"
                className="px-4 py-3.5 text-left text-sm font-normal text-gray-900"
              >
                <span>Address</span>
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-left text-sm font-normal text-gray-900"
              >
                Amount
              </th>

              <th
                scope="col"
                className="px-4 py-3.5 text-left text-sm font-normal text-gray-900"
              >
                Date
              </th>
              <th scope="col" className="relative px-4 py-3.5">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {donations?.map((donation) => (
              <tr key={donation?.id} className="">
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-sm text-gray-900 ">
                    {donation?.donor.substring(0, 8)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  {donation?.amount}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                  {formatDateDb(donation?.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;
