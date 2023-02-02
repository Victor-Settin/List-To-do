import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBookOpen } from "@fortawesome/fontawesome-free-solid";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const addTask = (event) => {
        event.preventDefault();
        if (input.trim().length === 0) {
            setError(true);
            return;
        }
        setTodos([...todos, { text: input, checked: false }]);
        setInput("");
        setError(false);
    };

    const removeList = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const toggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, checked: !todo.checked } : todo
            )
        );
    };

    return (
        <div className="todo-container">
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Adicionar tarefa"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className={error ? "error" : ""}
                />
                <button type="submit">Adicionar</button>
            </form>
            {todos.length === 0 ? (
                <p>
                    Não há tarefas na lista
                    <FontAwesomeIcon icon={faBookOpen} />
                </p>
            ) : (
                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className={
                                todo.checked ? "checked" : `${"row-" + index}`
                            }
                        >
                            <div className="side_left">
                                <input
                                    type="checkbox"
                                    checked={todo.checked}
                                    onChange={() => toggleTodo(index)}
                                />
                                <span className="todo-text">{todo.text}</span>
                            </div>
                            <div
                                className="removeList"
                                onClick={() => removeList(index)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ToDoList;
