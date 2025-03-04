import axios from "axios";

export default async function handler(req, res) {
  const { owner, repo } = req.query;

  try {
    const response = await axios.get(`https://github-analyzer.onrender.com/analyze?owner=${owner}&repo=${repo}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Repository not found" });
  }
}
