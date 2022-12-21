import { DMMF } from "@prisma/generator-helper"
import { ENUM_DIR, ENUM_TYPE_SUFFIX, MODELS_DIR, SCALARS_DIR } from "../constants"
import { FieldModifier, FieldOptional, FileInfo, InitializedConfig } from "../types"
import { addImport, getFromImport } from "../utils/addImport"
import { installPackage } from "../utils/installPackages"
import { genEnums } from "./genEnums"
import { genModels } from "./genModels"
import { genScalars } from "./genScalars"
import path from "path"

export const genFileContent = async (dmmf: DMMF.Document, fieldModifiers: FieldModifier[], fieldsOptional: FieldOptional[], config: InitializedConfig) => {
  
  // let imports: string[] = []
  // addImport('ObjectType', 'type-graphql', imports)
  // addImport('Field', 'type-graphql', imports)

  const file_info_map: Map<string, FileInfo> = new Map()

  dmmf.datamodel.enums.map(({ name, values }, index) => {
    const new_imports: string[] = []

    addImport('registerEnumType', 'type-graphql', new_imports)

    if (!file_info_map.get(name)) {
      file_info_map.set(name, {
        path: path.join(config.outputDir, `${ENUM_DIR}/${name}.ts`),
        imports: new_imports
      })
    }
    // Set file path for enums with suffix as same path
    // as regular enum name
    const enum_with_suffix = `${name}${ENUM_TYPE_SUFFIX}`
    if (!file_info_map.get(enum_with_suffix)) {
      file_info_map.set(enum_with_suffix, {
        path: path.join(config.outputDir, `${ENUM_DIR}/${name}.ts`),
        imports: new_imports
      })
    }
  })

  dmmf.datamodel.models.map(({ name, fields }, index) => {
    if (!file_info_map.get(name)) {
      const new_imports: string[] = []

      addImport('ObjectType', 'type-graphql', new_imports)
      addImport('Field', 'type-graphql', new_imports)

      file_info_map.set(name, {
        path: path.join(config.outputDir, `${MODELS_DIR}/${name}.ts`),
        imports: new_imports
      })
    }
  })

  // Add our custom scalars to map
  file_info_map.set('DecimalScalar', {
    path: path.join(config.outputDir, `${SCALARS_DIR}/DecimalScalar.ts`),
    imports: []
  })
  file_info_map.set('BigIntScalar', {
    path: path.join(config.outputDir, `${SCALARS_DIR}/BigIntScalar.ts`),
    imports: []
  })
  
  const enums = await genEnums(dmmf.datamodel.enums, file_info_map, config)

  const models = await genModels(dmmf.datamodel.models, fieldModifiers, fieldsOptional, enums, file_info_map, config)

  const scalars = await genScalars(models, file_info_map, config)

  if (config.installDeps) {
    const installed: string[] = []

    for (const [key, value] of file_info_map.entries()) {
      for (const i of value.imports) {
        // If first character is a dot or slash, we know that this is a relative import
        const from_import = getFromImport(i)
        if (from_import[0]) {
          if (from_import[0] !== '.' && from_import[0] !== '/') {
            if (!from_import.includes(':\\') && !from_import.includes(':/')) {
              if (installed.indexOf(from_import) === -1) {
                await installPackage(config.useYarn, from_import)
                installed.push(from_import)
              }
            }
          } 
        }
      }
    }
  }

  // return [
  //   AUTO_GENERATED_COMMENT,
  //   genImports(imports),
  //   scalars,
  //   enums,
  //   models,
  // ].filter(Boolean).join('\n')
}