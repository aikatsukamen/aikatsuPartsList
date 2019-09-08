import { call, put, takeEvery } from 'redux-saga/effects';
import queryString from 'query-string';
import fetchJsonp from 'fetch-jsonp';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { Parts } from '../../types/entity';

export default function* rootSaga() {
  // yield takeEvery(getType(actions.changeNotify), fetchCordiByAllRanking);
  yield call(fetchListAndApplyState);
  yield call(createManifest);
}

function* fetchListAndApplyState() {
  try {
    yield put(actions.changeNotify(true, 'info', 'データ取得中'));

    const result = yield call(fetchList);
    yield put(actions.updateList(result));

    yield put(actions.closeNotify());
  } catch (error) {
    yield put(actions.changeNotify(true, 'error', 'データ取得でエラーが発生しました'));
    console.error(error);
  }
}

const fetchList = async () => {
  try {
    const query: {
      qr?: string;
      request?: string;
    } = queryString.parse(location.search);

    let data: Parts[] = [];

    if (query.request === '1') {
      const result = await fetchListFromGAS(query.qr);
      if (result.error) throw result.error;
      data = result.data;
    } else {
      const result = await fetch('./list.json');
      data = await result.json();
    }

    return data;
  } catch (error) {
    throw error;
  }
};

function fetchListFromGAS(qr?: string): Promise<{ data: Parts[]; error?: any }> {
  return new Promise((resolve, reject) => {
    let url = `https://script.google.com/macros/s/AKfycbxqkW2JY0dbmlikokIUnN59UMXqR2ICh0Z9ApVe8YmFPxHPrNA/exec`;
    if (qr) url += `?qr=1`;
    fetchJsonp(url, {
      jsonpCallback: 'callback',
    })
      .then(response => {
        return response.json();
      })
      .then((json: Parts[]) => {
        resolve({ data: json });
      })
      .catch(error => {
        resolve({ data: [], error });
      });
  });
}

const createManifest = () => {
  const url = window.location.href;

  const manifest = {
    name: 'アイカツ！パーツリスト',
    short_name: 'パーツリスト',
    theme_color: '#2196f3',
    background_color: '#2196f3',
    display: 'standalone',
    start_url: url,
    icons: [
      {
        src: 'icon.png',
        type: 'image/png',
        sizes: '192x192',
      },
    ],
  };

  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], { type: 'application/json' });
  const manifestURL = URL.createObjectURL(blob);
  (document.querySelector('#my-manifest') as any).setAttribute('href', manifestURL);

  // Service Worker登録
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(registration => {
        console.log('serviceWorker registed.');
      })
      .catch(error => {
        console.warn('serviceWorker error.', error);
      });
  }
};
