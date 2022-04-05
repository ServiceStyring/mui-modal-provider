import {useContext, useEffect, useRef, useMemo} from 'react';
import { ShowFn } from './types';

import {ShowModalContext} from './ModalContext';
import { uid } from './utils';

type Options = {
  disableAutoDestroy?: boolean;
};

const defaultOptions: Options = {
  disableAutoDestroy: false,
};

export default function useModal(options: Options = defaultOptions): {showModal: ShowFn} {
  const { disableAutoDestroy } = { ...defaultOptions, ...options };
  const {
    destroyModalsByRootId: destroy,
    showModal
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
