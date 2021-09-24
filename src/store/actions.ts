import { Action, Store } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Todo } from './types';

export enum ACTIONS {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
  UPDATE_TODO = "UPDATE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  SET_NEWTODO = "SET_TNEWODO",
  SET_TODOS = "SET_TODOS",
}

export type ActionTypes = 
  | { type: typeof ACTIONS.ADD_TODO; }
  | { type: typeof ACTIONS.SET_TODOS; payload: Todo[] }
  | { type: typeof ACTIONS.DELETE_TODO; payload: number; }
  | {
    type: typeof ACTIONS.UPDATE_TODO;
    payload: {
      id: number;
      text: string;
    };
  }
  | { type: typeof ACTIONS.TOGGLE_TODO; payload: number }
  | { type: typeof ACTIONS.SET_NEWTODO; payload: string };

export const addTodo = (): ActionTypes => ({ type: ACTIONS.ADD_TODO });

export const deleteTodo = (id: number): ActionTypes => ({ 
  type: ACTIONS.DELETE_TODO, 
  payload: id,
});

export const updateTodo = (id: number, text: string): ActionTypes => ({ 
  type: ACTIONS.UPDATE_TODO, 
  payload: {
    id,
    text,
  } 
});

export const toggleTodo = (id: number): ActionTypes => ({ 
  type: ACTIONS.TOGGLE_TODO, 
  payload: id,
});

export const setNewTodo = (text: string): ActionTypes => ({ 
  type: ACTIONS.SET_NEWTODO, 
  payload: text,
});

export const setTodo = (todos: Todo[]): ActionTypes => ({ 
  type: ACTIONS.SET_TODOS, 
  payload: todos,
});

export const setTodos = (todos: Todo[]): ActionTypes => ({
  type: ACTIONS.SET_TODOS,
  payload: todos,
})

export const getTodos = (
  url: string,
): ThunkAction<void, Store, unknown, Action<string>> => async (dispatch) => {
  const resp = await fetch(url);
  const todos: Todo[] = await resp.json();
  dispatch(setTodos(todos));
}

