export function toRna(dna: string): string {
  const transcription: { [key: string]: string } = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  }
  
  let rna = ''
  for (const nucleotide of dna) {
    if (!(nucleotide in transcription)) {
      throw new Error('Invalid input DNA.')
    }
    rna += transcription[nucleotide]
  }
  
  return rna
}
