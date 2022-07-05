import { NULLABLE_MODIFERS, OMIT_MODIFERS, OVERRIDE_OMIT_MODIFERS, REGEX } from "../constants"
import { FieldModifier, InitializedConfig } from "../types"
import { contains } from "../utils/contains"
import { matchAndRemove } from "../utils/matchAndReplace"

// Get modifers from schema, meaning get stuff like //@omit
export const getFieldModifiers = (dataModel: string, config: InitializedConfig): FieldModifier[] => {
  
  let hide = false
  let nullable = false
  let override = false

  let currentCodeBlock: { name: string; type: 'model' | 'enum' }

  let fieldModifiers: FieldModifier[] = []

  dataModel.split('\n').forEach((line) => {
    

    // This line is a comment and thus, next line should be the field attached to this modifier we identified
    if (!config.strictModifiers || (config.strictModifiers && line.includes("///"))) {
      if (contains(line, OMIT_MODIFERS)) return (hide = true)
      else if (contains(line, OVERRIDE_OMIT_MODIFERS)) return (override = true)
      else if (contains(line, NULLABLE_MODIFERS)) return (nullable = true)
    }

    if (line.includes('model') && line.includes("{")) currentCodeBlock = { name: matchAndRemove(line, REGEX.matchWordeBeforeBracketRegex, REGEX.removeWhiteSpaceAndBracketRegex), type: 'model' }
    else if (line.includes('model') && line.includes("{")) currentCodeBlock = { name: matchAndRemove(line, REGEX.matchWordeBeforeBracketRegex, REGEX.removeWhiteSpaceAndBracketRegex), type: 'enum' }

    let fieldName = line.match(REGEX.matchFirstWord) ? line.match(REGEX.matchFirstWord)![0] : ''

    // Check if modifier is on same line as in at the end
    // Example: password String @db.VarChar(64) // @omit
    if (!config.strictModifiers) {
      if (!hide && !nullable && !override) {
        if (line.includes("//")) {
          // This time we don't return since we want the modifier to affect this field
          if (contains(line, OMIT_MODIFERS)) hide = true
          else if (contains(line, NULLABLE_MODIFERS)) nullable = true
          else if (contains(line, OVERRIDE_OMIT_MODIFERS)) override = true
        }
      }
    }

    // Now we know if last line or this line modified the current attribute, so push that data
    if (hide) {
      fieldModifiers.push({
        fieldName,
        hide: true,
        nullable: false,
        override: false,
        modelName: currentCodeBlock.name,
      })

      hide = false
    } 
    else if (override) {
      fieldModifiers.push({
        fieldName,
        nullable: false,
        hide: false,
        override: true,
        modelName: currentCodeBlock.name,
      })

      override = false
    }
    else if (nullable) {
      fieldModifiers.push({
        fieldName,
        nullable: true,
        hide: false,
        override: false,
        modelName: currentCodeBlock.name,
      })

      nullable = false
    }
  })
 
  return fieldModifiers
}