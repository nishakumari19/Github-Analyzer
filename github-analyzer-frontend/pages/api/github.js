import axios from "axios";

export default async function handler(req, res) {
  const { owner, repo } = req.query;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(`${API_URL}/analyze?owner=${owner}&repo=${repo}`);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Repository not found" });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
}
}