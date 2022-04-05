import { createContext } from 'react';
import { initialState } from './reducer';
import {
  State,
  HideFn,
  ShowFn,
  DestroyFn,
  DestroyByRootIdFn,
  UpdateFn,
} from './types';

export type ModalContextState = {
  state: State;
  updateModal: UpdateFn;
  hideModal: HideFn;
  destroyModal: DestroyFn;
};

export const initialContextState = {
  state: initialState,
  hideModal: () => {},
  destroyModal: () => {},
  updateModal: () => {},
};

export type ShowModalContextState = {
  showModal: ShowFn;
  destroyModalsByRootId: DestroyByRootIdFn;
}

export const initialShowContextState = {
  showModal: () => ({
    id: 'id',
    hide: () => {},
    destroy: () => {},
    update: () => {},
  }),
  destroyModalsByRootId: () => {},
};


const ModalContext = createContext<ModalContextState>(initialContextState);
export const ShowModalContext = createContext<ShowModalContextState>(initialShowContextState);

export default ModalContext;
