import { Draggable, Droppable } from "react-beautiful-dnd";
import AddTask from "../addTask/AddTask";
import Task from "../task/Task";
import "./Column.css";

export default function Column({ column, tasks, index, board, setBoard }) {
    const deleteColumn = (columnId, index) => {
        if (window.confirm("Do you want to delete this Column?")) {
            const columnTask = board.columns[columnId].taskIds;
            const finalTask = columnTask.reduce((previousValue, currentValue) => {
                const { [currentValue]: oldTask, ...newTasks } = previousValue;
                return newTasks;
            }, board.tasks);

            const columns = board.columns;
            const { [columnId]: oldColumn, ...newColumns } = columns;

            const newColumnOrder = Array.from(board.columnOrder);
            newColumnOrder.splice(index, 1);

            setBoard({
                tasks: finalTask,
                columns: {
                    ...newColumns,
                },
                columnOrder: newColumnOrder,
            });
        }
    };

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div
                    className="column__container"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <h3 className="column__title" {...provided.dragHandleProps}>
                        {column.title} <span onClick={() => deleteColumn(column.id, index)}>x</span>
                    </h3>
                    <Droppable droppableId={column.id} type="task">
                        {(provided) => (
                            <div
                                className="column__task-list"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tasks.map((task, index) => (
                                    <Task
                                        key={task.id}
                                        task={task}
                                        index={index}
                                        columnId={column.id}
                                        board={board}
                                        setBoard={setBoard}
                                    />
                                ))}
                                {provided.placeholder}
                                <AddTask board={board} setBoard={setBoard} columnId={column.id} />
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}
