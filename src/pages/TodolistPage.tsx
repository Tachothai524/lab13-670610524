import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState,useEffect } from "react";

const STORAGE_KEY = "lab13.tasks";

function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  const handleAdd = (newTask: TaskCardProps) => {
    // console.log("TODO handleAdd", newTask);
    setTasks([...tasks,newTask]);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (taskId: string) => {
    // console.log("TODO deleteTask", taskId);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    // console.log("TODO toggleDoneTask", taskId);
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t)),
    );
  };

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <div className="container px-4 text-center">
            <div className="row gap-4">
            <div className="col">
              <div className="fs-5">All : [
                <span className="fs-5 text-primary">{tasks.length}</span>
              ]
              </div>
            </div>
            <div className="col">
              <div className="fs-5">Done : [
                <span className="fs-5 text-primary">{tasks.filter((t) => t.isDone === true).length}</span> 
              ]
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
