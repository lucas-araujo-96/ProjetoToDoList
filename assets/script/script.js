function escopo() {
    //função que busca o texto do campo tarefa
    function pegaTexto() {
        return document.querySelector(`.txtTarefa`).value;
    };

    //função que cria um botao com valor `remover` e classe `deletar`
    function criaBotaoDeletar() {
        let btnDel = document.createElement(`input`);
        btnDel.setAttribute(`type`, `button`);
        btnDel.setAttribute(`value`, `remover`);
        btnDel.classList.add(`deletar`);
        return btnDel;
    };

    //função que gera um node li com o texto do campo de tarefas e um botão de remover
    function criaNode(texto) {
        let node = document.createElement(`li`);
        let textoNode = document.createTextNode(texto);
        node.classList.add(`item`);
        node.appendChild(textoNode);
        node.appendChild(criaBotaoDeletar());
        return node;
    };

    //função que insere um node <li> formado no ul da página
    function insereNode(node) {
        document.querySelector(`.lstTarefas`).appendChild(node);
    };

    //função que atualiza o localStorage
    function atualStorage() {
        let lista = document.querySelectorAll(`.item`);
        let arrLista = [];
        for (let i of lista) {
            arrLista.push(i.innerText);
        };
        arrLista = JSON.stringify(arrLista);
        localStorage.setItem(`listaDeTarefas`, arrLista);
    };

    //função que preenche a lista ao carregar a página
    function puxaStorage() {
        let lista = localStorage.getItem(`listaDeTarefas`);
        lista = JSON.parse(lista);
        for (let i of lista) {
            document.querySelector(`.lstTarefas`).appendChild(criaNode(i));
        };
    };

    function main() {
        //EventListener que, ao se clicar no botão de inserir tarefa, cria um novo item na lista de tarefas
        //e atualiza o localStorage
        document.querySelector(`.btnInsereTarefa`).addEventListener(`click`, function() {
            insereNode(criaNode(pegaTexto()));
            atualStorage();
        });

        //função que apaga o li quando seu botão de deletar é clicado
        //e atualiza o localStorage
        document.addEventListener(`click`, function(e) {
            if (e.target.classList.contains(`deletar`)) {
                e.target.parentElement.remove();
                atualStorage();
            }
        });

        //atualiza a página com o localStorage quando ela é aberta
        puxaStorage();
    }; 
    main();
};
escopo();