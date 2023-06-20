function numMov(casaIni, casaFin){
    const x1 = casaIni[0];
    const y1 = casaIni[1];
    const x2 = casaFin[0];
    const y2 = casaFin[1];
  
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
  
    if (dx === dy) {
      return 1; 
    } else if (dx === 0 || dy === 0) {
      return 1; 
    } else {
      return 2; 
    }
  }