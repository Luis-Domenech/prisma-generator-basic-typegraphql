import { DMMF } from "@prisma/generator-helper"
import { logger } from "../utils/logger"
import { AUTO_GENERATED_COMMENT } from "../constants"
import { FieldModifier, FieldOptional, InitializedConfig } from "../types"
import { addImport, getFromImport } from "../utils/addImport"
import { installPackage } from "../utils/installPackages"
import { genEnums } from "./genEnums"
import { genImports } from "./genImports"
import { genModels } from "./genModels"
import { genScalars } from "./genScalars"

export const genFileContent = async (dmmf: DMMF.Document, fieldModifiers: FieldModifier[], fieldsOptional: FieldOptional[], config: InitializedConfig): Promise<string> => {
  
  let imports: string[] = []
  addImport('ObjectType', 'type-graphql', imports)
  addImport('Field', 'type-graphql', imports)

  
  const enums = genEnums(dmmf.datamodel.enums, imports, config)

  const models = genModels(dmmf.datamodel.models, fieldModifiers, fieldsOptional, enums, config, imports)

  const scalars = genScalars(models)

  if (config.installDeps) {
    await Promise.all(imports.map(async i => {
      await installPackage(config.useYarn, getFromImport(i) , true)
    }))
  }

  return [
    AUTO_GENERATED_COMMENT,
    genImports(imports),
    scalars,
    enums,
    models,
  ].join('\n')
}