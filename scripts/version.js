import fs from "node:fs";

function getPackageVersion() {
  const data = fs.readFileSync("package.json", "utf8");
  const packageJson = JSON.parse(data);
  return packageJson.version;
}

function updateProjectConfigVersion(newVersion) {
  const data = fs.readFileSync("docs/.vitepress/project.config.ts", "utf8");
  const updatedData = data.replace(/(currentVersion:\s*string\s*=\s*)"[^"]*"/, `$1"${newVersion}"`);
  fs.writeFileSync("docs/.vitepress/project.config.ts", updatedData);
}

function updateVersionJson(newVersion) {
  fs.writeFileSync("docs/public/js/version.json", JSON.stringify({ version: newVersion }));
}

function updateVersion() {
  const version = getPackageVersion();
  updateProjectConfigVersion(version);
  updateVersionJson(version);
}

updateVersion();
