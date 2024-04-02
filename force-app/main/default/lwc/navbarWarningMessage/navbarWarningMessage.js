import { LightningElement, api } from 'lwc';
//import NAVBAR_MISSING_MESSAGE from '@salesforce/label/c.NAVBAR_MISSING_MESSAGE';

    export default class NavbarWarningMessage extends LightningElement {
        @api isNavbarMissing = false;
         warningClass = '';
        //warningMessage =NAVBAR_MISSING_MESSAGE
        connectedCallback() {
            this.warningClass = this.isNavbarMissing ? 'warning' : 'slds-hidden';
        }

        closeWarning() {
            this.warningClass = 'slds-hidden';
        }
    }