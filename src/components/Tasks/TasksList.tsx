import React, { useContext, useEffect } from "react";

// import components
import AddTask from "./AddTask";
import Task from "./Task";

import { TaskContext } from "../../context/TaskContext";
import { TaskContextType, ITask } from "../../context/TaskContext";
import {
  TimerModesContext,
  TimerModesContextType,
} from "../../context/TimerModesContext";

const TasksList = () => {
  const { tasks } = useContext(TaskContext) as TaskContextType;
  const { pomodoroMode } = useContext(
    TimerModesContext
  ) as TimerModesContextType;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <section className={`${pomodoroMode} bg-tasks-list tasks-list`}>
      <div className="container center add-task">
        <div className="tasks-list-title center">Tasks</div>
        <AddTask />
      </div>
      <div className="tasks-grid">
        <div className="top-titles">
          <span className="current">Current task</span>
          <span className="done-planned">Done / To do</span>
        </div>
        {tasks.map((task: ITask) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              task={task.task}
              isDone={task.isDone}
              completedPomosNo={task.completedPomosNo}
              pomosNo={task.pomosNo}
            ></Task>
          );
        })}
      </div>
    </section>
  );
};

export default TasksList;
