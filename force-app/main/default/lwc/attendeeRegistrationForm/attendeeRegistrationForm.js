import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import registerAttendee from '@salesforce/apex/AttendeeRegistrationController.registerAttendee';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";

export default class AttendeeRegistrationForm extends LightningElement {
    @track isModalOpen = false;
    @track contactRecord = {};
    selectEventId;


    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.resetForm();
    }

    resetForm() {
    }


  @wire(MessageContext) messageContext;


  subscribeToMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage))
  }

  handleMessage(eventMessage) {
    this.selectedEventId = eventMessage.eventId;
    console.log('handleMessage : ', this.selectedEventId);

  }
    

    handleFieldChange(e) {
        this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    }

    handleRSVP() {
        registerAttendee({ con: { ...this.contactRecord, sobjectType: CONTACT_OBJECT.objectApiName, }, eventId: this.selectedEventId })
            .then((contact) => {
                console.log('contact--> : ', contact);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfully registered for event! ',
                        variant: 'success'
                    })
                );
            })
            .catch((err) => console.error(err));

        this.closeModal()
    }
 connectedCallback() {
    this.subscribeToMessageChannel();

  }
}