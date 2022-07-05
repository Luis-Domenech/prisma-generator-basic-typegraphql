import { GeneratorConfig, generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import path from 'path'
import { DEFAULT_OUTPUT_DIR, GENERATOR_NAME } from './constants'
import { writeFileSafely } from './utils/writeFileSafely'
import { genFileContent } from './helpers/genFileContent'
import { logger } from './utils/logger'
import { convertConfig } from './utils/convertConfig'
import { getFieldModifiers } from './helpers/getModifiers'
import { removeDir } from './utils/removeDir'
import { ensureInstalledCorrectPrismaPackage } from './utils/prisma.version'
import { getFieldsOptional } from './helpers/getOptionalFields'

const { version } = require('../package.json')

generatorHandler({
  onManifest(config: GeneratorConfig) {
    logger.info(`${GENERATOR_NAME}: Registered`)

    return {
      version,
      defaultOutput: DEFAULT_OUTPUT_DIR,
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {

    logger.info(`${GENERATOR_NAME}: Running`)

    const config = convertConfig(options.generator as GeneratorConfig)

    if (config.wipeOutput) await removeDir(config.outputDir, true)
    if (!config.skipVerCheck) ensureInstalledCorrectPrismaPackage()

    const fieldModifiers = getFieldModifiers(options.datamodel, config)
    const fieldsOptional = getFieldsOptional(options.datamodel)
    const content = await genFileContent(options.dmmf, fieldModifiers, fieldsOptional, config)
    
    logger.info(`${GENERATOR_NAME}: Saving File`)

    await writeFileSafely(config.outputDir, config.outputName, content)

    logger.info(`${GENERATOR_NAME}: File Saved -> ${path.join(config.outputDir, config.outputName)}`)

    logger.info(`${GENERATOR_NAME}: Done`)

    process.exit(0)
  }
})
