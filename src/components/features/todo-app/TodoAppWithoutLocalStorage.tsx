import { useRef, useState, useCallback } from "react";
import Button from "../../ui/buttons/Button";
import Input from "../../ui/inputs/Input";

interface todoType {
  id: number;
  value: string;
}

const TodoAppWithoutLocalStorage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [todoList, setTodoList] = useState<todoType[]>([]);

  const addTodo = useCallback(() => {
    const value = inputRef?.current?.value?.trim();
    if (!value) return;

    const newTodo: todoType = {
      id: Date.now(), // unique ID using timestamp
      value,
    };

    setTodoList((prev) => [...prev, newTodo]);
    if (inputRef.current) inputRef.current.value = ""; // clear input
  }, []);

  const removeTodo = useCallback(
    (id: number) => {
      const newList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newList);
    },
    [todoList],
  );

  return (
    <div className="container-md">
      <div className="card todo-card">
        {/* HEADER */}
        <div className="header-nav">
          <h3 className="header-title text-center">Todo App (Without Local Storage)</h3>
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

export default TodoAppWithoutLocalStorage;
