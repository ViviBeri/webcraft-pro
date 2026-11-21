import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const semverPattern = /^\d+\.\d+\.\d+$/;

function requireVersion(value, source) {
  if (typeof value !== "string" || !semverPattern.test(value)) {
    throw new Error(source + " must contain a plain semantic version (x.y.z); found " + String(value) + ".");
  }
  return value;
}

async function readJson(file) {
  return JSON.parse(await readFile(path.join(root, file), "utf8"));
}

async function fileExists(file) {
  try { await access(file); return true; }
  catch { return false; }
}

async function main() {
  const errors = [];
  const packageJson = await readJson("package.json");
  const packageVersion = requireVersion(packageJson.version, "package.json version");
  const lock = await readJson("package-lock.json");

  if (lock.version !== packageVersion) {
    errors.push("package-lock.json version is " + lock.version + "; package.json is " + packageVersion + ".");
  }

  const rootPackageVersion = lock.packages?.[""]?.version;
  if (rootPackageVersion !== packageVersion) {
    errors.push('package-lock.json packages[""].version is ' + rootPackageVersion + "; package.json is " + packageVersion + ".");
  }

  const readme = await readFile(path.join(root, "README.md"), "utf8");
  const readmeMatch = readme.match(/Latest release:\s*\[?v?(\d+\.\d+\.\d+)/i);

  if (!readmeMatch) {
    errors.push("README.md is missing a parseable 'Latest release: vX.Y.Z' reference.");
  } else if (readmeMatch[1] !== packageVersion) {
    errors.push("README.md latest release is " + readmeMatch[1] + "; package.json is " + packageVersion + ".");
  }

  const changelogPath = path.join(root, "CHANGELOG.md");
  if (await fileExists(changelogPath)) {
    const changelog = await readFile(changelogPath, "utf8");
    const heading = changelog.match(/^##\s+\[?v?(\d+\.\d+\.\d+)/m);
    if (heading && heading[1] !== packageVersion) {
      errors.push("CHANGELOG.md latest version heading is " + heading[1] + "; package.json is " + packageVersion + ".");
    }
  }

  const ref = process.env.GITHUB_REF ?? "";
  if (ref.startsWith("refs/tags/")) {
    const tagVersion = ref.slice("refs/tags/".length).replace(/^v/, "");
    if (!semverPattern.test(tagVersion)) {
      errors.push("Git tag '" + ref + "' is not a supported vX.Y.Z release tag.");
    } else if (tagVersion !== packageVersion) {
      errors.push("Git tag version is " + tagVersion + "; package.json is " + packageVersion + ".");
    }
  }

  if (errors.length > 0) {
    console.error("Version synchronization failed (package.json: " + packageVersion + ").");
    for (const error of errors) console.error("- " + error);
    process.exitCode = 1;
    return;
  }

  console.log("Version synchronization passed: package.json, package-lock.json, README.md" +
    (await fileExists(changelogPath) ? ", CHANGELOG.md" : "") + " agree on " + packageVersion + ".");
  if (ref.startsWith("refs/tags/")) console.log("Release tag agrees with package.json: " + ref + ".");
}

main().catch((error) => {
  console.error("Version synchronization could not complete: " + error.message);
  process.exitCode = 1;
});
