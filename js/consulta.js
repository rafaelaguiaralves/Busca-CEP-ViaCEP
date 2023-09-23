var elementoDiv = document.getElementById('conteudo')
var concluidoDIV = document.getElementById('concluido')

function validaCEP(cep) {
    if (cep.length < 8) {
        elementoDiv.innerHTML = `
        O CEP deve conter 8 dígitos numéricos, você digitou ${cep.length}
        `;

    }
    else {
        BuscaEndereco(cep);
    }
}


async function BuscaEndereco(busca) {

    try {


        var viaCEP = await fetch(`https://viacep.com.br/ws/${busca}/json/`);
        var resposta = await viaCEP.json();

        if (resposta.erro) {
            throw Error('CEP não existe!')

            elementoDiv.innerHTML = `
    ${Error('CEP não existe!')}
    `;
        }
        else {

            await validarPreenchimento(resposta.logradouro, resposta.bairro, resposta.localidade, resposta.uf);

            return resposta;
        }
    }
    catch (erro) {

        elementoDiv.innerHTML = `
    <a title="Direciona para o site Via CEP" href="https://viacep.com.br/">${erro}</a>
    `;
    }
    finally {
        console.log('Processo finalizado!');
    }
}

function validarPreenchimento(logradouro, bairro, cidade, uf) {

    if (logradouro.length > 0 || bairro.length > 0) {
        elementoDiv.innerHTML = `
    <label for="logradouro"> Logradouro: </label>
    <input readonly require type="text" id="logradouro" value="${logradouro}"> <br>
    <label for="numero"> Número: </label>
    <input require type="text" id="numero"> <br>
    <label for="complemento"> Complemento: </label>
    <input type="text" id="complemento"> <br>
    <label for="bairro"> Bairro: </label>
    <input readonly require type="text" id="bairro" value="${bairro}"> <br>
    <label for="cidade"> Cidade: </label>
    <input readonly require type="text" id="cidade" value="${cidade}"> <br>
    <label for="uf"> Estado: </label>
    <input readonly require type="text" id="uf" value="${uf}"> <br>
        
    `;
    }
    else {
        elementoDiv.innerHTML = `
    <label for="logradouro"> Logradouro: </label>
    <input require type="text" id="logradouro" value="${logradouro}"> <br>
    <label for="numero"> Número: </label>
    <input require type="text" id="numero"> <br>
    <label for="complemento"> Complemento: </label>
    <input type="text" id="complemento"> <br>
    <label for="bairro"> Bairro: </label>
    <input require type="text" id="bairro"> <br>
    <label for="cidade"> Cidade: </label>
    <input readonly require type="text" id="cidade" value="${cidade}"> <br>
    <label for="uf"> Estado: </label>
    <input readonly require type="text" id="uf" value="${uf}"> <br>
        
    `;
    }
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => validaCEP(cep.value))
