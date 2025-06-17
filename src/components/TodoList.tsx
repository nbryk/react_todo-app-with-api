import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface PropsTodoList {
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

export const TodoList = ({
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
}: PropsTodoList) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          deletingTodoIds={deletingTodoIds}
          togglingTodoIds={togglingTodoIds}
          renamingTodoIds={renamingTodoIds}
          editingTodoId={editingTodoId}
          handleRenameTodo={handleRenameTodo}
          setEditingTodoId={setEditingTodoId}
          handleDeleteTodo={handleDeleteTodo}
        />
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
