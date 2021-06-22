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
        node.appendChild(textoNode);
        node.appendChild(criaBotaoDeletar());
        return node;
    };

    //função que insere um node <li> formado no ul da página
    function insereNode(node) {
        document.querySelector(`.lstTarefas`).appendChild(node);
    };

    function main() {
        //Função que, ao se clicar no botão de inserir tarefa, cria um novo item na lista de tarefas
        document.querySelector(`.btnInsereTarefa`).addEventListener(`click`, function() {
            insereNode(criaNode(pegaTexto()));
        });

        //função que apaga o li quando seu botão de deletar é clicado
        document.addEventListener(`click`, function(e) {
            if (e.target.classList.contains(`deletar`)) {
                e.target.parentElement.remove();
            }
        });
    }; 
    main();
};
escopo();