import { GeneratorConfig } from "@prisma/generator-helper"
import { DEFAULT_FILE_NAME, DEFAULT_OUTPUT_DIR } from "../constants"
import { ExtendedConfig, InitializedConfig } from "../types"

export const convertConfig = (generator_config: GeneratorConfig): InitializedConfig => {
  const config = generator_config.config as ExtendedConfig

  return {
    useYarn: config.useYarn == 'true',
    hideRelations: config.hideRelations == 'true',
    strictModifiers: config.strictModifiers == 'true',
    wipeOutput: config.wipeOutput == 'true',
    outputDir: generator_config.output ? 
                (generator_config.output.value ? generator_config.output.value : (config.outputDir ? config.outputDir : DEFAULT_OUTPUT_DIR)) : 
                (config.outputDir ? config.outputDir : DEFAULT_OUTPUT_DIR),
    skipVerCheck: config.skipVerCheck == 'true',
    installDeps: config.installDeps == 'true',
    enumAsType: config.enumAsType == 'true',
    enumAsConst: config.enumAsConst == 'true',
    addNull: config.addNull == 'true',
    addUndefined: config.addUndefined == 'true',
    optionalRelations: config.optionalRelations == 'true' ? true : (config.optionalRelations == 'false' ? false : false),
    addTypenameField: config.addTypenameField == 'true',
    importAsESM: config.importAsESM == 'true',
    partialRelations: config.partialRelations == 'true',
    typeGraphqlV2: config.typeGraphqlV2 == 'true'
  }
}