export const AUTO_GENERATED_COMMENT = `//// ------------------------------------------------------
//// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
//// ------------------------------------------------------\n`

export const PACKAGE_NAME = 'prisma-generator-basic-typegraphql'
export const GENERATOR_NAME = 'Basic TypeGraphQL Generator'
export const DEFAULT_FILE_NAME = 'index.ts'
export const DEFAULT_OUTPUT_DIR = '../src/generated/type-graphql-types'
export const PRISMA_TYPES = [
  'BigInt',
  'Boolean',
  'Bytes',
  'DateTime',
  'Decimal',
  'Float',
  'Int',
  'Json',
  'String'
]

export const OMIT_MODIFERS = [
  '@hide',
  '@omit',
  '@TypeGraphQL.omit(output: true)',
  '@TypeGraphQL.omit(output:true)',
  '@TypeGraphQL.omit (output: true)',
  '@TypeGraphQL.omit (output:true)',
]

export const OVERRIDE_OMIT_MODIFERS = [
  '@show',
  '@emit',
  '@TypeGraphQL.omit(output: false)',
  '@TypeGraphQL.omit(output:false)',
  '@TypeGraphQL.omit (output: false)',
  '@TypeGraphQL.omit (output:false)',
]

export const NULLABLE_MODIFERS = [
  '@nullable',
  '@null',
  '@TypeGraphQL.omit(nullable: true)',
  '@TypeGraphQL.omit(nullable:true)',
  '@TypeGraphQL.omit (nullable: true)',
  '@TypeGraphQL.omit (nullable:true)',
]

export const OPTIONAL_IDENTIFIERS = [
  '?',
  '@id',
  '[]',
]

export const SCALARS = [
  'DecimalScalar',
  'BigIntScalar',
  'JsonScalar'
]

export const ENUM_TYPE_SUFFIX = '_Enum' //Appended after every enum if enumAsType is true

export const INDENT_SPACES = 2

export const ENUM_DIR = 'enums'
export const MODELS_DIR = 'models'
export const SCALARS_DIR = 'scalars'

export const REGEX = {
  matchWordeBeforeBracketRegex: /[\w]+\s+\{/gm,
  matchWordeBeforeEqualsAndBracketRegex: /[\w]+\s+\=+\s+\{+/gm,
  matchWordInSingleQuotes: /'(.*?)'/gm,
  matchFirstWord: /[^\s][\w]+/gm,
  removeWhiteSpaceAndBracketRegex: /\s+\{+/gm,
  removeEqualsAndWhiteSpaceAndBracketRegex: /\s+\{+/gm,
  removeSingleQuotes: /(\')*/gm,
  match_file_name_only: /(?!\/)+(\w)+(?=.ts)+/gm,
  match_file_path: /^.*[\\/]/gm, // Includes '/' at end of path if any
}

export const AS_TYPE_SUFFIX = 'GraphQLType'

export const PARTIAL_MODEL_PREFIX = 'Partial'