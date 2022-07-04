import * as semVer from "semver"
import { PACKAGE_NAME } from "../constants"

// Assuming we are in node_modulea directory
const getInstalledPrismaVersion = (): string => {
  const prismaPackageJson = require("prisma/package.json")
  return prismaPackageJson.version
}

// Assuming we are in node_modulea directory
const getPrismaDependencyVersion = (): string =>  {
  const ownPackageJson = require("../../package.json")
  return ownPackageJson.devDependencies["prisma"]
}

export const ensureInstalledCorrectPrismaPackage = () => {
  const installedVersion = getInstalledPrismaVersion()
  const versionRequirement = getPrismaDependencyVersion()

  if (!semVer.satisfies(installedVersion, versionRequirement)) {
    throw new Error(
      `Looks like you use an incorrect version of the Prisma packages: "${installedVersion}". ` +
        `Please ensure that you have installed a version ` +
        `that meets '${PACKAGE_NAME}' requirement: "${versionRequirement}".`,
    );
  }
}