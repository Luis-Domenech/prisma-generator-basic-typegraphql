import { INDENT_SPACES, SCALARS } from "../constants"
import { contains } from "../utils/contains"

const indent = (index: number) => {
  return " ".repeat(2 + (index - 1) * INDENT_SPACES)
}

export const genScalars = (models: string) => {
  let ret: string[] = []
  if (models.includes('DecimalScalar')) {
    ret.push(
      [
        `export const DecimalScalar = new GraphQLScalarType({`,
        `${indent(1)}name: 'Decimal',`,
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
    )
  }
  if (models.includes('BigIntScalar')) {
    ret.push(
      [
        `export const BigIntScalar = new GraphQLScalarType({`,
        `${indent(1)}name: 'BigInt',`,
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
    ].join("\n"))
  }

  return ret.length > 0 ? ret.join("\n") : ""
}