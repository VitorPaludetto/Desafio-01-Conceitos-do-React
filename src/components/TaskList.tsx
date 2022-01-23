import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

// Aparentemente o problema desse arquivo é a definição do randomID, que pode limitar o número de tasks criadas
// Buscar novas soluções para este problema

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle) { // Checa se o titulo não está vazio
      const randomId = Math.floor(Math.random() * (500 - 1)) + 1; // Gera um numero aleatorio entre 0 e 1 (não incluso)
      setTasks([...tasks, {id: randomId, title: newTaskTitle, isComplete: false}]); // Dá um set em tasks passando as tarefas que já existiam e adicionando nova
      setNewTaskTitle('') // "Apaga" o input para podermos inserir uma nova task
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    setTasks((tasks) => tasks.map(task => { // Faz um map nas nossas tasks e, se o id passado como param for igual ao ID da task, dá um toggle em isComplete
      if (task.id === id) {
        task.isComplete = !task.isComplete
      }
      return task
    }))
  }
  
  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    setTasks((tasks) => tasks.filter(task => task.id !== id)) // Não adiciona ao state a task que tiver o ID igual ao passado por param
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}