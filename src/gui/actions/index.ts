import { createAction } from 'typesafe-actions';
import { Parts } from '../../types/entity';

const OPEN_NOTIFY = 'OPEN_NOTIFY';
const CLOSE_NOTIFY = 'CLOSE_NOTIFY';
const UPDATE_CORDI_LIST = 'UPDATE_CORDI_LIST';

/** 通知欄表示 */
export const changeNotify = createAction(OPEN_NOTIFY, action => {
  return (isOpen: boolean, variant: 'info' | 'warning' | 'error', message: string) => action({ isOpen, variant, message });
});

/** 通知欄閉じる */
export const closeNotify = createAction(CLOSE_NOTIFY);

export const updateList = createAction(UPDATE_CORDI_LIST, action => {
  return (list: Parts[]) => action(list);
});
