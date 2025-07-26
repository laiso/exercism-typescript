const DNA_TO_RNA: { [key: string]: string } = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
}

export function toRna(dna: string): string {
  let rna = ''
  for (const nucleotide of dna) {
    const rnaNucleotide = DNA_TO_RNA[nucleotide]
    if (!rnaNucleotide) {
      throw new Error('Invalid input DNA.')
    }
    rna += rnaNucleotide
  }
  return rna
}
