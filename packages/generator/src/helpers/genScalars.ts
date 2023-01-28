import path from "path"
import { AUTO_GENERATED_COMMENT, INDENT_SPACES, SCALARS_DIR } from "../constants"
import { FileInfo, InitializedConfig } from "../types"
import { addImport } from "../utils/addImport"
import { writeFileSafely } from "../utils/writeFileSafely"

const indent = (index: number) => {
  return " ".repeat(2 + (index - 1) * INDENT_SPACES)
}

export const genScalars = async (models: string[], file_info_map: Map<string, FileInfo>, exports: string[], config: InitializedConfig): Promise<string[]> => {
  let ret: string[] = []

  if (models.join('').includes('DecimalScalar')) {
    const file_info = file_info_map.get('DecimalScalar')
    
    if (config.importAsESM) exports.push(`export * from './DecimalScalar.js'`)
    else exports.push(`export * from './DecimalScalar'`)

    if (file_info) {
      addImport('GraphQLScalarType', 'graphql', file_info.imports)
      addImport('Kind', 'graphql', file_info.imports)
      addImport('Prisma', '@prisma/client', file_info.imports, false, true)
      file_info_map.set('DecimalScalar', {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      
      addImport('GraphQLScalarType', 'graphql', new_imports)
      addImport('Kind', 'graphql', new_imports)
      addImport('Prisma', '@prisma/client', new_imports, false, true)
      file_info_map.set('DecimalScalar', {
        path: path.join(config.outputDir, `${SCALARS_DIR}/DecimalScalar.ts`),
        imports: new_imports
      })
    }

    const scalar_file_info = file_info_map.get('DecimalScalar')

    const imports: string[] = []

    if (scalar_file_info) {
      for (const i of scalar_file_info.imports) {
        if (i.includes('.ts')) {
          if (config.importAsESM) imports.push(i.replace('.ts', '.js'))
          else imports.push(i.replace('.ts', ''))
        }
        else imports.push(i)
      }
    }

    const content = [
      AUTO_GENERATED_COMMENT,
      imports.join('\n'),
      `export const DecimalScalar = new GraphQLScalarType({`,
      `${indent(1)}name: 'DecimalScalar',`,
      `${indent(1)}description: 'GraphQL Scalar representing the Prisma.Prisma.Decimal type, based on Decimal.js library.',`,
      `${indent(1)}serialize: (value: unknown) => {`,
      `${indent(1)}if (!Prisma.Prisma.Decimal.isDecimal(value)) throw new Error(\`[DecimalError] Invalid argument: \${Object.prototype.toString.call(value)}. Expected Prisma.Prisma.Decimal.\`)`,
      `${indent(1)}return (value as Prisma.Prisma.Decimal).toString()`,
      `${indent(1)}},`,
      `${indent(1)}parseValue: (value: unknown) => {`,
      `${indent(1)}if (typeof value !== 'string' && typeof value !== "number") throw new Error(\`[DecimalError] Invalid argument: \${typeof value}. Expected string or number.\`)`,
      `${indent(1)}return new Prisma.Prisma.Decimal(value)`,
      `${indent(1)}},`,
      `${indent(1)}parseLiteral(ast) {`,
      `${indent(1)}if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT && ast.kind !== Kind.FLOAT) throw new Error('DecimalScalar can only parse string, int and float values')`,
      `${indent(1)}return new Prisma.Prisma.Decimal(ast.value)`,
      `${indent(1)}},`,
      `})`,
    ].join("\n")

    ret.push(content)

    // Save file
    if (scalar_file_info) {
      await writeFileSafely(scalar_file_info.path, content)
    }
  }

  if (models.join('').includes('BigIntScalar')) {
    const file_info = file_info_map.get('BigIntScalar')

    if (config.importAsESM) exports.push(`export * from './BigIntScalar.js'`)
    else exports.push(`export * from './BigIntScalar'`)
    
    if (file_info) {
      addImport('GraphQLScalarType', 'graphql', file_info.imports)
      addImport('Kind', 'graphql', file_info.imports)
      file_info_map.set('BigIntScalar', {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      
      addImport('GraphQLScalarType', 'graphql', new_imports)
      addImport('Kind', 'graphql', new_imports)
      file_info_map.set('BigIntScalar', {
        path: path.join(config.outputDir, `${SCALARS_DIR}/BigIntScalar.ts`),
        imports: new_imports
      })
    }

    const scalar_file_info = file_info_map.get('BigIntScalar')

    const imports: string[] = []

    if (scalar_file_info) {
      for (const i of scalar_file_info.imports) {
        if (i.includes('.ts')) {
          if (config.importAsESM) imports.push(i.replace('.ts', '.js'))
          else imports.push(i.replace('.ts', ''))
        }
        else imports.push(i)
      }
    }

    const content = [
      AUTO_GENERATED_COMMENT,
      imports.join('\n'),
      `export const BigIntScalar = new GraphQLScalarType({`,
      `${indent(1)}name: 'BigIntScalar',`,
      `${indent(1)}description: "The \`BigInt\` scalar type represents non-fractional signed whole numeric values. BigInt can represent values between -(2^63) + 1 and 2^63 - 1.",`,
      `${indent(1)}serialize: (value: unknown) => {`,
      `${indent(1)}if (typeof value !== "bigint") throw new Error(\`[BigIntScalar] Invalid argument: \${Object.prototype.toString.call(value)}. Expected bigint.\`)`,
      `${indent(1)}return (value as bigint).toString()`,
      `${indent(1)}},`,
      `${indent(1)}parseValue: (value: unknown) => {`,
      `${indent(1)}if (typeof value !== 'string' && typeof value !== "number" && typeof value !== "bigint" && typeof value !== "boolean") throw new Error(\`[BigIntScalar] Invalid argument: \${typeof value}. Expected string or number.\`)`,
      `${indent(1)}return BigInt(value)`,
      `${indent(1)}},`,
      `${indent(1)}parseLiteral(ast) {`,
      `${indent(1)}if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT && ast.kind !== Kind.BOOLEAN) throw new Error('BigIntScalar can only parse string and int values')`,
      `${indent(1)}return BigInt(ast.value)`,
      `${indent(1)}}`,
      `})`
    ].join("\n")

    ret.push(content)

    // Save file
    if (scalar_file_info) {
      await writeFileSafely(scalar_file_info.path, content)
    }
  }

  if (models.join('').includes('JsonScalar')) {
    const file_info = file_info_map.get('JsonScalar')

    if (config.importAsESM) exports.push(`export * from './JsonScalar.js'`)
    else exports.push(`export * from './JsonScalar'`)
    
    if (file_info) {
      addImport('GraphQLScalarType', 'graphql', file_info.imports)
      addImport('Kind', 'graphql', file_info.imports)
      addImport('ValueNode', 'graphql', file_info.imports)
      file_info_map.set('JsonScalar', {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      
      addImport('GraphQLScalarType', 'graphql', new_imports)
      addImport('Kind', 'graphql', new_imports)
      addImport('ValueNode', 'graphql', new_imports)
      file_info_map.set('JsonScalar', {
        path: path.join(config.outputDir, `${SCALARS_DIR}/JsonScalar.ts`),
        imports: new_imports
      })
    }

    const scalar_file_info = file_info_map.get('JsonScalar')

    const imports: string[] = []

    if (scalar_file_info) {
      for (const i of scalar_file_info.imports) {
        if (i.includes('.ts')) {
          if (config.importAsESM) imports.push(i.replace('.ts', '.js'))
          else imports.push(i.replace('.ts', ''))
        }
        else imports.push(i)
      }
    }

    const content = [
      AUTO_GENERATED_COMMENT,
      imports.join('\n'),
      `const NodeValues = [`,
      `${indent(1)}Kind.BOOLEAN,`,
      `${indent(1)}Kind.ENUM,`,
      `${indent(1)}Kind.FLOAT,`,
      `${indent(1)}Kind.INT,`,
      `${indent(1)}Kind.NULL,`,
      `${indent(1)}Kind.STRING,`,
      `]`,
      `const parseAST = (ast: ValueNode) => {`,
      `${indent(1)}if (!ast) throw new Error("JsonScalar can't parse this data type")`,
      `${indent(1)}if (NodeValues.indexOf(ast.kind as any) !== -1) {`,
      `${indent(2)}if (ast.kind === Kind.BOOLEAN) return ast.value`,
      `${indent(2)}else if (ast.kind === Kind.ENUM) return ast.value`,
      `${indent(2)}else if (ast.kind === Kind.FLOAT) return ast.value`,
      `${indent(2)}else if (ast.kind === Kind.INT) return ast.value`,
      `${indent(2)}else if (ast.kind === Kind.NULL) return null`,
      `${indent(2)}else if (ast.kind === Kind.STRING) return JSON.parse(ast.value)`,
      `${indent(1)}}`,
      `${indent(1)}else if (ast.kind === Kind.LIST) {`,
      `${indent(2)}const temp: any[] = []`,
      `${indent(2)}ast.values.map(val => {`,
      `${indent(3)}temp.push(parseAST(val))`,
      `${indent(2)}})`,
      `${indent(2)}return temp`,
      `${indent(1)}}`,
      `${indent(1)}else if (ast.kind === Kind.OBJECT) {`,
      `${indent(2)}const temp: any = {}`,
      `${indent(2)}ast.fields.map((val, index) => {`,
      `${indent(3)}temp[val.name.value] = parseAST(val.value)`,
      `${indent(2)}})`,
      `${indent(2)}return temp`,
      `${indent(1)}}`,
      `${indent(1)}else throw new Error("JsonScalar can't parse this data type")`,
      `}`,
      `export const JsonScalar = new GraphQLScalarType({`,
      `${indent(1)}name: "JsonScalar",`,
      `${indent(1)}description: "Scalar type union of String, Int, Date and other primitive types",`,
      `${indent(1)}serialize(value: unknown): string {`,
      `${indent(2)}// check the type of received value`,
      `${indent(2)}if (`,
      `${indent(3)}typeof value === 'bigint' &&`,
      `${indent(3)}typeof value === 'boolean' &&`,
      `${indent(3)}typeof value === 'number' &&`,
      `${indent(3)}typeof value === 'string'  &&`,
      `${indent(3)}typeof value === 'symbol'`,
      `${indent(2)}) {`,
      `${indent(3)}return JSON.stringify(value, undefined, 0)`,
      `${indent(2)}}`,
      `${indent(2)}else if (typeof value === 'object') {`,
      `${indent(3)}if (value) return JSON.stringify(value, undefined, 0)`,
      `${indent(2)}}`,
      `${indent(2)}throw new Error("JsonScalar can't serialize this data type")`,
      `${indent(1)}},`,
      `${indent(1)}parseValue(value: unknown): bigint | boolean | number | string | symbol | object {`,
      `${indent(2)}// check the type of received value`,
      `${indent(2)}if (`,
      `${indent(3)}typeof value === 'bigint' &&`,
      `${indent(3)}typeof value === 'boolean' &&`,
      `${indent(3)}typeof value === 'number' &&`,
      `${indent(3)}typeof value === 'object' &&`,
      `${indent(3)}typeof value === 'symbol'`,
      `${indent(2)}) {`,
      `${indent(3)}return value`,
      `${indent(2)}}`,
      `${indent(2)}else if (typeof value === 'string') {`,
      `${indent(3)}// We parse string since string could be just a string or a JSON stringified object`,
      `${indent(3)}return JSON.parse(value)`,
      `${indent(2)}}`,
      `${indent(2)}throw new Error("JsonScalar can't parse this data type")`,
      `${indent(1)}},`,
      `${indent(1)}parseLiteral(ast): bigint | boolean | number | string | symbol | object {`,
      `${indent(2)}// check the type of received value on a Abstract Syntax Tree (AST)`,
      `${indent(2)}return parseAST(ast)      `,
      `${indent(1)}},`,
      `})`,
    ].join('\n')

    ret.push(content)

    // Save file
    if (scalar_file_info) {
      await writeFileSafely(scalar_file_info.path, content)
    }
  }

  return ret
}