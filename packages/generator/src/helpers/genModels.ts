import { DMMF } from '@prisma/generator-helper'
import { FieldModifier, FieldOptional, InitializedConfig } from '../types'
import { genFields } from './genFields'

export const genModels = (models: DMMF.Model[], fieldModifiers: FieldModifier[], fieldOptionals: FieldOptional[], enums: string, config: InitializedConfig, imports: string[]) => {
  return models.map((model) => {
      const fields = genFields(model, model.fields, fieldModifiers, fieldOptionals, enums, config, imports)    

    return (
`@ObjectType()
export class ${model.name} {
${fields}
}
`
  )}).join("\n")
}
