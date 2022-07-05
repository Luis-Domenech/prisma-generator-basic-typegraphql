import fs from 'fs'
import path from 'path'
import { GENERATOR_NAME } from '../constants'
import { spawnSync } from 'child_process'
import { logger } from './logger'

export const installPackage = async (useYarn: boolean, pkgName: string, dev: boolean = false): Promise<boolean> => {
  logger.info(`${GENERATOR_NAME}: Installing -> ${pkgName}`)
  const packageManager = useYarn ? dev ? 'yarn add --dev' : 'yarn add' : dev ? 'npm i -D' : 'npm i'

  const hasPackage = fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8').includes(`${pkgName}`)
  if (hasPackage) {
    logger.info(`${GENERATOR_NAME}: Already Installed`)
    return true
  }

  
  let child = spawnSync(`${packageManager} ${pkgName}`, [], {
    shell: true,
    stdio: 'inherit'
  })

  return true
}