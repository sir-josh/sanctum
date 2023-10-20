import { Pending, Spinner } from "../../components/icons";
import Link from "next/link";
import { useContext } from "react";
import { OrgContext } from "../../contexts/OrgContext";
import {
  AwaitingCard,
  Dashboard,
  MintCard,
} from "../../components/organization";

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

const Index = () => {
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
              <p>You don't seem to have a verified organization yet</p>
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
