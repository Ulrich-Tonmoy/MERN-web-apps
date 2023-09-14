import PlusIcon from "@icons/PlusIcon";
import { List, Id, Task, Priority } from "@utils/types";
import { useMemo, useState } from "react";
import ListContainer from "./ListContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const KanbanBoard = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [activeList, setActiveList] = useState<List | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const listsId = useMemo(() => lists.map((list) => list.id), [lists]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const createList = () => {
    const listToAdd: List = {
      id: crypto.randomUUID(),
      title: `List ${lists.length + 1}`,
      count: 0,
    };

    setLists([...lists, listToAdd]);
  };

  const deleteList = (id: Id) => {
    const filteredCol = lists.filter((list) => list.id !== id);
    setLists(filteredCol);

    const filteredTask = tasks.filter((task) => task.listId !== id);
    setTasks(filteredTask);
  };

  const updateList = (id: Id, title: string) => {
    const updatedList = lists.map((list) => {
      if (list.id !== id) return list;
      return { ...list, title };
    });
    setLists(updatedList);
  };

  const createTask = (listId: Id) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      listId,
      priority: Priority.None,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);

    const updateList = lists.filter((list) => list.id === listId)[0];
    updateList.count++;
    setLists(lists);
  };

  const deleteTask = (id: Id, listId: Id) => {
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);

    const updateList = lists.filter((list) => list.id === listId)[0];
    updateList.count--;
    setLists(lists);
  };

  const updateTask = (id: Id, content: string, priority: Priority) => {
    const updatedTask = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content, priority };
    });

    setTasks(updatedTask);
  };

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "List") {
      setActiveList(e.active.data.current.list);
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id === over.id) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    const activeIndex = tasks.findIndex((task) => task.id === active.id);
    const overIndex = tasks.findIndex((task) => task.id === over.id);
    if (isActiveTask && isOverTask) {
      setTasks((task) => {
        tasks[activeIndex].listId = tasks[overIndex].listId;
        return arrayMove(task, activeIndex, overIndex);
      });
    }

    if (isActiveTask && !isOverTask) {
      setTasks((task) => {
        lists.filter((list) => list.id === tasks[activeIndex].listId)[0]
          .count--;
        tasks[activeIndex].listId = over.id;
        lists.filter((list) => list.id === over.id)[0].count++;
        setLists(lists);
        return arrayMove(task, activeIndex, activeIndex);
      });
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveList(null);
    setActiveTask(null);

    const { active, over } = e;

    if (!over) return;

    if (active.id === over.id) return;

    setLists((prev) => {
      const activeIndex = lists.findIndex((list) => list.id === active.id);
      const overIndex = lists.findIndex((list) => list.id === over.id);

      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  return (
    <>
      <button
        onClick={() => createList()}
        className="h-[40px] w-[105px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-listBackgroundColor p-1 ring-rose-500 hover:ring-2 flex gap-2 absolute top-5 right-5 stroke-gray-500 hover:stroke-white"
      >
        <PlusIcon /> Add List
      </button>
      <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={listsId}>
                {lists.map((list: List, i: number) => (
                  <ListContainer
                    key={i}
                    list={list}
                    deleteList={deleteList}
                    updateList={updateList}
                    tasks={tasks.filter((task) => task.listId === list.id)}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeList && (
                <ListContainer
                  list={activeList}
                  deleteList={deleteList}
                  updateList={updateList}
                  tasks={tasks.filter((task) => task.listId === activeList.id)}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </div>
    </>
  );
};

export default KanbanBoard;
