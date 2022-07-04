import { DMMF } from '@prisma/generator-helper'
import { INDENT_SPACES } from '../constants'
import { addImport } from '../utils/addImport'

// Generate an enum for every enum
export const genEnum = (enums: DMMF.DatamodelEnum[], imports: string[]) => {
  return enums.map(({ name, values }, index) => {
    // If we have one enum, add import
    if (index === 0) {
      addImport('registerEnumType', 'type-graphql', imports)
    }

    const enumValues = values.map(({ name }) => `${" ".repeat(INDENT_SPACES)}${name} = '${name}'`).join(',\n')
    enumValues.slice(0, -3) //Remove last ,\n

    return (
`export enum ${name} {
${enumValues}
}

registerEnumType(${name}, {
${" ".repeat(INDENT_SPACES)}name: '${name}'
})
`
  )}).join("\n")
}
