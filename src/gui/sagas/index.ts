import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { Parts } from '../../types/entity';

export default function* rootSaga() {
  // yield takeEvery(getType(actions.changeNotify), fetchCordiByAllRanking);
  yield call(fetchListAndApplyState);
}

function* fetchListAndApplyState() {
  yield put(actions.changeNotify(true, 'info', 'データ取得中'));

  const result = yield call(fetchList);
  yield put(actions.updateList(result));

  yield put(actions.closeNotify());
}

const fetchList = async () => {
  const result = await fetch('./list.json');
  const data: Parts[] = await result.json();

  return data;
};
