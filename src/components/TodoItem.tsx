import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useState } from 'react';

interface PropsTodoItem {
  todo: Todo;
  handleToggleTodo: (todo: Todo) => void;
  deletingTodoIds: number[];
  togglingTodoIds: number[];
  renamingTodoIds: number[];
  editingTodoId: number | null;
  handleRenameTodo: (todo: Todo, newTitle: string) => void;
  setEditingTodoId: (id: number | null) => void;
  handleDeleteTodo: (id: number) => void;
  isTemp?: boolean;
}

export const TodoItem = ({
  todo,
  handleToggleTodo,
  deletingTodoIds,
  togglingTodoIds,
  renamingTodoIds,
  editingTodoId,
  handleRenameTodo,
  setEditingTodoId,
  handleDeleteTodo,
  isTemp,
}: PropsTodoItem) => {
  const [editedTitle, setEditedTitle] = useState('');

  return (
    <div
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
            isTemp ||
            deletingTodoIds.includes(todo.id) ||
            togglingTodoIds.includes(todo.id) ||
            renamingTodoIds.includes(todo.id)
          }
        />
      </label>

      {editingTodoId === todo.id && !isTemp ? (
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
            if (!isTemp) {
              setEditingTodoId(todo.id);
              setEditedTitle(todo.title);
            }
          }}
        >
          {todo.title}
        </span>
      )}

      {editingTodoId !== todo.id && !isTemp && (
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

      {(deletingTodoIds.includes(todo.id) ||
        togglingTodoIds.includes(todo.id) ||
        renamingTodoIds.includes(todo.id) ||
        isTemp) && (
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
  );
};
