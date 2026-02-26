import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const IMAGES_ROOT = path.join(ROOT, "Images");
const PUBLIC_ROOT = path.join(ROOT, "public");
const OUTPUT_IMAGES_ROOT = path.join(PUBLIC_ROOT, "images");
const OUTPUT_LOGOS_ROOT = path.join(PUBLIC_ROOT, "logos");
const OUTPUT_FAVICON_PATH = path.join(PUBLIC_ROOT, "favicon.png");
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
  navDefault: "bgwhitenew.png",
  navInnerDefault: "Logo Export-27.png",
  navHover: "Logo Export-26.png",
  homeLogoA: "Logo Export-28.png",
  homeLogoB: "Logo Export-29.png",
  homeLogoC: "Logo Export-30.png"
};
const FAVICON_FILE = "Logo Export-35.png";

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const TARGET_LANDSCAPE_RATIO = 16 / 10;

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

  const faviconSourcePath = path.join(logoSourceRoot, FAVICON_FILE);
  await fs.copyFile(faviconSourcePath, OUTPUT_FAVICON_PATH);

  return manifestLogos;
};

const createProjectDescription = (categoryKey, projectName) => {
  const title = toTitle(projectName);
  if (categoryKey === "komersial") {
    return `${title} is a commercial architecture project focused on clean structure, material precision, and spatial clarity.`;
  }

  return `${title} is a residential architecture project shaped by calm proportions, natural light, and refined details.`;
};

const parseWebpDimensions = (buffer) => {
  if (
    buffer.length < 12 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }

  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    const chunkEnd = dataOffset + chunkSize;

    if (chunkEnd > buffer.length) {
      return null;
    }

    if (chunkType === "VP8X" && chunkSize >= 10) {
      const width = 1 + buffer.readUIntLE(dataOffset + 4, 3);
      const height = 1 + buffer.readUIntLE(dataOffset + 7, 3);
      return { width, height };
    }

    if (chunkType === "VP8 " && chunkSize >= 10) {
      const startCodeMatches =
        buffer[dataOffset + 3] === 0x9d &&
        buffer[dataOffset + 4] === 0x01 &&
        buffer[dataOffset + 5] === 0x2a;

      if (startCodeMatches) {
        const width = buffer.readUInt16LE(dataOffset + 6) & 0x3fff;
        const height = buffer.readUInt16LE(dataOffset + 8) & 0x3fff;
        return { width, height };
      }
    }

    if (chunkType === "VP8L" && chunkSize >= 5 && buffer[dataOffset] === 0x2f) {
      const byte1 = buffer[dataOffset + 1];
      const byte2 = buffer[dataOffset + 2];
      const byte3 = buffer[dataOffset + 3];
      const byte4 = buffer[dataOffset + 4];
      const width = 1 + (((byte2 & 0x3f) << 8) | byte1);
      const height = 1 + (((byte4 & 0x0f) << 10) | (byte3 << 2) | ((byte2 & 0xc0) >> 6));
      return { width, height };
    }

    offset = chunkEnd + (chunkSize % 2);
  }

  return null;
};

const readWebpDimensions = async (filePath) => {
  try {
    const buffer = await fs.readFile(filePath);
    return parseWebpDimensions(buffer);
  } catch {
    return null;
  }
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
      const coverCandidates = [];
      const fallbackCoverCandidates = [];

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

        const image = {
          id: imageKey,
          alt: `${toTitle(projectName)} architectural image ${index + 1}`,
          orientation: "landscape",
          sources: {
            w600,
            w1200,
            w1920
          }
        };

        images.push(image);

        const dimensionSource = group.variants[1200] ?? group.variants[1920] ?? group.variants[600];
        const dimensions = dimensionSource ? await readWebpDimensions(dimensionSource) : null;

        if (dimensions?.width && dimensions?.height) {
          image.orientation = dimensions.height > dimensions.width ? "portrait" : "landscape";
          const ratio = dimensions.width / dimensions.height;
          fallbackCoverCandidates.push({
            image,
            ratio,
            index: images.length - 1
          });

          if (ratio >= 1) {
            coverCandidates.push({
              image,
              ratio,
              index: images.length - 1
            });
          }
        }
      }

      if (images.length === 0) {
        continue;
      }

      coverCandidates.sort((left, right) => {
        const leftRatioDelta = Math.abs(left.ratio - TARGET_LANDSCAPE_RATIO);
        const rightRatioDelta = Math.abs(right.ratio - TARGET_LANDSCAPE_RATIO);

        if (leftRatioDelta !== rightRatioDelta) {
          return leftRatioDelta - rightRatioDelta;
        }

        return left.index - right.index;
      });

      fallbackCoverCandidates.sort((left, right) => {
        if (left.ratio !== right.ratio) {
          return right.ratio - left.ratio;
        }

        return left.index - right.index;
      });

      projects.push({
        category: category.key,
        categoryLabel: category.label,
        name: projectName,
        slug: projectSlug,
        description: createProjectDescription(category.key, projectName),
        cover: coverCandidates[0]?.image ?? fallbackCoverCandidates[0]?.image ?? images[0],
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
