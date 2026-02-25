import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const IMAGES_ROOT = path.join(ROOT, "Images");
const PUBLIC_ROOT = path.join(ROOT, "public");
const OUTPUT_IMAGES_ROOT = path.join(PUBLIC_ROOT, "images");
const OUTPUT_LOGOS_ROOT = path.join(PUBLIC_ROOT, "logos");
const GENERATED_ROOT = path.join(ROOT, "src", "generated");
const MANIFEST_PATH = path.join(GENERATED_ROOT, "projects-manifest.json");

const CATEGORY_SOURCES = [
  {
    key: "komersial",
    label: "Komersial",
    sourceDir: "KOMERSIAL WEBP"
  },
  {
    key: "residential",
    label: "Residential",
    sourceDir: "RESIDENTAL WEBP"
  }
];

const SIZES = [600, 1200, 1920];
const LOGO_FILES = {
  wordmarkDark: "Logo Export-21.png",
  wordmarkLight: "Logo Export-24.png",
  markDark: "Logo Export-33.png",
  markAccent: "Logo Export-32.png"
};

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

const toPosix = (value) => value.split(path.sep).join("/");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const stripSizeSuffix = (fileName) =>
  fileName
    .replace(/_result_(600|1200|1920)\.webp$/i, "")
    .replace(/\.webp$/i, "");

const normalizeFileToken = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const sortByProjectOrder = (left, right) => {
  const leftOrder = left.order ?? Number.POSITIVE_INFINITY;
  const rightOrder = right.order ?? Number.POSITIVE_INFINITY;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return collator.compare(left.key, right.key);
};

const toTitle = (value) =>
  value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const readDirs = async (dir) => {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => collator.compare(a, b));
  } catch {
    return [];
  }
};

const readWebpFiles = async (dir) => {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".webp"))
      .map((entry) => entry.name)
      .sort((a, b) => collator.compare(a, b));
  } catch {
    return [];
  }
};

const extractOrder = (value) => {
  const bracketMatch = value.match(/\((\d+)\)/);
  if (bracketMatch) {
    return Number(bracketMatch[1]);
  }

  const trailingMatch = value.match(/(\d+)(?!.*\d)/);
  if (trailingMatch) {
    return Number(trailingMatch[1]);
  }

  return Number.POSITIVE_INFINITY;
};

const prepareLogos = async () => {
  const logoSourceRoot = path.join(IMAGES_ROOT, "logo png");
  await ensureDir(OUTPUT_LOGOS_ROOT);

  const manifestLogos = {};

  for (const [key, sourceFile] of Object.entries(LOGO_FILES)) {
    const sourcePath = path.join(logoSourceRoot, sourceFile);
    const targetFile = `${key}.png`;
    const targetPath = path.join(OUTPUT_LOGOS_ROOT, targetFile);
    await fs.copyFile(sourcePath, targetPath);
    manifestLogos[key] = `/logos/${targetFile}`;
  }

  return manifestLogos;
};

const createProjectDescription = (categoryKey, projectName) => {
  const title = toTitle(projectName);
  if (categoryKey === "komersial") {
    return `${title} is a commercial architecture project focused on clean structure, material precision, and spatial clarity.`;
  }

  return `${title} is a residential architecture project shaped by calm proportions, natural light, and refined details.`;
};

const prepareProjects = async () => {
  const projects = [];

  for (const category of CATEGORY_SOURCES) {
    const categoryRoot1200 = path.join(IMAGES_ROOT, category.sourceDir, "1200");
    const projectNames = await readDirs(categoryRoot1200);

    for (const projectName of projectNames) {
      const projectSlug = slugify(projectName);
      const projectOutputDir = path.join(OUTPUT_IMAGES_ROOT, category.key, projectSlug);
      await ensureDir(projectOutputDir);

      const groupMap = new Map();

      for (const size of SIZES) {
        const sourceDir = path.join(IMAGES_ROOT, category.sourceDir, String(size), projectName);
        const files = await readWebpFiles(sourceDir);

        for (const fileName of files) {
          const key = stripSizeSuffix(fileName);
          const current = groupMap.get(key) ?? {
            key,
            order: extractOrder(key),
            variants: {}
          };
          current.variants[size] = path.join(sourceDir, fileName);
          groupMap.set(key, current);
        }
      }

      const orderedGroups = [...groupMap.values()].sort(sortByProjectOrder);
      const images = [];

      for (let index = 0; index < orderedGroups.length; index += 1) {
        const group = orderedGroups[index];
        const imageKey = String(index + 1).padStart(2, "0");
        const token = normalizeFileToken(group.key);
        const copiedBySize = {};

        for (const size of SIZES) {
          const sourcePath = group.variants[size];
          if (!sourcePath) {
            continue;
          }
          const targetFile = `${imageKey}-${token}-${size}.webp`;
          const targetPath = path.join(projectOutputDir, targetFile);
          await fs.copyFile(sourcePath, targetPath);
          copiedBySize[size] = toPosix(path.join("/images", category.key, projectSlug, targetFile));
        }

        const w600 = copiedBySize[600] ?? copiedBySize[1200] ?? copiedBySize[1920];
        const w1200 = copiedBySize[1200] ?? copiedBySize[1920] ?? copiedBySize[600];
        const w1920 = copiedBySize[1920] ?? copiedBySize[1200] ?? copiedBySize[600];

        if (!w600 || !w1200 || !w1920) {
          continue;
        }

        images.push({
          id: imageKey,
          alt: `${toTitle(projectName)} architectural image ${index + 1}`,
          sources: {
            w600,
            w1200,
            w1920
          }
        });
      }

      if (images.length === 0) {
        continue;
      }

      projects.push({
        category: category.key,
        categoryLabel: category.label,
        name: projectName,
        slug: projectSlug,
        description: createProjectDescription(category.key, projectName),
        cover: images[0],
        images
      });
    }
  }

  projects.sort((left, right) => {
    if (left.category !== right.category) {
      return collator.compare(left.category, right.category);
    }
    return collator.compare(left.name, right.name);
  });

  return projects;
};

const main = async () => {
  await fs.rm(OUTPUT_IMAGES_ROOT, { recursive: true, force: true });
  await fs.rm(OUTPUT_LOGOS_ROOT, { recursive: true, force: true });
  await ensureDir(OUTPUT_IMAGES_ROOT);
  await ensureDir(OUTPUT_LOGOS_ROOT);
  await ensureDir(GENERATED_ROOT);

  const [logos, projects] = await Promise.all([prepareLogos(), prepareProjects()]);

  const manifest = {
    generatedAt: new Date().toISOString(),
    logos,
    projects
  };

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(`Prepared ${projects.length} projects and copied responsive assets.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
