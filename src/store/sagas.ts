import { all } from "redux-saga/effects";
import postSaga from "./post/postSagas";
import todoSagas from "./todo/todoSagas";

export default function* rootSaga() {
    yield all([
        postSaga(),
        todoSagas(),
    ])
}