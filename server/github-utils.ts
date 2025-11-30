import { Octokit } from "@octokit/rest";

let connectionSettings: any;

async function getAccessToken() {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error("X_REPLIT_TOKEN not found for repl/depl");
  }

  connectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=github",
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("GitHub not connected");
  }
  return accessToken;
}

export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export async function createAndPushRepository(repoName: string) {
  const octokit = await getUncachableGitHubClient();

  // Get authenticated user
  const user = await octokit.rest.users.getAuthenticated();
  const username = user.data.login;

  // Create repository
  console.log(`Creating repository: ${repoName}...`);
  const repo = await octokit.rest.repos.createForAuthenticatedUser({
    name: repoName,
    description: "Machine Learning Engineer Portfolio - Sangam Nirala",
    private: false,
    auto_init: false,
  });

  console.log(
    `Repository created: https://github.com/${username}/${repoName}`
  );
  return repo.data.clone_url;
}
