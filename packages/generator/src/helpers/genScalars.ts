import { INDENT_SPACES, SCALARS } from "../constants"
import { contains } from "../utils/contains"

const indent = (index: number) => {
  return " ".repeat(2 + (index - 1) * INDENT_SPACES)
}

export const genScalars = (models: string) => {
  if (contains(models, SCALARS)) {
    return (
`export const DecimalScalar = new GraphQLScalarType({
${indent(1)}name: "Decimal",
${indent(1)}description: "GraphQL Scalar representing the Prisma.Decimal type, based on Decimal.js library.",
${indent(1)}serialize: (value: unknown) => {
${indent(2)}if (!(Prisma.Decimal.isDecimal(value))) {
${indent(3)}throw new Error(\`[DecimalError] Invalid argument: \${Object.prototype.toString.call(value)}. Expected Prisma.Decimal.\`)
${indent(2)}}
${indent(2)}return (value as Prisma.Decimal).toString()
${indent(1)}},
${indent(1)}parseValue: (value: unknown) => {
${indent(2)}if (!(typeof value === "string")) {
${indent(3)}throw new Error(\`[DecimalError] Invalid argument: \${typeof value}. Expected string.\`)
${indent(2)}}
${indent(2)}return new Prisma.Decimal(value)
${indent(1)}},
${indent(1)}parseLiteral(ast) {
${indent(2)}if (ast.kind !== Kind.STRING) {
${indent(3)}throw new Error("StringOrInt can only parse string or number values")
${indent(2)}}
${indent(2)}return new Prisma.Decimal(ast.value)
${indent(1)}}
})
`
    )
  }
}