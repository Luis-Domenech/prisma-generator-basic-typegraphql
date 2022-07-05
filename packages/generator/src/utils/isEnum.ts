import { DMMF } from "@prisma/generator-helper";
import { ENUM_TYPE_SUFFIX, PRISMA_TYPES } from "../constants";
import { InitializedConfig } from "../types";

export const isEnum = (field: DMMF.Field, enums: string, config: InitializedConfig) => {
  let actualEnums: RegExpMatchArray | null
    
  if (config.enumAsType) actualEnums = enums.match(/(?<=enum\s)(\w)+/gm)
  else if (config.enumAsConst) actualEnums = enums.match(/(?<=const\s)(\w)+/gm)
  else actualEnums = enums.match(/(?<=enum\s)(\w)+/gm)
  
  let isEnum = false
    
  if (PRISMA_TYPES.indexOf(field.type) === -1 && actualEnums) {
    actualEnums.map(e => { if (e.replace(ENUM_TYPE_SUFFIX, "") === field.type) isEnum = true})
  }

  return isEnum
}