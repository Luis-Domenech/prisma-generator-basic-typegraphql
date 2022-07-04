import { DMMF } from '@prisma/generator-helper'
import { FieldModifier, InitializedConfig } from '../types'
import { genFields } from './genFields'

export const genModels = (models: DMMF.Model[], fieldModifiers: FieldModifier[], config: InitializedConfig, imports: string[]) => {
  return models.map((model) => {
    const modelName = model.name
    
    const fields = genFields(modelName, model.fields, fieldModifiers, config, imports)    

    return (
`@ObjectType()
export class ${modelName} {
${fields}
}
`
  )}).join("\n")
}
