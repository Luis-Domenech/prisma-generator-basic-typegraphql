import { DMMF } from "@prisma/generator-helper"
import path from "path";
import { ENUM_TYPE_SUFFIX, MODELS_DIR, PRISMA_TYPES, REGEX } from "../constants"
import { FileInfo, InitializedConfig } from "../types";
import { addImport } from "../utils/addImport";
import { isAnEnum } from "../utils/isEnum";
import { genRelativeImport } from "./genImports";

export const getTypescriptType = (model_name: string, field: DMMF.Field, file_info_map: Map<string, FileInfo>, config: InitializedConfig, prefix?: string, suffix?: string): string => {
  const file_info = file_info_map.get(model_name)

  if (PRISMA_TYPES.includes(field.type)) {
    switch (field.type) {
      case 'String': return 'string'
      case 'Boolean': return 'boolean'
      case 'Int': return 'number'
      case 'BigInt': 
        // temp = toImport.find(i => i.newImport === 'GraphQLScalarType') 
        // if (!temp) toImport.push({newImport: 'GraphQLScalarType', fromImport: 'graphql'})
        // temp = toImport.find(i => i.newImport === 'Kind') 
        // if (!temp) toImport.push({newImport: 'Kind', fromImport: 'graphql'})
    
        return 'bigint'
      case 'Decimal':
        // temp = toImport.find(i => i.newImport === 'Prisma') 
        // if (!temp) toImport.push({newImport: 'Prisma', fromImport: '@prisma/client'})
        // temp = toImport.find(i => i.newImport === 'GraphQLScalarType') 
        // if (!temp) toImport.push({newImport: 'GraphQLScalarType', fromImport: 'graphql'})
        // temp = toImport.find(i => i.newImport === 'Kind') 
        // if (!temp) toImport.push({newImport: 'Kind', fromImport: 'graphql'})
        if (file_info) {
          addImport('Prisma', '@prisma/client', file_info.imports)
          file_info_map.set(model_name, {
            ...file_info,
          })
        }
        else {
          let new_imports: string[] = []
          addImport('Prisma', '@prisma/client', new_imports)
          file_info_map.set(model_name, {
            path: path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`),
            imports: new_imports
          })
        }
        return 'Prisma.Decimal'
      case 'Float': return 'number'
      case 'DateTime': return 'Date'
      case 'Json':
        // temp = toImport.find(i => i.newImport === 'Prisma') 
        // if (!temp) toImport.push({newImport: 'Prisma', fromImport: '@prisma/client'})
        return 'JSON'
      case 'Bytes': return 'Buffer'
    }
  }
  else {
    // Here means type of field is most likely a model
    const field_type = `${prefix || ''}${field.type}${suffix || ''}`
    const import_file_info = file_info_map.get(field_type)

    if (import_file_info) {
      if (file_info) {
        
        // addImport(field_type, import_file_info.path, file_info.imports, true)
        addImport(field_type, genRelativeImport(import_file_info.path, file_info.path), file_info.imports, true)
        
        file_info_map.set(model_name, {
          ...file_info,
        })
      }
      else {
        let new_imports: string[] = []
        const file_path = path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`)
        
        // addImport(field_type, import_file_info.path, new_imports, true)        
        addImport(field_type, genRelativeImport(import_file_info.path, file_path), new_imports, true)
        
        file_info_map.set(model_name, {
          path: file_path,
          imports: new_imports
        })
      }
    }
  }

  return `${prefix || ''}${field.type}${suffix || ''}`
}

export const isRelational = (field: DMMF.Field, enums: string[], config: InitializedConfig): boolean => {
  let typeIsEnum = isAnEnum(field, enums, config)

  return PRISMA_TYPES.indexOf(field.type) === -1 && !typeIsEnum
}

export const getGraphQLType = (model_name: string, field: DMMF.Field, file_info_map: Map<string, FileInfo>, config: InitializedConfig, prefix?: string, suffix?: string): string => {
  const file_info = file_info_map.get(model_name)

  // TODO: Update these to what lfd-graphql-client has
  if (field.isId && field.type !== 'Int') {
    if (file_info) {
      addImport('ID', 'type-graphql', file_info.imports)
      file_info_map.set(model_name, {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      addImport('ID', 'type-graphql', new_imports)
      file_info_map.set(model_name, {
        path: path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`),
        imports: new_imports
      })
    }

    return 'ID'
  }
  else if (field.type === 'Int') { 
    if (file_info) {
      addImport('Int', 'type-graphql', file_info.imports)
      file_info_map.set(model_name, {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      addImport('Int', 'type-graphql', new_imports)
      file_info_map.set(model_name, {
        path: path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`),
        imports: new_imports
      })
    }
    return 'Int' 
  }
  else if (field.type === 'Float') { 
    if (file_info) {
      addImport('Float', 'type-graphql', file_info.imports)
      file_info_map.set(model_name, {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      addImport('Float', 'type-graphql', new_imports)
      file_info_map.set(model_name, {
        path: path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`),
        imports: new_imports
      })
    }
    return 'Float'
  }
  else if (field.type === 'Decimal' || field.type === 'DecimalScalar' || field.type === 'Prisma.Decimal') {
    const import_file_info = file_info_map.get('DecimalScalar')

    if (import_file_info) {
      if (file_info) {
        
        // addImport('DecimalScalar', import_file_info.path, file_info.imports)
        addImport('DecimalScalar', genRelativeImport(import_file_info.path, file_info.path), file_info.imports)
        
        file_info_map.set(model_name, {
          ...file_info,
        })
      }
      else {
        let new_imports: string[] = []
        const file_path = path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`)
        
        // addImport('DecimalScalar', import_file_info.path, new_imports)
        addImport('DecimalScalar', genRelativeImport(import_file_info.path, file_path), new_imports)
        
        file_info_map.set(model_name, {
          path: file_path,
          imports: new_imports
        })
      }
    }

    return 'DecimalScalar'
  }
  else if (field.type === 'BigInt') {
    // let find = toImport.find(i => i.newImport === 'GraphQLBigInt') 
    // if (!find) toImport.push({newImport: 'GraphQLBigInt', fromImport: 'graphql-scalars'})
    // return 'GraphQLBigInt'
    const import_file_info = file_info_map.get('BigIntScalar')

    if (import_file_info) {
      if (file_info) {
        
        // addImport('BigIntScalar', import_file_info.path, file_info.imports)
        addImport('BigIntScalar', genRelativeImport(import_file_info.path, file_info.path), file_info.imports)
        
        file_info_map.set(model_name, {
          ...file_info,
        })
      }
      else {
        let new_imports: string[] = []
        const file_path = path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`) 
        
        // addImport('BigIntScalar', import_file_info.path, new_imports)
        addImport('BigIntScalar', genRelativeImport(import_file_info.path, file_path), new_imports)
        
        file_info_map.set(model_name, {
          path: file_path,
          imports: new_imports
        })
      }
    }
    return 'BigIntScalar'
  }
  else if (field.type === 'Json' || field.type === 'JSON') {
    if (file_info) {
      addImport('GraphQLJSONObject', 'graphql-scalars', file_info.imports)
      file_info_map.set(model_name, {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      addImport('GraphQLJSONObject', 'graphql-scalars', new_imports)
      file_info_map.set(model_name, {
        path: path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`),
        imports: new_imports
      })
    }
    return 'GraphQLJSONObject'
  }
  else if (field.type === 'Bytes') {
    if (file_info) {
      addImport('GraphQLByte', 'graphql-scalars', file_info.imports)
      file_info_map.set(model_name, {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      addImport('GraphQLByte', 'graphql-scalars', new_imports)
      file_info_map.set(model_name, {
        path: path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`),
        imports: new_imports
      })
    }
    return 'GraphQLByte'
  }
  else if (field.type === 'DateTime') return 'Date'
  else if (field.type === 'Boolean') return 'Boolean'
  else if (field.type === 'String') return 'String'
  else {
    // Here means type of field is most likely a model
    // IN order to avoid circular dependency issues,
    // we have to import model types, but renamed since
    // we are already exporting the model types but as 
    // `import type { ModelName } from './ModelName'
    const field_type = `${prefix || ''}${field.type}${suffix || ''}`
    const type_import = `${field_type} as ${field_type}Type`
    const type_name = `${field_type}Type`
    const import_file_info = file_info_map.get(field_type)

    if (import_file_info) {
      if (file_info) {
        
        // addImport(type_import, import_file_info.path, file_info.imports)
        addImport(type_import, genRelativeImport(import_file_info.path, file_info.path), file_info.imports)
        
        file_info_map.set(model_name, {
          ...file_info,
        })
      }
      else {
        let new_imports: string[] = []
        const file_path = path.join(config.outputDir, `${MODELS_DIR}/${model_name}.ts`)
        // addImport(type_import, import_file_info.path, new_imports)
        addImport(type_import, genRelativeImport(import_file_info.path, file_path), new_imports)
        
        file_info_map.set(model_name, {
          path: file_path,
          imports: new_imports
        })
      }
    }
    
    return type_name
  }
}