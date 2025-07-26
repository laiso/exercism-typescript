export function toRna(dna: string): string {
  const transcription: { [key: string]: string } = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  }
  
  return dna.split('').map(nucleotide => {
    if (!(nucleotide in transcription)) {
      throw new Error('Invalid input DNA.')
    }
    return transcription[nucleotide]
  }).join('')
}
