import "./AddTask.css";
import { useState } from "react";

export default function AddTask({ columnId, board, setBoard }) {
    const [showNewTaskButton, setShowNewTaskButton] = useState(true);
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        setShowNewTaskButton(true);
        addNewTask(columnId, value);
        setValue("");
    };

    const addNewTask = (columnId, content) => {
        const newTaskId = "task-" + Math.floor(Math.random() * 10000);
        const column = board.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.push(newTaskId);

        const newTask = {
            id: newTaskId,
            content: content,
        };

        setBoard({
            ...board,
            tasks: {
                ...board.tasks,
                [newTaskId]: newTask,
            },
            columns: {
                ...board.columns,
                [columnId]: {
                    ...board.columns[columnId],
                    taskIds: newTaskIds,
                },
            },
        });
    };

    return (
        <div>
            {showNewTaskButton ? (
                <button onClick={() => setShowNewTaskButton(false)}>New Task</button>
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSubmit}
                />
            )}
        </div>
    );
}
