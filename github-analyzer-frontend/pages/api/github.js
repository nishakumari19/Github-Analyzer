import axios from "axios";

export default async function handler(req, res) {
  const { repoOwner, repoName } = req.query;

  try {
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Repository not found" });
  }
}
