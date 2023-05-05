const form = document.getElementById('novoItem');
const listaItems = document.getElementById('lista-items');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach(elemento => {
  criaElemento(elemento);
});

form.addEventListener('submit', evento => {
  evento.preventDefault();

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['quantidade'];
  const existe = itens.find(
    elemento => elemento.nome.toLowerCase() === nome.value.toLowerCase()
  );
  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  checaSeExisteNaLista(existe, itemAtual);

  guardaItens(itens);

  esvaziaCampos(nome, quantidade);
});

function checaSeExisteNaLista(existe, itemAtual) {
  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);

    itens[existe.id] = itemAtual;
  } else {
    itemAtual.id = itens.length;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }
}

function criaElemento(item) {
  const novoItem = document.createElement('li');
  novoItem.dataset.id = item.id;
  novoItem.classList.add('item');
  novoItem.innerHTML = `<strong>${
    item.quantidade
  }</strong>${item.nome.toUpperCase()}`;
  listaItems.appendChild(novoItem);
}

function esvaziaCampos(nome, quantidade) {
  nome.value = '';
  quantidade.value = '';
}

function guardaItens(listaDeValores) {
  localStorage.setItem('itens', JSON.stringify(listaDeValores));
}

function atualizaElemento(item) {
  let itemParaAtualizar = document.querySelector("[data-id='" + item.id + "']");
  itemParaAtualizar.innerHTML = `<strong>${
    item.quantidade
  }</strong>${item.nome.toUpperCase()}`;
}
