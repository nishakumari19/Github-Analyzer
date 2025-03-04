import axios from "axios";

export default async function handler(req, res) {
  const { owner, repo } = req.query;

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Repository not found" });
  }
}
