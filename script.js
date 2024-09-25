let cart = [];
let total = 0;

function adicionarAoCarrinho(produto, preco) {
    cart.push({ produto, preco, quantidade: 1 });
    total += preco;
    atualizarCarrinho();
}

function adicionarAoCarrinhoMultiplos(produto, preco, qtyId) {
    const quantidade = parseInt(document.getElementById(qtyId).value);
    for (let i = 0; i < quantidade; i++) {
        cart.push({ produto, preco, quantidade: 1 });
        total += preco;
    }
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    total -= cart[index].preco * cart[index].quantidade;
    cart.splice(index, 1);
    atualizarCarrinho();
}

function alterarQuantidade(index, novaQuantidade) {
    const item = cart[index];
    const diferenca = novaQuantidade - item.quantidade;
    item.quantidade = novaQuantidade;
    total += diferenca * item.preco;
    atualizarCarrinho();
}

function limparCarrinho() {
    cart = [];
    total = 0;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        // Nome do produto
        const nomeProduto = document.createElement("span");
        nomeProduto.textContent = item.produto;
        nomeProduto.classList.add("cart-item-name");

        // Quantidade
        const quantidadeContainer = document.createElement("div");
        quantidadeContainer.classList.add("cart-item-quantity");

        const menosButton = document.createElement("button");
        menosButton.textContent = "-";
        menosButton.onclick = () => alterarQuantidade(index, Math.max(1, item.quantidade - 1));

        const quantidadeInput = document.createElement("input");
        quantidadeInput.type = "number";
        quantidadeInput.value = item.quantidade;
        quantidadeInput.min = 1;
        quantidadeInput.onchange = (e) => alterarQuantidade(index, parseInt(e.target.value));

        const maisButton = document.createElement("button");
        maisButton.textContent = "+";
        maisButton.onclick = () => alterarQuantidade(index, item.quantidade + 1);

        quantidadeContainer.appendChild(menosButton);
        quantidadeContainer.appendChild(quantidadeInput);
        quantidadeContainer.appendChild(maisButton);

        // Botão de remover
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("cart-item-remove");
        deleteButton.onclick = () => removerDoCarrinho(index);

        li.appendChild(nomeProduto);
        li.appendChild(quantidadeContainer);
        li.appendChild(deleteButton);

        cartItems.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);

    const cartContainer = document.getElementById("cart-container");
    const paymentOptions = document.getElementById("payment-options");

    if (cart.length > 0) {
        cartContainer.classList.add("visible");
        paymentOptions.classList.remove("hidden");
    } else {
        cartContainer.classList.remove("visible");
        paymentOptions.classList.add("hidden");
    }
}

document.getElementById("checkout-button").addEventListener("click", () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        alert("Por favor, selecione uma forma de pagamento.");
        return;
    }

    alert(`Compra finalizada com sucesso! Você escolheu pagar com ${paymentMethod.value}.`);
    // Aqui você pode adicionar lógica para salvar os dados da compra
    limparCarrinho();
});
