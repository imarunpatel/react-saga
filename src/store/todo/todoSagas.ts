import { fetchPostsFailure } from "../post/postsSlice";
import { Todo, fetchTodosRequest, fetchTodosSuccess } from "./todosSlice";
import { call, put, takeEvery, all } from 'redux-saga/effects';

const api  = {
    fetchDodos: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    },
}

function* fetchTodos() {
    try {
      const response: Todo[] = yield call(api.fetchDodos);
      yield put(fetchTodosSuccess(response));
    } catch (error: any) {
      yield put(fetchPostsFailure(error.message));
    }
  }

  function* watchFetchTodos() {
    yield takeEvery(fetchTodosRequest.type, fetchTodos);
}

export default function* todoSagas() {
    yield all([
      watchFetchTodos()
    ]);
}