import SOS from "../models/SOS.js";

export const getAllSOS = async (req, res) => {
  const sos = await SOS.find().sort({ createdAt: -1 });
  res.json(sos);
};

export const createSOS = async (req, res) => {
  const { text, user, tag } = req.body;
  const sos = await SOS.create({ text, user, tag });
  
  req.io.emit("sos:new", sos); // 🔥 real-time update

  res.status(201).json(sos);
};

export const claimSOS = async (req, res) => {
  const { helper } = req.body;

  const sos = await SOS.findByIdAndUpdate(
    req.params.id,
    { status: "claimed", claimedBy: helper },
    { new: true }
  );

  req.io.emit("sos:claimed", sos);

  res.json(sos);
};

export const sendMessage = async (req, res) => {
  const { user, text } = req.body;

  const sos = await SOS.findById(req.params.id);
  sos.messages.push({ user, text });
  await sos.save();

  req.io.emit("sos:message", sos);

  res.json(sos);
};

export const resolveSOS = async (req, res) => {
  const sos = await SOS.findByIdAndUpdate(
    req.params.id,
    { status: "resolved" },
    { new: true }
  );

  req.io.emit("sos:resolved", sos);

  res.json(sos);
};
