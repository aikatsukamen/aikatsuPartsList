import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions';
import { Parts } from '../../types/entity';
type Action = ActionType<typeof actions>;

export type GlobalState = {
  /** 通知欄 */
  notify: {
    isOpen: boolean;
    variant: 'info' | 'warning' | 'error';
    message: string;
  };
  list: Parts[];
};

export type RootState = {
  reducer: GlobalState;
};

const initial: GlobalState = {
  // 通知欄
  notify: {
    isOpen: false,
    variant: 'info',
    message: '',
  },
  list: [],
};

const reducer = (state: GlobalState = initial, action: Action): GlobalState => {
  switch (action.type) {
    // 通知
    case getType(actions.changeNotify): {
      return { ...state, notify: { ...action.payload } };
    }
    case getType(actions.closeNotify): {
      return { ...state, notify: { ...initial.notify } };
    }
    case getType(actions.updateList): {
      return { ...state, list: action.payload };
    }
    default:
      return state;
  }
};

export default combineReducers({ reducer });
