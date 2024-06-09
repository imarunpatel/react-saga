// src/sagas.ts
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  editPostRequest,
  editPostSuccess,
  deletePostRequest,
  deletePostSuccess,
  Post,
} from './postsSlice';

// Mock API functions (replace with real API calls)
const api = {
  fetchPosts: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  editPost: (post: Post) => fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()),
  deletePost: (postId: number) => fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  }).then(res => res.json())
};

function* fetchPosts() {
  try {
    const response: Post[] = yield call(api.fetchPosts);
    yield put(fetchPostsSuccess(response));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* editPost(action: ReturnType<typeof editPostRequest>) {
    console.log('edit post')
  try {
    const response: Post = yield call(api.editPost, action.payload);
    yield put(editPostSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

function* deletePost(action: ReturnType<typeof deletePostRequest>) {
  try {
    yield call(api.deletePost, action.payload);
    yield put(deletePostSuccess(action.payload));
  } catch (error) {
    console.error(error);
  }
}

function* watchFetchPosts() {
    console.log('watch fetch')
  yield takeEvery(fetchPostsRequest.type, fetchPosts);
}

function* watchEditPost() {
    console.log('watch edit')
  yield takeEvery(editPostRequest.type, editPost);
}

function* watchDeletePost() {
  yield takeEvery(deletePostRequest.type, deletePost);
}

export default function* postSaga() {
  yield all([
    watchFetchPosts(),
    watchEditPost(),
    watchDeletePost(),
  ]);
}
