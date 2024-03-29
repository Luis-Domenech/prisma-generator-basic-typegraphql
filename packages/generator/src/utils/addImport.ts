import { REGEX } from "../constants"

export const getFromImport = (i: string) => {
  let fromImport = i.match(REGEX.matchWordInSingleQuotes)
  return fromImport ? fromImport[0].replace(REGEX.removeSingleQuotes, '') : ''
}

export const addImport = (newImport: string, fromImport: string, imports: string[], as_type = false, as_default = false) => {
  if (as_default) {
    const new_import = `import ${newImport} from '${fromImport}'`
    if (!imports.find(i => i === new_import)) {
      imports.push(new_import)
    }
    return
  }

  let find = undefined
  
  if (as_type) {
    find = imports.find(i => getFromImport(i) === fromImport && i.includes('type {'))
  }
  else {
    find = imports.find(i => getFromImport(i) === fromImport && !i.includes('type {'))
  }

  if (find) {
    let index = imports.indexOf(find)
    // let newImportString = ''

    // let insideImports = false
    // let currentImports: string[] = []

    const first_bracket = find.indexOf('{')
    const last_bracket = find.indexOf('}')
    const imports_arr = (find.slice(first_bracket + 2, last_bracket - 1) + ', ' + newImport).split(', ')
    const new_imports = [...new Set(imports_arr)].join(', ')



    // find.split(" ").map((s) => {
    //   if (s === "{") insideImports = true
    //   if (insideImports) currentImports.push(s)
      
    //   if (s === "}") {
    //     const find = currentImports.find(s2 => s2.replace(",", "") === newImport)
    //     if (!find) newImportString += newImportString.charAt(newImportString.length - 1) === ',' ? ` ${newImport} ${s}` : `, ${newImport} ${s}`
    //     else newImportString += newImportString ? ` ${s}` : s

    //     insideImports = false
    //   }
    //   else newImportString += newImportString ? ` ${s}` : s
    // })

    if (as_type) imports[index] = `import type { ${new_imports} } from '${fromImport}'`
    else imports[index] = `import { ${new_imports} } from '${fromImport}'`
  }
  else {
    if (as_type) imports.push(`import type { ${newImport} } from '${fromImport}'`)
    else imports.push(`import { ${newImport} } from '${fromImport}'`)
  }
}