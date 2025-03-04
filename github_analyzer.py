import requests


def get_repo_details(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return {
            "name": data["name"],
            "description": data["description"],
            "stars": data["stargazers_count"],
            "forks": data["forks_count"],
            "language": data["language"]
        }
    else:
        return {"error": "Repository not found"}

# Example usage
if __name__ == "__main__":
    owner = input("Enter repository owner: ")
    repo = input("Enter repository name: ")
    
    result = get_repo_details(owner, repo)
    print(result)

