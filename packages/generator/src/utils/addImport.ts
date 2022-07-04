export const addImport = (newImport: string, fromImport: string, imports: string[]) => {
  let find = imports.find(i => i.includes(fromImport))

  if (find) {
    let index = imports.indexOf(find)
    let newImportString = ''

    let insideImports = false
    let currentImports: string[] = []

    find.split(" ").map((s) => {
      if (s === "{") insideImports = true
      if (insideImports) currentImports.push(s)
      
      if (s === "}") {
        const find = currentImports.find(s => s.includes(newImport))
        if (!find) newImportString += newImportString.charAt(newImportString.length - 1) === ',' ? ` ${newImport} ${s}` : `, ${newImport} ${s}`
        else newImportString += newImportString ? ` ${s}` : s

        insideImports = false
      }
      else newImportString += newImportString ? ` ${s}` : s
    })

    imports[index] = newImportString
  }
  else {
    imports.push(`import { ${newImport} } from '${fromImport}'`)
  }
}