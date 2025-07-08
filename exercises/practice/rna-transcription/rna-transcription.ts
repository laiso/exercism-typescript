export function toRna(dna: string): string {
  const transcription: { [key: string]: string } = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  }
  
  let result = ''
  for (const nucleotide of dna) {
    if (!transcription[nucleotide]) {
      throw new Error('Invalid input DNA.')
    }
    result += transcription[nucleotide]
  }
  
  return result
}
