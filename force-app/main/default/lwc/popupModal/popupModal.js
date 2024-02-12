import { LightningElement, api } from 'lwc';
export default class PopupModal extends LightningElement {
@api showModal = false;

    get modalClass() {
        return this.showModal ? 'modal-wrapper open' : 'modal-wrapper';
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}