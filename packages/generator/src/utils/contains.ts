// Check if a target string contains any pattern from the pattern array
export const contains = (target: string, pattern: string[]): boolean => {
  let found = false

  pattern.map(async (word) => {
    if (target.includes(word)) found = true
  })

  return found
}