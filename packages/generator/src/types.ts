import { Dictionary } from "@prisma/generator-helper"

export type FieldModifier = {
  fieldName: string
  modelName: string // Model this field belongs to
  nullable?: boolean
  hide?: boolean
  override?: boolean // If hideRelation is true, this overrides a default hide of a relation field
}

export type FieldOptional = {
  fieldName: string
  modelName: string // Model this field belongs to
  optional?: boolean
}

export interface ExtendedConfig extends Dictionary<string> {
  useYarn: string
  hideRelations: string
  strictModifiers: string
  wipeOutput: string
  outputDir: string
  skipVerCheck: string
  installDeps: string
  enumAsType: string
  optionalRelations: string
  addNull: string
  addUndefined: string
  enumAsConst: string
  addTypenameField: string
  importAsESM: string
}

export interface InitializedConfig {
  useYarn: boolean
  hideRelations: boolean
  strictModifiers: boolean
  wipeOutput: boolean
  skipVerCheck: boolean
  installDeps: boolean
  enumAsType: boolean
  enumAsConst: boolean
  optionalRelations: boolean
  addNull: boolean
  addUndefined: boolean
  outputDir: string
  addTypenameField: boolean
  importAsESM: boolean
}

export type FileInfo = {
  path: string
  imports: string[]
}