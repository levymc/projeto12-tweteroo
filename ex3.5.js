function listaCompras (lista, precos, total) {
  const valorTotal = total;
  const newArray = lista.map((element, i) => ({ item: element, preco: precos[i] }));
  let comprando = true;
  let itensComprados = [];

  console.log(newArray);

  if (comprando) {
    newArray.forEach(element => {
      if (element.preco > total){
      }else if (total === 0){
        comprando = false;
      }else{
        itensComprados.push(element.item);
        total -= element.preco
        console.log(total)
      }
    });
  }
  console.log(`
      Custo Total de R$${valorTotal-total},00 
      Itens Comprados: ${itensComprados}
  `)
  return itensComprados
}

const lista = ['detergente', 'sal', 'macarrao', 'pao']; 
const precos = [3.00, 1.00, 4.0, 12.0];
const total = 9

listaCompras (lista, precos, total)