import axios from "axios";
import BigCampaignCard from "../../../components/organization/BigCampaignCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

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

const ViewCampaign = () => {
  const router = useRouter();

  const fetchCampaigns = async () => {
    const { data } = await axios.get(
      `/api/organization/get-campaign?campaignId=${router?.query?.id}`
    );

    console.log(data);
    return data;
  };

  const { data: campaign } = useQuery({
    queryKey: ["campaign", router],
    queryFn: fetchCampaigns,
  });

  return (
    <div>
      <BigCampaignCard campaign={campaign} />

      <div>
        <h3 className="mt-5 mb-1 font-medium">Recent Donations</h3>

        <table className="w-full max-w-2xl divide-y divide-gray-200">
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
export default ViewCampaign;
