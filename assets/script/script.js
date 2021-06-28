function escopo() {
    //função que busca o texto do campo tarefa
    function pegaTexto() {
        return document.querySelector(`.txtTarefa`).value;
    };

    //função que cria um node botao com valor `remover` e classe `deletar`
    function criaBotaoDeletar() {
        let btnDel = document.createElement(`input`);
        btnDel.setAttribute(`type`, `button`);
        btnDel.setAttribute(`value`, `Remover`);
        btnDel.classList.add(`deletar`);
        btnDel.classList.add(`botao`);
        return btnDel;
    };

    //função que cria um node checkbox com a classe `riscar`
    function criaCheckBox() {
        let cb = document.createElement(`input`);
        cb.setAttribute(`type`, `checkbox`);
        cb.classList.add(`riscar`);
        return cb;
    };

    //função que gera um node li com o texto do campo de tarefas, um botão de remover e um checkbox que "risca" a tarefa
    function criaNode(texto) {
        let node = document.createElement(`li`);
        let textoNode = document.createTextNode(texto);
        let cb = criaCheckBox();
        node.classList.add(`item`);
        node.appendChild(cb);
        node.appendChild(textoNode);
        node.appendChild(criaBotaoDeletar());
        return node;
    };

    //função que checa se o li está riscado e altera uma classe de acordo
    function riscaItem(item) {
        if (!item.classList.contains(`riscado`)) {
            item.classList.add(`riscado`);
        } else {
            item.classList.remove(`riscado`);
        }
        
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

        //EventListener para criar item/atualizar localStorage ao se pressionar enter no campo do form
        document.querySelector(`.formulario`).addEventListener(`submit`, function() {
            insereNode(criaNode(pegaTexto()));
            atualStorage();
        });

        //função que apaga o li quando seu botão de deletar é clicado
        //e atualiza o localStorage
        //e que risca o item ao se clicar na checkbox
        document.addEventListener(`click`, function(e) {
            if (e.target.classList.contains(`deletar`)) {
                e.target.parentElement.remove();
                atualStorage();
            } else if (e.target.classList.contains(`riscar`)) {
                riscaItem(e.target.parentElement);
            }
        });

        //atualiza a página com o localStorage quando ela é aberta
        puxaStorage();
    }; 
    main();
};
escopo();