import { useCallback, useRef, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../packages/utils/local-storage.utils";
import Input from "../../ui/inputs/Input";
import Button from "../../ui/buttons/Button";

interface TodoType {
  id: number;
  value: string;
}

const STORAGE_KEY = "todoList";

const TodoAppUsingLocalStorage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [todoList, setTodoList] = useState<TodoType[]>(
    () => getLocalStorageItem(STORAGE_KEY, []) ?? [],
  );

  const addTodo = useCallback(() => {
    const value = inputRef.current?.value?.trim();
    if (!value) return;

    const newTodo: TodoType = {
      id: Date.now(),
      value,
    };

    const updatedList = [...todoList, newTodo];
    setTodoList(updatedList);
    setLocalStorageItem(STORAGE_KEY, updatedList);

    if (inputRef.current) inputRef.current.value = "";
  }, [todoList]);

  const removeTodo = useCallback(
    (id: number) => {
      const updatedList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedList);
      setLocalStorageItem(STORAGE_KEY, updatedList);
    },
    [todoList],
  );

  return (
    <div className="container-md">
      <div className="card todo-card">
        {/* HEADER */}
        <div className="header-nav">
          <h3 className="header-title text-center">Todo App (Local Storage)</h3>
        </div>

        {/* INPUT */}
        <div className="todo-input-section">
          <Input ref={inputRef} placeholder="Enter a task..." />
          <Button label="Add Todo" onClick={addTodo} />
        </div>

        {/* LIST */}
        <div className="todo-list-wrapper">
          {todoList.length === 0 ? (
            <p className="empty-state">No todos yet 🚀</p>
          ) : (
            todoList.map((item) => (
              <div key={item.id} className="todo-item">
                <span className="todo-text">{item.value}</span>
                <span className="delete-btn" onClick={() => removeTodo(item.id)}>
                  ✕
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoAppUsingLocalStorage;
