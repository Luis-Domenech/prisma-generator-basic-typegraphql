export const matchAndRemove = (toModify: string, match: RegExp, removeMatch: RegExp): string => {
  let matches = toModify.match(match)

  if (matches) {
    if (matches[0]) {
      return  matches[0].replace(removeMatch, "")
    }
    else {
      return ''
    }
  }
  else {
    return ''
  }
}