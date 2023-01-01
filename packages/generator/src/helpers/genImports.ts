import { relative } from 'path'
import { REGEX } from '../constants'

export const genImports = (imports: string[]) => {
  return imports.length === 1 ? imports[0] + "\n" : imports.join('\n') + "\n" 
}

export const genRelativeImport = (to_import: string, src: string) => {
  // return relative(to, from.replace(REGEX.match_file_name_only, 'index'))

  // Note that we have to pass the src as a directory, not file
  // as such, we have to remove file name from src
  // Also, we can do this replace due to how we structured file exports
  const src_dir = (src.match(REGEX.match_file_path) as string[])[0]

  let relative_path = relative(src_dir, to_import).replace(REGEX.match_file_name_only, 'index')
  if (!relative_path.startsWith('.')) relative_path = './' + relative_path
  return relative_path
}