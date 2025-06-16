import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useState } from 'react';

interface PropsTodoListSection {
  todos: Todo[];
  deletingTodoIds: number[];
  togglingTodoIds: number[];
  tempTodo: Todo | null;
  handleDeleteTodo: (id: number) => void;
  handleToggleTodo: (todo: Todo) => void;
  editingTodoId: number | null;
  setEditingTodoId: (id: number | null) => void;
  handleRenameTodo: (todo: Todo, newTitle: string) => void;
  renamingTodoIds: number[];
}

export const TodoListSection = ({
  todos,
  deletingTodoIds,
  togglingTodoIds,
  tempTodo,
  handleDeleteTodo,
  handleToggleTodo,
  editingTodoId,
  setEditingTodoId,
  handleRenameTodo,
  renamingTodoIds,
}: PropsTodoListSection) => {
  const [editedTitle, setEditedTitle] = useState('');

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              aria-label="Toggle todo completion"
              onChange={() => handleToggleTodo(todo)}
              disabled={
                deletingTodoIds.includes(todo.id) ||
                togglingTodoIds.includes(todo.id) ||
                renamingTodoIds.includes(todo.id)
              }
            />
          </label>

          {editingTodoId === todo.id ? (
            <form
              onSubmit={event => {
                event.preventDefault();
                handleRenameTodo(todo, editedTitle.trim());
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editedTitle}
                onChange={event => setEditedTitle(event.target.value)}
                onBlur={() => handleRenameTodo(todo, editedTitle.trim())}
                onKeyUp={event => {
                  if (event.key === 'Escape') {
                    setEditingTodoId(null);
                    setEditedTitle(todo.title);
                  }
                }}
                autoFocus
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditingTodoId(todo.id);
                setEditedTitle(todo.title);
              }}
            >
              {todo.title}
            </span>
          )}

          {editingTodoId !== todo.id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={
                deletingTodoIds.includes(todo.id) ||
                togglingTodoIds.includes(todo.id) ||
                renamingTodoIds.includes(todo.id)
              }
            >
              ×
            </button>
          )}

          {deletingTodoIds.includes(todo.id) && (
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}
          {togglingTodoIds.includes(todo.id) && (
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}
          {renamingTodoIds.includes(todo.id) && (
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {tempTodo && (
        <div key="temp" data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={tempTodo.completed}
              aria-label="Toggle todo completion"
              disabled
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            disabled
          >
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
