import { DMMF } from '@prisma/generator-helper'
import { config } from 'process'
import { ENUM_TYPE_SUFFIX, INDENT_SPACES } from '../constants'
import { InitializedConfig } from '../types'
import { addImport } from '../utils/addImport'

// Generate an enum for every enum
export const genEnums = (enums: DMMF.DatamodelEnum[], imports: string[], config: InitializedConfig) => {
  return enums.map(({ name, values }, index) => {
    // If we have one enum, add import
    if (index === 0) {
      addImport('registerEnumType', 'type-graphql', imports)
    }

    const enumValues = values.map(({ name }) => `${" ".repeat(INDENT_SPACES)}${name} = '${name}'`).join(',\n')

    const enumAsType = `${" ".repeat(INDENT_SPACES)}export type ${name} = keyof typeof ${name}${ENUM_TYPE_SUFFIX}` 

    if (config.enumAsType) {
      return (
`export enum ${name}${ENUM_TYPE_SUFFIX} {
${enumValues}
}

${enumAsType}

registerEnumType(${name}${ENUM_TYPE_SUFFIX}, {
${" ".repeat(INDENT_SPACES)}name: '${name}'
})
`
      )
    }
    else {
      return (
`export enum ${name} {
${enumValues}
}

registerEnumType(${name}, {
${" ".repeat(INDENT_SPACES)}name: '${name}'
})
`
      )  
    }

  }).join("\n")
}
