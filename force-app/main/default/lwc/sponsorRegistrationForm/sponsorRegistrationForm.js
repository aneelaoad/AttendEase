import { LightningElement, wire, track, api } from 'lwc';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';

export default class SponsorRegistrationForm extends LightningElement {
    showModal = false;
    sponsorProfileImage = '';
    sponsorProfileImageBlob='';

    pageUrl = window.location.origin + '/dubaidreamin/s/';
    // openModal() {
    //     this.showModal = true;
    // }

    // closeModal() {
    //     this.showModal = false;
    // }
    @wire(getDubaiDreaminEventId)
    wiredEventId({ error, data }) {
    if (data) {
        
     
        this.selectedEventId=data;
    } else if (error) {
        console.error('getDubaiDreaminEventId Error:', error);
    }
}

    openModal(event) {
        this.showModal = true;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.showModal = false;
        document.body.style.overflow = 'auto';
    }

}