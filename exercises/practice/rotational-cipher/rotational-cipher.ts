export function rotate(text: string, shiftKey: number): string {
  return text
    .split('')
    .map(char => {
      if (char >= 'a' && char <= 'z') {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shiftKey) % 26) + 97)
      } else if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shiftKey) % 26) + 65)
      } else {
        return char
      }
    })
    .join('')
}
