import { Modal } from '@/core/Modal';
import { MODAL_FOCUS_CLASSNAME, RMP_MODAL_CONTAINER } from '@/constants/constants';
import { useEffect } from 'react';

const useFocusLastElement = (modals: Modal[]) => {
  useEffect(() => {
    //focus the last modal if modal added or deleted
    const modalsParent = document.getElementById(RMP_MODAL_CONTAINER);
    const children = modalsParent.getElementsByClassName(`${MODAL_FOCUS_CLASSNAME}`);
    const lastElement = children[children.length - 1] as HTMLDivElement;
    if (lastElement) lastElement.focus();
  }, [modals]);
};

export default useFocusLastElement;
