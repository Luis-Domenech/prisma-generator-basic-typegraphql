import { DMMF } from '@prisma/generator-helper'
import { INDENT_SPACES } from '../constants'
import { FieldModifier, FieldOptional, InitializedConfig } from '../types'
import { addImport } from '../utils/addImport'
import { getGraphQLType, getTypescriptType, isRelational } from '../utils/getType'

export const genFields = (modelName: string, fields: DMMF.Field[], fieldModifiers: FieldModifier[], fieldsOptional: FieldOptional[], enums: string, config: InitializedConfig, imports: string[]) => {
  
  let toImport: {fromImport: string, newImport: string}[] = []

  let fieldsString = fields.map(field => {
    let fieldModifier: FieldModifier | undefined = fieldModifiers.find((e: FieldModifier) => e.fieldName === field.name && e.modelName === modelName)
    let fieldOptional: FieldOptional | undefined = fieldsOptional.find((e: FieldOptional) => e.fieldName === field.name && e.modelName === modelName)
    let isOptional = fieldOptional ? fieldOptional.optional : false

    if (!fieldModifier) fieldModifier = {fieldName: field.name, modelName: modelName, hide: false, nullable: false}

    const hideRelations = config.hideRelations
    const isRelation = isRelational(field, enums)


    let fieldName = field.name
    fieldName += isOptional ? '?' : '!'

    // TS Type
    let fieldType = getTypescriptType(field, toImport)
    if (field.isList) fieldType += '[]'

    // GraphQL Type
    let fieldGraphQLType = getGraphQLType(field, toImport)
    if (field.isList) fieldGraphQLType = `[${fieldGraphQLType}]`
    
    const nullable = field.isRequired ? (fieldModifier.nullable ? true : false) : true

    const decorator = `${" ".repeat(INDENT_SPACES)}@Field(() => ${fieldGraphQLType}, { nullable: ${nullable} })\n`

    const decoratorText = isRelation ? 
                        ( hideRelations ? fieldModifier.override ? decorator : '' : fieldModifier.hide ? '' : decorator) : 
                        fieldModifier.hide ? '' : decorator

    const fieldText = ` ${" ".repeat(INDENT_SPACES)}${fieldName}: ${fieldType}`
    

    return (`${decoratorText}${fieldText}`)
  }).join("\n")

  // Now we update our imports and install packages if needed
  toImport.map(i => addImport(i.newImport, i.fromImport, imports))

  return fieldsString
}
