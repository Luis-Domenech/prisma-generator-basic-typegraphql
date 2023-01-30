import { DMMF } from '@prisma/generator-helper'
import { AUTO_GENERATED_COMMENT, INDENT_SPACES, PARTIAL_MODEL_PREFIX } from '../constants'
import { FieldModifier, FieldOptional, FileInfo, InitializedConfig } from '../types'
import { writeFileSafely } from '../utils/writeFileSafely'
import { genFields } from './genFields'

export const genModels = async (models: DMMF.Model[], fieldModifiers: FieldModifier[], fieldOptionals: FieldOptional[], enums: string[], file_info_map: Map<string, FileInfo>, config: InitializedConfig): Promise<string[]> => {
  
  const regular_models = await Promise.all(models.map(async (model) => {
    
    const fields = genFields(model, model.fields, fieldModifiers, fieldOptionals, enums, file_info_map, config)

    let typename_field = config.addTypenameField ? `${" ".repeat(INDENT_SPACES)}__typename?: "${model.name}"\n` : ''

    // if (config.addNull) typename_field += ' | null'
    // if (config.addUndefined) typename_field += ' | undefined'
    const file_info = file_info_map.get(model.name)

    const imports: string[] = []

    if (file_info) {
      for (const i of file_info.imports) {
        if (i.includes('.ts')) {
          if (config.importAsESM) imports.push(i.replace('.ts', '.js'))
          else imports.push(i.replace('.ts', ''))
        }
        else imports.push(i)
      }
    }
    

    const content = [
      AUTO_GENERATED_COMMENT,
      imports.join('\n'),
      `@ObjectType("${model.name}", { isAbstract: true })`,
      `export class ${model.name} {`,
      typename_field,
      fields,
      `}`
    ].filter(Boolean).join("\n")
  
    // Save file
    if (file_info) {
      await writeFileSafely(file_info.path, content)
    }

    return content
  }))

  let partial_models: string[] = []

  if (config.partialRelations) {
    partial_models = await Promise.all(models.map(async (model) => {
      const partial_name = `${PARTIAL_MODEL_PREFIX}${model.name}`

      const fields = genFields(model, model.fields, fieldModifiers, fieldOptionals, enums, file_info_map, config, PARTIAL_MODEL_PREFIX)
  
      let typename_field = config.addTypenameField ? `${" ".repeat(INDENT_SPACES)}__typename?: "${partial_name}"\n` : ''
  
      // if (config.addNull) typename_field += ' | null'
      // if (config.addUndefined) typename_field += ' | undefined'
      const file_info = file_info_map.get(partial_name)
  
      const imports: string[] = []
  
      if (file_info) {
        for (const i of file_info.imports) {
          if (i.includes('.ts')) {
            if (config.importAsESM) imports.push(i.replace('.ts', '.js'))
            else imports.push(i.replace('.ts', ''))
          }
          else imports.push(i)
        }
      }

      
      
  
      const content = [
        AUTO_GENERATED_COMMENT,
        imports.join('\n'),
        `@ObjectType("${partial_name}", { isAbstract: true })`,
        `export class ${partial_name} {`,
        typename_field,
        fields,
        `}`
      ].filter(Boolean).join("\n")
    
      // Save file
      if (file_info) {
        await writeFileSafely(file_info.path, content)
      }
  
      return content
    }))
  }

  return [...regular_models, ...partial_models]
}
