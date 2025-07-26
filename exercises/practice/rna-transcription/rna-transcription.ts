export function toRna(dna: string): string {
  const transcription: { [key: string]: string } = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  }
  
  for (const nucleotide of dna) {
    if (!(nucleotide in transcription)) {
      throw new Error('Invalid input DNA.')
    }
  }
  
  return dna.split('').map(nucleotide => transcription[nucleotide]).join('')
}
