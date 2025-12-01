import { useSOS } from "../hooks/useSOS";
import SOSItem from "./SOSItem";

export default function SOSFeed() {
  const { sosList } = useSOS();

  return (
    <div className="feed">
      <h2>Active SOS Alerts</h2>

      {sosList.map((sos) => (
        <SOSItem key={sos.id} sos={sos} />
      ))}
    </div>
  );
}
