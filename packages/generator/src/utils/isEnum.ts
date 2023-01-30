import { DMMF } from "@prisma/generator-helper";
import { ENUM_TYPE_SUFFIX, PRISMA_TYPES, REGEX } from "../constants";
import { InitializedConfig } from "../types";

export const isAnEnum = (field: DMMF.Field, enums: string[], config: InitializedConfig): boolean => {
  let actualEnums: RegExpMatchArray | null

  
  let matchWordsBeforeBracketRegex = /[\w]+\s+\{/gm
  let removeWhiteSpaceAndBracketRegex = /\s+\{+/gm
  
  // For const
  let removeEqualsAndWhiteSpaceAndBracketRegex = /\s+\{+/gm
  let matchWordeBeforeEqualsAndBracketRegex = /[\w]+\s+\=+\s+\{+/gm

  const e = enums.join('\n')

  if (config.enumAsType) actualEnums = e.match(REGEX.matchWordeBeforeBracketRegex)
  else if (config.enumAsConst) actualEnums = e.match(REGEX.matchWordeBeforeEqualsAndBracketRegex)
  else actualEnums = e.match(REGEX.matchWordeBeforeBracketRegex)

  if (!actualEnums) return false

  let isEnum = false
    
  if (PRISMA_TYPES.indexOf(field.type) === -1 && actualEnums) {
    actualEnums.map(e => { 
      let actualEnum = e

      if (config.enumAsType) {
        actualEnum.replace(ENUM_TYPE_SUFFIX, "")
        actualEnum.replace(REGEX.removeWhiteSpaceAndBracketRegex, "")
      }
      else if (config.enumAsConst) {
        actualEnum.replace(REGEX.removeEqualsAndWhiteSpaceAndBracketRegex, "")
      }
      else {
        actualEnum.replace(REGEX.removeEqualsAndWhiteSpaceAndBracketRegex, "")
      }
      const cleaned = actualEnum.match(REGEX.matchFirstWord)
      const compare = cleaned ? cleaned[0] : ''

      if (compare === field.type) isEnum = true
    })
  }

  return isEnum
}