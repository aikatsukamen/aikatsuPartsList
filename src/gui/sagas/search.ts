import { put } from 'redux-saga/effects';
import * as actions from '../actions';

export function* fetchCordiByAllRanking() {
  yield put(actions.changeNotify(true, 'info', 'データ取得中'));
  yield put(actions.closeNotify());
}
