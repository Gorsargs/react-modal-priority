import React, { JSXElementConstructor } from 'react';
import { Modal, ComponentPropsType, ModalParams } from '@/core/Modal';

export type ModalId = string;

export interface IModalManager {
  showModal<T extends ComponentPropsType>(modal: ModalParams<T>): void;
  closeModal(modalId: string): void;
  getModals(): Modal[];
  deleteIntervalModal(modalId: ModalId): void;
}

export class ModalManager implements IModalManager {
  private _modals: Modal[] = [];
  protected modalsIntervals: { [key: ModalId]: NodeJS.Timeout } = {};
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

  private sortedByPriority = (): Modal[] => {
    return this.modals.sort(this.customSort);
  };

  protected customSort = (modalA: Modal, modalB: Modal): number => {
    return (modalA.priority as number) - (modalB.priority as number);
  };

  protected updateReactState = () => {
    this._setState(this.sortedByPriority());
  };

  getModals = (): Modal[] => {
    return this.modals;
  };

  showModal = <T extends JSXElementConstructor<any>>(newModal: Modal<T>): void => {
    const tempModal = this.modals.find((modal) => modal.id === newModal.id);
    if (tempModal) return;

    if (newModal) {
      this.modals = [...this.modals, new Modal(newModal)];
    }
  };

  deleteIntervalModal = (modalId: string): void => {
    const modal = this.modals.find((modal) => modal.id === modalId);
    if (modal) {
      modal.interval = 0;
      this.closeModal(modalId);
    }
    this.cleanIntervalTimeout(modalId);
  };

  protected changeVisibility = (modal: Modal, isVisible: boolean): void => {
    modal.visible = isVisible;
    this.modals = [...this.modals];
  };

  closeModal = (modalId: string): void => {
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
  };

  protected addIntervalModalBack = (removedIntervalModal: Modal) => {
    //adds modal back to the modals array if it has an interval option
    const timeout = setTimeout(() => {
      this.showModal(removedIntervalModal);
    }, removedIntervalModal.interval);
    this.modalsIntervals[removedIntervalModal.id as string] = timeout;
  };

  protected addIntervalModalBackKeepMounted = (removedIntervalModal: Modal) => {
    const timeout = setTimeout(() => {
      this.changeVisibility(removedIntervalModal, true);
    }, removedIntervalModal.interval);
    this.modalsIntervals[removedIntervalModal.id as string] = timeout;
  };

  protected cleanIntervalTimeout = (modalId: ModalId) => {
    clearTimeout(this.modalsIntervals[modalId]);
    delete this.modalsIntervals[modalId];
  };
}
