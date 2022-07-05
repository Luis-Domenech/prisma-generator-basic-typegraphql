import { OPTIONAL_IDENTIFIERS, REGEX } from "../constants";
import { FieldOptional } from "../types"
import { contains } from "../utils/contains";
import { logger } from "../utils/logger";
import { matchAndRemove } from "../utils/matchAndReplace";

// Get modifers from schema, meaning get stuff like //@omit
export const getFieldsOptional = (dataModel: string): FieldOptional[] => {
  
  let currentCodeBlock: { name: string; type: 'model' | 'enum' }

  let fieldOptional: FieldOptional[] = []

  dataModel.split('\n').forEach((line) => {

    if (line.includes('model') && line.includes("{")) currentCodeBlock = { name: matchAndRemove(line, REGEX.matchWordeBeforeBracketRegex, REGEX.removeWhiteSpaceAndBracketRegex), type: 'model' }
    else if (line.includes('model') && line.includes("{")) currentCodeBlock = { name: matchAndRemove(line, REGEX.matchWordeBeforeBracketRegex, REGEX.removeWhiteSpaceAndBracketRegex), type: 'enum' }

    const fieldName = line.match(REGEX.matchFirstWord) ? line.match(REGEX.matchFirstWord)![0] : ''

    if (contains(line, OPTIONAL_IDENTIFIERS) && currentCodeBlock.type !== 'enum') {
      fieldOptional.push({
        fieldName,
        modelName: currentCodeBlock.name,
        optional: true
      })
    }
  })
 
  return fieldOptional
}