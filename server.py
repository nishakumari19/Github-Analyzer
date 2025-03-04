from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

GITHUB_API_URL = "https://api.github.com/repos"

@app.route("/analyze", methods=["GET"])
def analyze_repo():
    owner = request.args.get("owner")
    repo = request.args.get("repo")

    if not owner or not repo:
        return jsonify({"error": "Please provide both owner and repo parameters"}), 400

    url = f"{GITHUB_API_URL}/{owner}/{repo}"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Repository not found"}), 404

    data = response.json()
    result = {
        "name": data.get("name"),
        "description": data.get("description"),
        "stars": data.get("stargazers_count"),
        "forks": data.get("forks_count"),
        "language": data.get("language"),
    }
    return jsonify(result)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
