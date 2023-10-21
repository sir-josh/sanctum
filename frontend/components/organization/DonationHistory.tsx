import { useContractRead } from "wagmi";
import connect from "../../constants/connect";
import { ethers } from "ethers";

const DonationHistory = ({ campaignId }) => {
  const { data: donors, isLoading: isLoadingBal } = useContractRead({
    address: connect.sanctum.address,
    abi: connect.sanctum.abi,
    functionName: "getCampaignDonors",
    args: [campaignId],
    watch: true,
  });

  console.log(donors);

  const sumDonations = (donations) => {
    const total = donations.reduce((acc, donation) => {
      return acc + BigInt(donation.amount);
    }, 0n);

    return parseFloat(
      //@ts-ignore
      ethers?.formatUnits(total, 6)
    ).toFixed(2);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium">Recent Donations</p>
        <p>Total Raised: {donors && sumDonations(donors)}</p>
      </div>
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
              Chain
            </th>
            <th scope="col" className="relative px-4 py-3.5">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {donors?.map((donor, i: number) => (
            <tr key={i} className="">
              <td className="whitespace-nowrap px-4 py-4">
                <div className="text-sm text-gray-900 ">{donor?.donor}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                {parseFloat(
                  ethers?.formatUnits(donor?.amount || "0", 6)
                ).toFixed(2)}{" "}
                aUSDC
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                12 Jan
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DonationHistory;
