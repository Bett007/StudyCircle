const API = "http://localhost:4000/api/sos";

export const getSOS = () => fetch(API).then(r => r.json());

export const createSOS = (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());

export const claimSOS = (id, helper) =>
  fetch(`${API}/${id}/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ helper })
  }).then(r => r.json());

export const sendMessage = (id, data) =>
  fetch(`${API}/${id}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());

export const resolveSOS = (id) =>
  fetch(`${API}/${id}/resolve`, {
    method: "POST"
  }).then(r => r.json());
