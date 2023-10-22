import { useContractRead, useNetwork } from "wagmi";
import connect from "../../constants/connect";
import { ethers } from "ethers";
import formatDate from "../../helpers/formatDate";
import Campaign from "../../types/campaign";
import Donation from "../../types/Donation";

const DonationHistory = ({ campaign }: { campaign: Campaign }) => {
  const { chain } = useNetwork();

  const { data: donors, isLoading: isLoadingBal } = useContractRead({
    //@ts-ignore
    address: connect?.sanctum?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.sanctum?.[chain?.id]?.abi,
    functionName: "getCampaignDonors",
    args: [campaign?.id],
    watch: true,
  });

  const sumDonations = (donations: Donation[]) => {
    const total = donations.reduce((acc, donation) => {
      return acc + BigInt(donation.amount);
      //@ts-ignore
    }, 0n);

    return parseFloat(
      //@ts-ignore
      ethers?.formatUnits(total, 6)
    ).toFixed(2);
  };

  console.log(donors);
  return (
    <div className="mt-5 max-w-2xl">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium">Recent Donations</p>
        <p className="font-medium">
          {" "}
          Raised: {donors && sumDonations(donors)} / {campaign?.target}
        </p>
      </div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 rounded-md overflow-hidden">
          <tr className="">
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-900"
            >
              <span>Donor</span>
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {donors?.map((donor, i: number) => (
            <tr key={i} className="">
              <td className="whitespace-nowrap px-4 py-4">
                <div className="text-sm text-gray-900 ">
                  {donor?.donor?.substring(0, 8)}
                </div>
              </td>
              <td className="whitespace-nowrap text-sm px-4 py-4">
                {parseFloat(
                  ethers?.formatUnits(donor?.amount || "0", 6)
                ).toFixed(2)}{" "}
                aUSDC
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                {formatDate(donor?.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DonationHistory;
