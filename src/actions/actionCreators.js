import ACTION_TYPE from './actionType';
const { SET_EDIT, SET_SEARCH_VALUE, SET_TITLE, SET_TODO_VALUE } = ACTION_TYPE;
export const editAction = (id) => ({ type: SET_EDIT, payload: id });
export const searchAction = (value) => ({ type: SET_SEARCH_VALUE, payload: value });
export const titleAction = (title) => ({ type: SET_TITLE, payload: title });
export const valueTodoAction = (title) => ({ type: SET_TODO_VALUE, payload: title });
