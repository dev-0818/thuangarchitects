import { spawn } from "node:child_process";
import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
const routes = ["/", "/portfolio/", "/portfolio/residential/lexington/", "/arsitek-medan/"];
const reportsDir = path.resolve("docs", "seo-geo", "lighthouse");
const serveEntry = path.resolve("node_modules", "serve", "build", "main.js");
const lighthouseEntry = path.resolve("node_modules", "lighthouse", "cli", "index.js");
const server = spawn(process.execPath, [serveEntry, "out", "-l", String(port), "--no-clipboard"], {
  stdio: "ignore"
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Static server did not start");
};

try {
  await mkdir(reportsDir, { recursive: true });
  await waitForServer();
  for (const route of routes) {
    const slug = route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
    const output = path.join(reportsDir, `${slug}.json`);
    await rm(output, { force: true });
    const lighthouse = spawn(
      process.execPath,
      [
        lighthouseEntry,
        `${baseUrl}${route}`,
        "--quiet",
        "--chrome-flags=--headless --no-sandbox",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--output=json",
        `--output-path=${output}`
      ],
      { stdio: "inherit", shell: false }
    );
    const exitCode = await new Promise((resolve) => lighthouse.on("exit", resolve));
    let report;
    try {
      report = JSON.parse(await readFile(output, "utf8"));
    } catch {
      throw new Error(`Lighthouse did not produce a valid report for ${route}`);
    }
    if (exitCode !== 0 && !report.categories) {
      throw new Error(`Lighthouse failed for ${route}`);
    }
    const scores = Object.fromEntries(
      Object.entries(report.categories).map(([key, category]) => [key, Math.round(category.score * 100)])
    );
    console.log(`${route} ${JSON.stringify(scores)}`);
  }
} finally {
  server.kill();
}
