import fs from 'fs'
import { formatFile } from './formatFile'
import path from 'path'

export const writeFileSafely = async (outputDir: string, outputName: string, content: any) => {
  fs.mkdirSync(outputDir, { recursive: true })

  // Ensures our file is formatted correctly before saving
  fs.writeFileSync(path.join(outputDir, outputName), await formatFile(content))
}
