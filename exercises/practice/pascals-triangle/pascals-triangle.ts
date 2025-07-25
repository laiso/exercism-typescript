export class Triangle {
  public rows: number[][];
  
  constructor(levels: number) {
    this.rows = [];
    
    for (let i = 0; i < levels; i++) {
      const row: number[] = [];
      for (let j = 0; j <= i; j++) {
        if (j === 0 || j === i) {
          row.push(1);
        } else {
          row.push(this.rows[i - 1][j - 1] + this.rows[i - 1][j]);
        }
      }
      this.rows.push(row);
    }
  }
  
  get lastRow(): number[] {
    return this.rows[this.rows.length - 1];
  }
}
