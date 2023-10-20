import axios from "axios";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/icons";
import { ApproveCard } from "../../components/organization";

const Approval = () => {
  const { address } = useAccount();

  const getPending = async () => {
    const { data } = await axios.get(`/api/organization/get-pending`);

    return data;
  };

  const { data: pendingOrgs, isLoading } = useQuery({
    queryKey: ["pending"],
    queryFn: getPending,
  });

  return (
    <div>
      <h3 className="font-medium mb-4">Pending Requests</h3>
      {isLoading && <Spinner />}

      <div>
        {pendingOrgs?.map((org, id) => (
          <ApproveCard key={id} org={org} />
        ))}
      </div>
    </div>
  );
};
export default Approval;
