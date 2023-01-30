import { DMMF } from '@prisma/generator-helper'
import { ENUM_TYPE_SUFFIX, INDENT_SPACES, PARTIAL_MODEL_PREFIX, PRISMA_TYPES } from '../constants'
import { FieldModifier, FieldOptional, FileInfo, InitializedConfig } from '../types'
import { addImport } from '../utils/addImport'
import { isAnEnum } from '../utils/isEnum'
import { logger } from '../utils/logger'
import { getGraphQLType, getTypescriptType, isRelational } from './getType'

export const genFields = (model: DMMF.Model, fields: DMMF.Field[], fieldModifiers: FieldModifier[], fieldsOptional: FieldOptional[], enums: string[], file_info_map: Map<string, FileInfo>, config: InitializedConfig, prefix?: string, suffix?: string) => {
  
  // let toImport: {fromImport: string, newImport: string}[] = []

  let fieldsString = fields.map(field => {
    let fieldModifier: FieldModifier | undefined = fieldModifiers.find((e: FieldModifier) => e.fieldName === field.name && e.modelName === model.name)
    let fieldOptional: FieldOptional | undefined = fieldsOptional.find((e: FieldOptional) => e.fieldName === field.name && e.modelName === model.name)
    
    let isOptional = fieldOptional ? fieldOptional.optional : false

    if (!fieldModifier) fieldModifier = {fieldName: field.name, modelName: model.name, hide: false, nullable: false}

    const hideRelations = config.hideRelations
    const optionalRelations = config.optionalRelations
    const isScalar = PRISMA_TYPES.indexOf(field.type) !== -1
    const isRelation = isRelational(field, enums, config)
    const isEnum = isAnEnum(field, enums, config)
    const isPartial = prefix === PARTIAL_MODEL_PREFIX


    let fieldName = field.name
    
    if (!isPartial) fieldName += isOptional ? '?' : (isRelation ? optionalRelations ? '?' : '!' : '!')
    else fieldName += '?'

    // TS Type
    let fieldType = getTypescriptType(model.name, field, file_info_map, config, isEnum, isPartial)

    const fieldGraphQLTypeEnumExtension = config.enumAsType && isEnum ? ENUM_TYPE_SUFFIX : ''
    if (field.isList) fieldType += '[]'

    if (!isPartial) {
      if (fieldName.includes("?") && config.addNull) fieldType += ' | null'
      if (fieldName.includes("?") && config.addUndefined) fieldType += ' | undefined'  
    }
    else {
      if (config.addNull) fieldType += ' | null'
    }
    
    // GraphQL Type
    let fieldGraphQLType = getGraphQLType(model.name, field, file_info_map, config, isEnum, isPartial, '', fieldGraphQLTypeEnumExtension)
    
    if (field.isList) fieldGraphQLType = `[${fieldGraphQLType}]`
    
    const nullable = isPartial ? true : fieldName.includes("?") ? true : (fieldModifier.nullable ? true : false)

    const decorator = `${" ".repeat(INDENT_SPACES)}@Field(() => ${fieldGraphQLType}, { nullable: ${nullable} })\n`

    const decoratorText = isRelation ? 
                        ( hideRelations ? fieldModifier.override ? decorator : '' : fieldModifier.hide ? '' : decorator) : 
                        fieldModifier.hide ? '' : decorator

    const fieldText = `${" ".repeat(INDENT_SPACES)}${fieldName}: ${fieldType}`
    
    return (`${decoratorText}${fieldText}\n`)
  }).join("\n")

  // Now we update our imports and install packages if needed
  // toImport.map(i => addImport(i.newImport, i.fromImport, imports))

  return fieldsString
}
