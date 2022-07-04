import { Dictionary } from "@prisma/generator-helper"

export type FieldModifier = {
  fieldName: string
  modelName: string // Model this field belongs to
  nullable?: boolean
  hide?: boolean
  override?: boolean // If hideRelation is true, this overrides a default hide of a relation field
}

export interface ExtendedConfig extends Dictionary<string> {
  useYarn: string
  hideRelations: string
  strictModifiers: string
  wipeOutput: string
  outputName: string
  outputDir: string
  skipVerCheck: string
  installDeps: string
}

export interface InitializedConfig {
  useYarn: boolean
  hideRelations: boolean
  strictModifiers: boolean
  wipeOutput: boolean
  skipVerCheck: boolean
  installDeps: boolean
  outputName: string
  outputDir: string
}