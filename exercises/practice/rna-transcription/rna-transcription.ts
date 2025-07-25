export function toRna(dna: string): string {
  const dnaToRna: { [key: string]: string } = {
    'C': 'G',
    'G': 'C',
    'A': 'U',
    'T': 'A'
  }
  
  let result = ''
  for (const nucleotide of dna) {
    if (!(nucleotide in dnaToRna)) {
      throw new Error('Invalid input DNA.')
    }
    result += dnaToRna[nucleotide]
  }
  
  return result
}
