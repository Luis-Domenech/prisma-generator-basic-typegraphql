import { DMMF } from "@prisma/generator-helper"
import { PRISMA_TYPES } from "../constants"

export const getTypescriptType = (field: DMMF.Field, toImport: {fromImport: string, newImport: string}[], prefix?: string, suffix?: string) => {
  if (PRISMA_TYPES.includes(field.type)) {
    switch (field.type) {
      case 'String': return 'string'
      case 'Boolean': return 'boolean'
      case 'Int': return 'number'
      case 'BigInt': return 'number'
      case 'Decimal': return 'number'
      case 'Float': return 'number'
      case 'DateTime': return 'Date'
      case 'Json':
        let find = toImport.find(i => i.newImport === 'Prisma.JsonValue') 
        if (!find) toImport.push({newImport: 'Prisma', fromImport: '@prisma/client'})
        return 'Prisma.JsonValue'
      case 'Bytes': return 'Buffer'
    }
  } 
  else {
    return `${prefix || ''}${field.type}${suffix || ''}`
  }
}

export const isRelational = (field: DMMF.Field): boolean => {
  return !PRISMA_TYPES.includes(field.type)
}

export const getGraphQLType = (field: DMMF.Field, toImport: {fromImport: string, newImport: string}[], prefix?: string, suffix?: string) => {

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
    let find = toImport.find(i => i.newImport === 'Float') 
    if (!find) toImport.push({newImport: 'Float', fromImport: 'type-graphql'})
    return 'Float' 
  }
  else if (field.type === 'BigInt') {
    let find = toImport.find(i => i.newImport === 'GraphQLBigInt') 
    if (!find) toImport.push({newImport: 'GraphQLBigInt', fromImport: 'graphql-scalars'})
    return 'GraphQLBigInt'
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