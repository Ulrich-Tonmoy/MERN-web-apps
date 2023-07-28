import { Draggable } from "react-beautiful-dnd";
import "./Task.css";

export default function Task({ task, index, board, setBoard, columnId }) {
    const deleteTask = (columnId, index, taskId) => {
        if (window.confirm("Do you want to delete this Task?")) {
            const column = board.columns[columnId];
            const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(index, 1);

            const tasks = board.tasks;
            const { [taskId]: oldTask, ...newTasks } = tasks;

            setBoard({
                ...board,
                tasks: {
                    ...newTasks,
                },
                columns: {
                    ...board.columns,
                    [columnId]: {
                        ...column,
                        taskIds: newTaskIds,
                    },
                },
            });
        }
    };
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    className="task__container"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                    <span onClick={() => deleteTask(columnId, index, task.id)}> x</span>
                </div>
            )}
        </Draggable>
    );
}
