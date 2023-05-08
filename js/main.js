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

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

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
  novoItem.appendChild(criaBotaoDeleta(item.id));
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
  itemParaAtualizar.appendChild(criaBotaoDeleta(item.id));
}

function criaBotaoDeleta(id) {
  const elementoBotao = document.createElement('button');
  elementoBotao.innerText = 'X';
  elementoBotao.addEventListener('click', function () {
    deletaElemento(this.parentNode, id);
  });
  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(
    itens.findIndex(elemento => elemento.id === id),
    1
  );

  guardaItens(itens);
}
