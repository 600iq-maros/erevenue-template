/**
 * setup-project.ts
 *
 * Run after deploying a new client site to Vercel.
 * Creates a project in klienti.webzatyzden.sk and sets the
 * webhook env vars on the Vercel project automatically.
 *
 * Usage:
 *   npx tsx scripts/setup-project.ts \
 *     --name "Client Name" \
 *     --domain "client.sk" \
 *     --vercel-project-id "prj_xxxx"
 *
 * Required env vars:
 *   KLIENTI_API_URL    - e.g. https://klienti.webzatyzden.sk
 *   KLIENTI_API_KEY    - admin API key for klienti dashboard
 *   VERCEL_TOKEN       - Vercel API token
 *   VERCEL_TEAM_ID     - Vercel team ID
 */

const KLIENTI_API_URL =
  process.env.KLIENTI_API_URL ?? "https://klienti.webzatyzden.sk";
const KLIENTI_API_KEY = process.env.KLIENTI_API_KEY;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

function parseArgs(args: string[]) {
  const parsed: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && i + 1 < args.length) {
      const key = args[i].slice(2);
      parsed[key] = args[++i];
    }
  }
  return parsed;
}

async function createProjectInKlienti(
  name: string,
  domain: string,
  vercelProjectId: string
): Promise<{ projectId: string; webhookSecret: string }> {
  const res = await fetch(`${KLIENTI_API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KLIENTI_API_KEY}`,
    },
    body: JSON.stringify({ name, domain, vercelProjectId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create project in klienti: ${res.status} ${text}`);
  }

  return res.json();
}

async function setVercelEnvVar(
  vercelProjectId: string,
  key: string,
  value: string
) {
  const url = new URL(
    `https://api.vercel.com/v10/projects/${vercelProjectId}/env`
  );
  if (VERCEL_TEAM_ID) url.searchParams.set("teamId", VERCEL_TEAM_ID);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
    body: JSON.stringify({
      key,
      value,
      type: "encrypted",
      target: ["production", "preview"],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to set env var ${key}: ${res.status} ${text}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const name = args["name"];
  const domain = args["domain"];
  const vercelProjectId = args["vercel-project-id"];

  if (!name || !domain || !vercelProjectId) {
    console.error(
      "Usage: npx tsx scripts/setup-project.ts --name 'Client' --domain 'client.sk' --vercel-project-id 'prj_xxxx'"
    );
    process.exit(1);
  }

  if (!KLIENTI_API_KEY) {
    console.error("Missing KLIENTI_API_KEY env var");
    process.exit(1);
  }
  if (!VERCEL_TOKEN) {
    console.error("Missing VERCEL_TOKEN env var");
    process.exit(1);
  }

  console.log(`Creating project "${name}" in klienti dashboard...`);
  const { projectId, webhookSecret } = await createProjectInKlienti(
    name,
    domain,
    vercelProjectId
  );
  console.log(`  Project created: ${projectId}`);

  console.log(`Setting env vars on Vercel project ${vercelProjectId}...`);
  await setVercelEnvVar(
    vercelProjectId,
    "WEBHOOK_URL",
    `${KLIENTI_API_URL}/api/webhook/lead`
  );
  await setVercelEnvVar(vercelProjectId, "WEBHOOK_SECRET", webhookSecret);
  await setVercelEnvVar(vercelProjectId, "PROJECT_ID", projectId);
  console.log(`  Env vars set: WEBHOOK_URL, WEBHOOK_SECRET, PROJECT_ID`);

  console.log(`\nDone! Project "${name}" is now connected.`);
  console.log(`  Dashboard: ${KLIENTI_API_URL}/projects/${projectId}`);
  console.log(`  Domain: ${domain}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
