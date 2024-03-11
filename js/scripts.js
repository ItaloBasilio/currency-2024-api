// Selecionando os elementos do HTML
const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const apiKey = "2515c6540fc14076dddfdf3c";
const getButton = document.querySelector("form button");

// Loop através das listas suspensas para preenchê-las com as opções de moeda
for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_code) {
        let selected;

        // Definindo a opção selecionada com base na moeda padrão
        if (i == 0) {
            selected = currency_code == "BRL" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "USD" ? "selected" : "";
        }

        // Criando as tags de opção
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    // Adicionando um evento de mudança para cada lista suspensa
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

// Função para carregar a bandeira da moeda selecionada
function loadFlag(element) {
    for (code in country_code) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `/Assets/flag-icons/flags/1x1/${country_code[code]}.svg`;
        }
    }
}

// Evento de carregamento da página
window.addEventListener("load", () => {
    getExchangeRate();
});

// Evento de clique no botão para obter a taxa de câmbio
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

// Função para obter a taxa de câmbio
function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;

    // Se nenhum valor for inserido, definir o valor padrão como 1
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    // Exibir uma mensagem enquanto aguarda a conversão
    exchangeRateTxt.innerText = "Aguardando conversão...";

    // Construir a URL da API para obter a taxa de câmbio
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let exchangerate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amountVal * exchangerate).toFixed(2);

            // Exibir a taxa de câmbio calculada
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        });
}
