import { LightningElement, api } from 'lwc';
export default class PopupModal extends LightningElement {
@api showModal = false;
    @api modalContentClass;
    get modalClass() {
        return this.showModal ? 'modal-wrapper open' : 'modal-wrapper';
    }

    // get modalContetStyle(){

    //     return modalContentClass;
    // }

    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}