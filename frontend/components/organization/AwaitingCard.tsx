import { useContext } from "react";
import { OrgContext } from "../../contexts/OrgContext";

const AwaitingCard = () => {
  //@ts-ignore
  const { org } = useContext(OrgContext);

  return (
    <div className="">
      <h3 className="font-medium mb-4">Hi {org?.name},</h3>
      <p>We are currently reviewing your application.</p>

      <p>You can access your dashboard when your application is successful! </p>
    </div>
  );
};
export default AwaitingCard;
