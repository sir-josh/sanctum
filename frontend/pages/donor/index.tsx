import { useAccount, useContractRead } from "wagmi";
import { Pending } from "../../components/icons";
import connect from "../../constants/connect";
import { ethers } from "ethers";

const people = [
  {
    name: "John Doe",
    title: "Front-end Developer",
    department: "Engineering",
    email: "john@devui.com",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "Jane Doe",
    title: "Back-end Developer",
    department: "Engineering",
    email: "jane@devui.com",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

const Dashboard = () => {
  const { address } = useAccount();

  const { data: usdcBal, isLoading: isLoadingBal } = useContractRead({
    address: connect.ausdc.address,
    abi: connect.ausdc.abi,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <h2>Hi {address},</h2>
        <div className="text-right font-semibold">3 STK</div>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="w-[200px] bg-black/90 text-white rounded-xl p-4 shadow flex gap-x-2 items-center">
          <div className=" w-8 h-8 flex items-center justify-center rounded-full">
            <Pending />
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
            <Pending />
          </div>
          <div>
            <b>5</b>
            <p className="text-[14px]">aUSDC Donated</p>
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
                Chain
              </th>
              <th scope="col" className="relative px-4 py-3.5">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {people.map((person) => (
              <tr key={person.name} className="">
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-sm text-gray-900 ">{person.title}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-4">100</td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                  {person.role}
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
