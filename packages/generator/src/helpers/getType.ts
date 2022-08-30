import { DMMF } from "@prisma/generator-helper"
import { ENUM_TYPE_SUFFIX, PRISMA_TYPES } from "../constants"
import { InitializedConfig } from "../types";
import { isAnEnum } from "../utils/isEnum";

export const getTypescriptType = (field: DMMF.Field, toImport: {fromImport: string, newImport: string}[], prefix?: string, suffix?: string): string => {
  if (PRISMA_TYPES.includes(field.type)) {
    let temp;
    switch (field.type) {
      case 'String': return 'string'
      case 'Boolean': return 'boolean'
      case 'Int': return 'number'
      case 'BigInt': 
        temp = toImport.find(i => i.newImport === 'GraphQLScalarType') 
        if (!temp) toImport.push({newImport: 'GraphQLScalarType', fromImport: 'graphql'})
        temp = toImport.find(i => i.newImport === 'Kind') 
        if (!temp) toImport.push({newImport: 'Kind', fromImport: 'graphql'})

        return 'bigint'
      case 'Decimal':
        temp = toImport.find(i => i.newImport === 'Prisma') 
        if (!temp) toImport.push({newImport: 'Prisma', fromImport: '@prisma/client'})
        temp = toImport.find(i => i.newImport === 'GraphQLScalarType') 
        if (!temp) toImport.push({newImport: 'GraphQLScalarType', fromImport: 'graphql'})
        temp = toImport.find(i => i.newImport === 'Kind') 
        if (!temp) toImport.push({newImport: 'Kind', fromImport: 'graphql'})
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

  return `${prefix || ''}${field.type}${suffix || ''}`
}

export const isRelational = (field: DMMF.Field, enums: string, config: InitializedConfig): boolean => {
  let typeIsEnum = isAnEnum(field, enums, config)

  return PRISMA_TYPES.indexOf(field.type) === -1 && !typeIsEnum
}

export const getGraphQLType = (field: DMMF.Field, toImport: {fromImport: string, newImport: string}[], prefix?: string, suffix?: string): string => {
  // TODO: Update these to what lfd-graphql-client has
  if (field.isId && field.type !== 'Int') {
    let find = toImport.find(i => i.newImport === 'ID') 
    if (!find) toImport.push({newImport: 'ID', fromImport: 'type-graphql'})
    return 'ID'
  }
  else if (field.type === 'Int') { 
    let find = toImport.find(i => i.newImport === 'Int') 
    if (!find) toImport.push({newImport: 'Int', fromImport: 'type-graphql'})
    return 'Int' 
  }
  else if (field.type === 'Float') { 
    let find = toImport.find(i => i.newImport === 'Float') 
    if (!find) toImport.push({newImport: 'Float', fromImport: 'type-graphql'})
    return 'Float'
  }
  else if (field.type === 'Decimal') {
    return 'DecimalScalar'
  }
  else if (field.type === 'BigInt') {
    // let find = toImport.find(i => i.newImport === 'GraphQLBigInt') 
    // if (!find) toImport.push({newImport: 'GraphQLBigInt', fromImport: 'graphql-scalars'})
    // return 'GraphQLBigInt'
    return 'BigIntScalar'
  }
  else if (field.type === 'Json') {
    let find = toImport.find(i => i.newImport === 'GraphQLJSONObject') 
    if (!find) toImport.push({newImport: 'GraphQLJSONObject', fromImport: 'graphql-scalars'})
    return 'GraphQLJSONObject'
  }
  else if (field.type === 'Bytes') {
    let find = toImport.find(i => i.newImport === 'GraphQLByte') 
    if (!find) toImport.push({newImport: 'GraphQLByte', fromImport: 'graphql-scalars'})
    return 'GraphQLByte'
  }
  else if (field.type === 'DateTime') return 'Date'
  else if (field.type === 'Boolean') return 'Boolean'
  else if (field.type === 'String') return 'String'
  else return `${prefix || ''}${field.type}${suffix || ''}`
}