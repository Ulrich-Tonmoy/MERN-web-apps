import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send("Server Online");
});

app.get("/board", (req, res) => {
    const board_data = {
        tasks: {
            "task-1": { id: "task-1", content: "Game" },
            "task-2": { id: "task-2", content: "Web" },
            "task-3": { id: "task-3", content: "Ai" },
        },
        columns: {
            "column-1": {
                id: "column-1",
                title: "Todo",
                taskIds: ["task-1", "task-2"],
            },
            "column-2": {
                id: "column-2",
                title: "Todo",
                taskIds: ["task-3"],
            },
        },
        columnOrder: ["column-1", "column-2"],
    };
    res.send({ board: board_data });
});

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
