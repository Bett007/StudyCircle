import React, { useState } from "react";
import { claimSOS, sendMessage, resolveSOS } from "../api/sosAPI";

export default function SOSItem({ sos }) {
  const [reply, setReply] = useState("");

  const isPending = sos.status === "pending";
  const isClaimed = sos.status === "claimed";
  const isResolved = sos.status === "resolved";

  return (
    <div
      className={`border p-3 my-3 rounded ${
        isPending
          ? "border-red-400 bg-red-50"
          : isResolved
          ? "border-green-400 bg-green-50"
          : "border-yellow-400 bg-yellow-50"
      }`}
    >
      <p className="font-medium">{sos.text}</p>
      <p className="text-sm text-gray-500">from {sos.user}</p>

      {isPending && (
        <button
          className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
          onClick={() => claimSOS(sos._id, "Miguel")}
        >
          Claim to Help
        </button>
      )}

      {isClaimed && (
        <p className="text-blue-600 font-semibold mt-2">
          Helping: {sos.claimedBy}
        </p>
      )}

      {/* Messages */}
      {sos.messages?.map((m, i) => (
        <div key={i} className="pl-4 text-sm mt-1">
          <strong>{m.user}:</strong> {m.text}
        </div>
      ))}

      {/* Reply box */}
      {isClaimed && (
        <div className="flex mt-2">
          <input
            value={reply}
            onChange={e => setReply(e.target.value)}
            className="border flex-1 p-1"
            placeholder="Reply…"
          />
          <button
            className="bg-gray-800 text-white px-3"
            onClick={() => {
              sendMessage(sos._id, { user: "Miguel", text: reply });
              setReply("");
            }}
          >
            Send
          </button>
        </div>
      )}

      {/* Resolve button */}
      {isClaimed && (
        <button
          className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
          onClick={() => resolveSOS(sos._id)}
        >
          Mark Resolved
        </button>
      )}
    </div>
  );
}
