import { DMMF } from '@prisma/generator-helper'
import { INDENT_SPACES } from '../constants'
import { FieldModifier, FieldOptional, InitializedConfig } from '../types'
import { genFields } from './genFields'

export const genModels = (models: DMMF.Model[], fieldModifiers: FieldModifier[], fieldOptionals: FieldOptional[], enums: string, config: InitializedConfig, imports: string[]) => {
  return models.map((model) => {
    const fields = genFields(model, model.fields, fieldModifiers, fieldOptionals, enums, config, imports)    

    let typename_field = config.addTypenameField ? `${" ".repeat(INDENT_SPACES)}__typename?: "${model.name}"\n` : ''

    // if (config.addNull) typename_field += ' | null'
    // if (config.addUndefined) typename_field += ' | undefined'

    return (
      [
        `@ObjectType("${model.name}", { isAbstract: true })`,
        `export class ${model.name} {`,
        typename_field,
        fields,
        `}`
      ].filter(Boolean).join("\n")
    )
  }).join("\n")
}
