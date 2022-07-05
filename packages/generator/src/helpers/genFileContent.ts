import { DMMF } from "@prisma/generator-helper"
import { AUTO_GENERATED_COMMENT } from "../constants"
import { FieldModifier, FieldOptional, InitializedConfig } from "../types"
import { addImport } from "../utils/addImport"
import { installPackage } from "../utils/installPackages"
import { genEnums } from "./genEnums"
import { genImports } from "./genImports"
import { genModels } from "./genModels"

export const genFileContent = async (dmmf: DMMF.Document, fieldModifiers: FieldModifier[], fieldsOptional: FieldOptional[], config: InitializedConfig): Promise<string> => {
  
  let imports: string[] = []
  addImport('ObjectType', 'type-graphql', imports)
  addImport('Field', 'type-graphql', imports)

  
  const enums = genEnums(dmmf.datamodel.enums, imports, config)

  const models = genModels(dmmf.datamodel.models, fieldModifiers, fieldsOptional, enums, config, imports)

  if (config.installDeps) {
    Promise.all(imports.map(async i => {
      const fromImport = i.match(/'(.*?)'/g)
      await installPackage(config.useYarn, fromImport![0], true)
    }))
  }

  return [
    AUTO_GENERATED_COMMENT,
    genImports(imports),
    enums,
    models,
  ].join('\n')
}