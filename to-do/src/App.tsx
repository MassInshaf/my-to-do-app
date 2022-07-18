import React, { FC, ChangeEvent, useState } from "react";
import { Button, Input } from "antd";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <h1>
        <u>Todo-List</u>
      </h1>
      <div className="header">
        <div className="inputContainer">
          <Input
            type="text"
            placeholder="Enter a Todo...."
            name="task"
            value={task}
            onChange={handleChange}
          />
          ;
          <Input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>

        <Button onClick={addTask} type="primary">
          Add Task
        </Button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
