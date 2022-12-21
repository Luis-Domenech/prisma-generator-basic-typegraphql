import fs from 'fs'
import { formatFile } from './formatFile'

export const writeFileSafely = async (output_path: string, content: string) => {
  
  // fs.mkdirSync(outputDir, { recursive: true })
  const split = output_path.split('/')
  const output_dir = split.slice(0, -1).join('/')

  if (!fs.existsSync(output_dir)) fs.mkdirSync(output_dir, { recursive: true })

  // Ensures our file is formatted correctly before saving
  fs.writeFileSync(output_path, await formatFile(content))
}