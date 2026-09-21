import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");

const flattenPayloadDirectory = async (parent, directory, prefix) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const source = path.join(directory, entry.name);
    const targetPrefix = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) {
      await flattenPayloadDirectory(parent, source, targetPrefix);
    } else if (entry.isFile()) {
      await fs.copyFile(source, path.join(parent, targetPrefix));
    }
  }
};

const walk = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const child = path.join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flattenPayloadDirectory(directory, child, entry.name);
    } else {
      await walk(child);
    }
  }
};

await walk(OUT);
