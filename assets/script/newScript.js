(function() {
    class Task {
        constructor(txt) {
            this.text = txt;
        };

        static createDeleteBtn() {
            const btnDel = document.createElement(`input`);
            btnDel.setAttribute(`type`, `button`);
            btnDel.setAttribute(`value`, `Deletar`);
            btnDel.classList.add(`deletar`, `botao`);
            return btnDel
        }

        static createChkBox() {
            const chkBox = document.createElement(`input`);
            chkBox.setAttribute(`type`, `checkbox`);
            chkBox.classList.add(`riscar`);
            return chkBox;
        }

        createNode() {
            const liNode = document.createElement(`li`);
            liNode.appendChild(Task.createChkBox());
            liNode.appendChild(document.createTextNode(this.text));
            liNode.appendChild(Task.createDeleteBtn());
            liNode.classList.add(`item`);
            return liNode;
        };

        addToList() {
            const node = this.createNode();
            document.querySelector(`.lstTarefas`).appendChild(node);
        };
    };

    class TaskList {
        static listTasks() {
            const tasks = document.querySelectorAll(`.item`);
            const taskarray = [];
            for(let task of tasks) {
                taskarray.push(task.innerText);
            };
            return taskarray;
        };

        static updateStorage() {
            const taskList = JSON.stringify(TaskList.listTasks()); 
            localStorage.setItem(`taskList`, taskList);
        };

        static bringStorage() {
            const taskList = JSON.parse(localStorage.getItem(`taskList`)); 
            for(let item of taskList) {
                const task = new Task(item);
                task.addToList();
            };
        };
    };

    (function main() {
        TaskList.bringStorage();

        document.querySelector(`.formulario`).addEventListener(`submit`, (e) => {
            e.preventDefault();
            const txtTarefa = document.querySelector(`.txtTarefa`).value;
            if (!txtTarefa) {
                window.alert(`Insira uma tarefa`);
            } else {
                const task = new Task(document.querySelector(`.txtTarefa`).value);
                task.addToList();
                TaskList.updateStorage();
            };
        });

        document.querySelector(`.lstTarefas`).addEventListener(`click`, (e) => {
            const node = e.target;
            if(node.classList.contains(`deletar`)) {
                node.parentElement.remove();
                TaskList.updateStorage();

            } else if(node.classList.contains(`riscar`)) {
                
                if(node.parentElement.classList.contains(`riscado`)) {
                    node.parentElement.classList.remove(`riscado`);
                } else {
                    node.parentElement.classList.add(`riscado`);
                }
            };
        })
    })();
})();