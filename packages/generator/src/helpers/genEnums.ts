import { DMMF } from '@prisma/generator-helper'
import path from 'path'
import { AUTO_GENERATED_COMMENT, ENUM_DIR, ENUM_TYPE_SUFFIX, INDENT_SPACES } from '../constants'
import { FileInfo, InitializedConfig } from '../types'
import { addImport } from '../utils/addImport'
import { writeFileSafely } from '../utils/writeFileSafely'

// Generate an enum for every enum
export const genEnums = async (enums: DMMF.DatamodelEnum[], file_info_map: Map<string, FileInfo>, config: InitializedConfig) => {
  return await Promise.all(enums.map(async ({ name, values }, index) => {
    
    
    const enumValues = values.map(({ name }) => `${" ".repeat(INDENT_SPACES)}${name} = '${name}'`).join(',\n')

    const enumAsType: string = `export type ${name} = keyof typeof ${name}${ENUM_TYPE_SUFFIX}` 

    const enumAsConst: string = values.map(({ name }) => `${" ".repeat(INDENT_SPACES)}${name}: '${name}'`).join(',\n')
    const enumAsConstType = `export type ${name} = typeof ${name}[keyof typeof ${name}]`
    

    const enum_file_info = file_info_map.get(name)

    const imports: string[] = []

    if (enum_file_info) {
      for (const i of enum_file_info.imports) {
        if (i.includes('.ts')) {
          if (config.importAsESM) imports.push(i.replace('.ts', '.js'))
          else imports.push(i.replace('.ts', ''))
        }
        else imports.push(i)
      }
    }

    let content = ''

    if (config.enumAsConst) {
      content = [
        AUTO_GENERATED_COMMENT,
        imports.join('\n'),
        `export const ${name} = {`,
        enumAsConst,
        `} as const`,
        enumAsConstType,
        `registerEnumType(${name}, {`,
        `${" ".repeat(INDENT_SPACES)}name: '${name}'`,
        `})`
      ].join('\n')
    }
    else if (config.enumAsType) {
      content = [
        AUTO_GENERATED_COMMENT,
        imports.join('\n'),
        `export enum ${name}${ENUM_TYPE_SUFFIX} {`,
        enumValues,
        `}`,
        enumAsType,
        `registerEnumType(${name}, {`,
        `${" ".repeat(INDENT_SPACES)}name: '${name}'`,
        `})`
      ].join('\n')
    }
    else {
      content = [
        AUTO_GENERATED_COMMENT,
        imports.join('\n'),
        `export enum ${name} {`,
        enumValues,
        `registerEnumType(${name}, {`,
        `${" ".repeat(INDENT_SPACES)}name: '${name}'`,
        `})`
      ].join('\n')
    }

    // Save file
    if (enum_file_info) {
      await writeFileSafely(enum_file_info.path, content)
    }

    return content
  }))
}
