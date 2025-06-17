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
        <TodoItem
          key="temp"
          todo={tempTodo}
          handleToggleTodo={() => {}}
          handleDeleteTodo={() => {}}
          handleRenameTodo={() => {}}
          setEditingTodoId={() => {}}
          deletingTodoIds={[]}
          togglingTodoIds={[]}
          renamingTodoIds={[]}
          editingTodoId={null}
          isTemp={true}
        />
      )}
    </section>
  );
};
