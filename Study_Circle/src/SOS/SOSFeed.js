import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getSOS } from "../api/sosAPI";
import SOSItem from "./SOSItem";
import SOSForm from "./SOSForm";

const socket = io("http://localhost:4000");

export default function SOSFeed() {
  const [sosList, setSOSList] = useState([]);

  useEffect(() => {
    getSOS().then(setSOSList);

    socket.on("sos:new", sos => {
      setSOSList(prev => [sos, ...prev]);
    });

    socket.on("sos:claimed", updated => {
      setSOSList(prev =>
        prev.map(s => (s._id === updated._id ? updated : s))
      );
    });

    socket.on("sos:message", updated => {
      setSOSList(prev =>
        prev.map(s => (s._id === updated._id ? updated : s))
      );
    });

    socket.on("sos:resolved", updated => {
      setSOSList(prev =>
        prev.map(s => (s._id === updated._id ? updated : s))
      );
    });
  }, []);

  return (
    <div className="p-4">
      <SOSForm />

      <h2 className="text-xl font-bold mt-4">SOS Feed</h2>

      {sosList.map(item => (
        <SOSItem key={item._id} sos={item} socket={socket} />
      ))}
    </div>
  );
}
