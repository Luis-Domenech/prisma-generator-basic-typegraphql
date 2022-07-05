import { OPTIONAL_IDENTIFIERS } from "../constants";
import { FieldOptional, InitializedConfig } from "../types"
import { contains } from "../utils/contains";

// Get modifers from schema, meaning get stuff like //@omit
export const getFieldsOptional = (dataModel: string): FieldOptional[] => {
  
  let currentCodeBlock: { name: string; type: 'model' | 'enum' }

  let fieldOptional: FieldOptional[] = []

  dataModel.split('\n').forEach((line) => {

    if (line.includes('model')) currentCodeBlock = { name: line.split(' ')[1], type: 'model' }
    else if (line.includes('enum')) currentCodeBlock = { name: line.split(' ')[1], type: 'enum' }

    const fieldName = line.split(' ').filter((e) => e !== '').map((e) => e.replace('\r', ''))[0]

    if (contains(line, OPTIONAL_IDENTIFIERS)) {
      fieldOptional.push({
        fieldName,
        modelName: currentCodeBlock.name,
        optional: true
      })
    }
  })
 
  return fieldOptional
}