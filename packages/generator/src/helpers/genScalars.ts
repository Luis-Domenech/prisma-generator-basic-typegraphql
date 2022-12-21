import path from "path"
import { AUTO_GENERATED_COMMENT, INDENT_SPACES, SCALARS, SCALARS_DIR } from "../constants"
import { FileInfo, InitializedConfig } from "../types"
import { addImport } from "../utils/addImport"
import { writeFileSafely } from "../utils/writeFileSafely"

const indent = (index: number) => {
  return " ".repeat(2 + (index - 1) * INDENT_SPACES)
}

export const genScalars = async (models: string[], file_info_map: Map<string, FileInfo>, config: InitializedConfig) => {
  let ret: string[] = []

  if (models.join('').includes('DecimalScalar')) {
    const file_info = file_info_map.get('DecimalScalar')
    
    if (file_info) {
      addImport('GraphQLScalarType', 'graphql', file_info.imports)
      addImport('Kind', 'graphql', file_info.imports)
      addImport('Prisma', '@prisma/client', file_info.imports)
      file_info_map.set('DecimalScalar', {
        ...file_info,
      })
    }
    else {
      let new_imports: string[] = []
      
      addImport('GraphQLScalarType', 'graphql', new_imports)
      addImport('Kind', 'graphql', new_imports)
      addImport('Prisma', '@prisma/client', new_imports)
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
      `${indent(1)}description: 'GraphQL Scalar representing the Prisma.Decimal type, based on Decimal.js library.',`,
      `${indent(1)}serialize: (value: unknown) => {`,
      `${indent(1)}if (!Prisma.Decimal.isDecimal(value)) throw new Error(\`[DecimalError] Invalid argument: \${Object.prototype.toString.call(value)}. Expected Prisma.Decimal.\`)`,
      `${indent(1)}return (value as Prisma.Decimal).toString()`,
      `${indent(1)}},`,
      `${indent(1)}parseValue: (value: unknown) => {`,
      `${indent(1)}if (typeof value !== 'string' && typeof value !== "number") throw new Error(\`[DecimalError] Invalid argument: \${typeof value}. Expected string or number.\`)`,
      `${indent(1)}return new Prisma.Decimal(value)`,
      `${indent(1)}},`,
      `${indent(1)}parseLiteral(ast) {`,
      `${indent(1)}if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT && ast.kind !== Kind.FLOAT) throw new Error('DecimalScalar can only parse string, int and float values')`,
      `${indent(1)}return new Prisma.Decimal(ast.value)`,
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

  return ret
}