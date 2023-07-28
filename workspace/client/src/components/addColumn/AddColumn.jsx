import "./AddColumn.css";
import { useState } from "react";

export default function AddColumn({ board, setBoard }) {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true);
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        setShowNewColumnButton(true);
        addNewColumn(value);
        setValue("");
    };

    const addNewColumn = (title) => {
        const newColumnOrder = Array.from(board.columnOrder);
        const newColumnId = "column-" + Math.floor(Math.random() * 10000);
        newColumnOrder.push(newColumnId);

        const newColumn = {
            id: newColumnId,
            title: title,
            taskIds: [],
        };

        setBoard({
            ...board,
            columns: {
                ...board.columns,
                [newColumnId]: newColumn,
            },
            columnOrder: newColumnOrder,
        });
    };

    return (
        <div>
            {showNewColumnButton ? (
                <button onClick={() => setShowNewColumnButton(false)}>New Column</button>
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
