export const genImports = (imports: string[]) => {
  return imports.length === 1 ? imports[0] + "\n" : imports.join('\n') + "\n" 
}