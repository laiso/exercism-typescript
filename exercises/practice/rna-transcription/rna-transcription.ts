export function toRna(dna: string): string {
  const transcription: { [key: string]: string } = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  }
  
  let rna = ''
  for (const nucleotide of dna) {
    if (nucleotide in transcription) {
      rna += transcription[nucleotide]
    } else {
      throw new Error('Invalid input DNA.')
    }
  }
  
  return rna
}
