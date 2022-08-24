import {useContext, useEffect, useRef, useMemo} from 'react';
import { ShowFn } from './types';

import {ShowModalContext} from './modal-context';
import { uid } from './utils';

export interface UseModalOptions {
  disableAutoDestroy?: boolean;
}

const defaultOptions: UseModalOptions = {
  disableAutoDestroy: false,
};

export default function useModal(options: UseModalOptions = defaultOptions) {
  const { disableAutoDestroy } = { ...defaultOptions, ...options };
  const {
    showModal,
    destroyModalsByRootId: destroy
  } = useContext(ShowModalContext);
  const id = useRef<string>(uid(6));

  useEffect(
    () => () => {
      if (!disableAutoDestroy) {
        destroy(id.current);
      }
    },
    [disableAutoDestroy, destroy]
  );

  return useMemo<{showModal: ShowFn}>(() => ({
    showModal: (component, props, options) => showModal(component, props, {rootId: id.current, ...options})
  }), [showModal]);
}
