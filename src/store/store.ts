import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ACTIONS, ActionTypes } from './actions';
import { Todo, Store } from './types';

// Standard interface and functions
const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Redux implementation
function todoReducer(state: Store = {
  todos: [],
  newTodo: "",
}, action: ActionTypes) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        newTodo: '',
        todos: addTodo(state.todos, state.newTodo),
      };
    case ACTIONS.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: removeTodo(state.todos, action.payload),
      };
    case ACTIONS.SET_NEWTODO:
      return {
        ...state,
        newTodo: action.payload,
      };
    case ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: updateTodo(state.todos, action.payload.id, action.payload.text),
      };
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: toggleTodo(state.todos, action.payload),
      };
    default: 
      return state;
  }
}

const store = createStore(todoReducer, applyMiddleware(thunk));

export default store;