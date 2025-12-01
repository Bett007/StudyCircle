export default function SOSCard({ sos, onClaim }) {
  return (
    <div className="sos-card">
      <h3>{sos.student}</h3>
      <p><strong>Stuck on:</strong> {sos.task}</p>
      <p><strong>Needs:</strong> {sos.minutes} mins</p>

      {sos.claimed ? (
        <button className="claimed">Already Claimed</button>
      ) : (
        <button onClick={() => onClaim(sos.id)}>Claim</button>
      )}
    </div>
  );
}
