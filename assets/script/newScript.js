(function() {
    class Task { //abstração da tarefa
        constructor(txt, lined) {
            this.text = txt; //recebe o texto da tarefa
            this.lined = lined; //se está riscada ou não
        };

        static createDeleteBtn() { //cria e retorna um botão de deletar
            const btnDel = document.createElement(`input`);
            btnDel.setAttribute(`type`, `button`);
            btnDel.setAttribute(`value`, `Deletar`);
            btnDel.classList.add(`deletar`, `botao`);
            return btnDel
        }

        createChkBox() { //cria e retorna um checkbox de "riscar", já marcado se o objeto estiver riscado
            const chkBox = document.createElement(`input`);
            chkBox.setAttribute(`type`, `checkbox`);
            chkBox.classList.add(`riscar`);
            if(this.lined) chkBox.setAttribute(`checked`, true);
            return chkBox;
        }

        createNode() { //cria e retorna um node com o texto do objeto, o checkbox e o botão de deletar e a classe "riscado" se for o caso
            const liNode = document.createElement(`li`);
            liNode.appendChild(this.createChkBox());
            liNode.appendChild(document.createTextNode(this.text));
            liNode.appendChild(Task.createDeleteBtn());
            liNode.classList.add(`item`);
            if(this.lined) liNode.classList.add(`riscado`);
            return liNode;
        };

        addToList() { //chama a criação de node e adiciona ele ao final da ul
            const node = this.createNode();
            document.querySelector(`.lstTarefas`).appendChild(node);
        };
    };

    class TaskList { //abstração da lista de tarefas
        static listTasks() { //seleciona todos os "itens" da lista e retorna um array com o innerText deles e se estão riscados
            const tasks = document.querySelectorAll(`.item`);
            const taskarray = [];
            for(let task of tasks) {
                taskarray.push({text: task.innerText, lined: task.classList.contains(`riscado`)});
            };
            return taskarray;
        };

        static updateStorage() { //chama a listagem de tarefas e joga a lista no LocalStorage
            const taskList = JSON.stringify(TaskList.listTasks()); 
            localStorage.setItem(`taskList`, taskList);
        };

        static bringStorage() { //puxa e converte o LocalStorage e adiciona todos os itens à lista
            const taskList = JSON.parse(localStorage.getItem(`taskList`)); 
            for(let item of taskList) {
                const task = new Task(item.text, item.lined);
                task.addToList();
            };
        };
    };

    (function main() {
        TaskList.bringStorage(); //busca as tarefas no LocalStorage e cria os itens

        document.querySelector(`.formulario`).addEventListener(`submit`, (e) => { //EventListener do submit
            e.preventDefault(); //impede o reload da página
            const txtTarefa = document.querySelector(`.txtTarefa`).value; 
            if (!txtTarefa) { //checa se o campo de tarefa não está vazio
                window.alert(`Insira uma tarefa`);
            } else {
                const task = new Task(document.querySelector(`.txtTarefa`).value, false); //cria o objeto da classe Task com o texto da tarefa
                task.addToList(); //adiciona à lista
                TaskList.updateStorage(); //atualiza o LocalStorage
            };
        });

        document.querySelector(`.lstTarefas`).addEventListener(`click`, (e) => { //EventListener pra click no formulário, necessário para captar a remoção ou "riscagem" dos itens
            const node = e.target;
            if(node.classList.contains(`deletar`)) { //checa se o elemento clicado é um botao de deletar
                node.parentElement.remove(); //deleta o parentElement do botão clicaco
                TaskList.updateStorage(); //atualiza o LocalStorage

            } else if(node.classList.contains(`riscar`)) { //checa se o elemento clicado é um checkbox de riscar
                
                //se o elemento clicado tiver a classe riscado, o clique remove, se não tiver, adiciona
                if(node.parentElement.classList.contains(`riscado`)) { 
                    node.parentElement.classList.remove(`riscado`);
                } else {
                    node.parentElement.classList.add(`riscado`);
                }
                TaskList.updateStorage(); //atualiza o LocalStorage
            };
        })
    })();
})();