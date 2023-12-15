import React, { JSXElementConstructor } from 'react';
import { ComponentPropsType, Modal, ModalParams } from './Modal';

export type ModalId = string;

interface IModalSystem {
  addModal<T extends ComponentPropsType>(modal: ModalParams<T>): void;
  removeModal(modalId: string): void;
  getModals(): Modal[];
  deleteIntervalModal(modalId: ModalId): void;
}

class ModalSystem implements IModalSystem {
  private _modals: Modal[] = [];
  private _setState: React.Dispatch<React.SetStateAction<Modal[]>>;

  constructor(setState: React.Dispatch<React.SetStateAction<Modal[]>>) {
    this._setState = setState;
  }

  private get modals(): Modal[] {
    return this._modals;
  }

  private set modals(modals: Modal[]) {
    this._modals = modals;
    this.updateReactState();
  }

  protected sortByPriority = (): Modal[] => {
    return this.modals.sort((a, b) => a.priority - b.priority);
  };

  protected updateReactState = () => {
    this._setState(this.sortByPriority());
  };

  getModals = (): Modal[] => {
    return this.modals;
  };

  addModal = <T extends JSXElementConstructor<any>>(newModal: Modal<T>): void => {
    const tempModal = this.modals.find((modal) => modal.id === newModal.id);

    if (!tempModal) {
      if (newModal) this.modals = [...this.modals, new Modal<T>(newModal)];
    } else {
      if (tempModal.keepMounted && tempModal.visible == false) {
        this.changeVisibility(tempModal, true);
        this.modals = [...this.modals];
      }
    }
  };

  deleteIntervalModal(modalId: string): void {
    const modal = this.modals.find((modal) => modal.id === modalId);
    if (modal) {
      modal.interval = undefined;
      this.removeModal(modalId);
    }
  }

  protected changeVisibility = (modal: Modal, isVisible: boolean): void => {
    modal.visible = isVisible;
    this.modals = [...this.modals];
  };

  removeModal = (modalId: string): void => {
    const tempModal = this.modals.find((modal) => modal.id === modalId);
    if (!tempModal) return;

    if (tempModal.keepMounted) {
      this.changeVisibility(tempModal, false);
      if (tempModal.interval) {
        this.addIntervalModalBackKeepMounted(tempModal);
      }
      this.modals = [...this.modals];
      return;
    }

    if (tempModal.interval) {
      this.modals = this.modals.filter((modal) => modal.id !== tempModal.id);
      this.addIntervalModalBack(tempModal);
      return;
    }

    this.modals = this.modals.filter((modal) => modal.id !== tempModal.id);
    // const filteredModals = this.modals.filter((modal) => {
    //   if (modal.id !== modalId) {
    //     return true;
    //   } else if (modal.keepMounted) {
    //     this.changeVisibility(modal, false);
    //     if (modal.interval) {
    //       this.addIntervalModalBackKeepMounted(modal);
    //     }
    //     //return true because we need to keep the modal instance in the array
    //     return true;
    //   } else if (modal.interval) {
    //     this.addIntervalModalBack(modal);
    //   }
    // });
    // this.modals = filteredModals;
  };

  protected addIntervalModalBack = (removedIntervalModal: Modal) => {
    //adds modal back to the modals array if it has an interval option
    setTimeout(() => {
      this.addModal(removedIntervalModal);
    }, removedIntervalModal.interval);
  };

  protected addIntervalModalBackKeepMounted = (removedIntervalModal: Modal) => {
    setTimeout(() => {
      this.changeVisibility(removedIntervalModal, true);
    }, removedIntervalModal.interval);
  };
}

export default ModalSystem;
