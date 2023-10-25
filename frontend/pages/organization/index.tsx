import { Spinner } from "../../components/icons";
import Link from "next/link";
import { useContext } from "react";
import { OrgContext } from "../../contexts/OrgContext";
import { AwaitingCard, Dashboard } from "../../components/organization";

const Index = () => {
  //@ts-ignore
  const { org, isLoading } = useContext(OrgContext);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {org?.owner ? (
            <div>{org?.isApproved ? <Dashboard /> : <AwaitingCard />}</div>
          ) : (
            <div className="flex flex-col gap-y-3">
              <h3>Hi there, </h3>
              <p>You don&apos;t seem to have a verified organization yet</p>
              <Link
                href={"/organization/create"}
                className="px-3 py-2 bg-black text-white border-b-2 border rounded-md w-fit"
              >
                Create an account
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Index;
