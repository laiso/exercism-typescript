export function translate(rna: string): string[] {
  if (!rna) return []
  
  const codonToProtein: { [key: string]: string } = {
    'UUU': 'Phenylalanine', 'UUC': 'Phenylalanine',
    'UUA': 'Leucine', 'UUG': 'Leucine',
    'UCU': 'Serine', 'UCC': 'Serine', 'UCA': 'Serine', 'UCG': 'Serine',
    'UAU': 'Tyrosine', 'UAC': 'Tyrosine',
    'UGU': 'Cysteine', 'UGC': 'Cysteine',
    'UGG': 'Tryptophan',
    'UAA': 'STOP', 'UAG': 'STOP', 'UGA': 'STOP'
  }
  
  const proteins: string[] = []
  
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3)
    if (codon.length < 3) break
    
    const protein = codonToProtein[codon]
    if (!protein) {
      throw new Error('Invalid codon')
    }
    
    if (protein === 'STOP') break
    proteins.push(protein)
  }
  
  return proteins
}
