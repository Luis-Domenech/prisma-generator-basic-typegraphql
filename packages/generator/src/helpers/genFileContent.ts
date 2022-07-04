import { DMMF } from "@prisma/generator-helper"
import { AUTO_GENERATED_COMMENT } from "../constants"
import { FieldModifier, InitializedConfig } from "../types"
import { addImport } from "../utils/addImport"
import { installPackage } from "../utils/installPackages"
import { genEnum } from "./genEnum"
import { genImports } from "./genImports"
import { genModels } from "./genModels"

export const genFileContent = async (dmmf: DMMF.Document, fieldModifiers: FieldModifier[], config: InitializedConfig): Promise<string> => {
  
  let imports: string[] = []
  addImport('ObjectType', 'type-graphql', imports)
  addImport('Field', 'type-graphql', imports)

  
  const enums = genEnum(dmmf.datamodel.enums, imports)

  const models = genModels(dmmf.datamodel.models, fieldModifiers, config, imports)

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