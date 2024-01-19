import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import registerAttendee from '@salesforce/apex/AttendeeRegistrationController.registerAttendee';
import getEventQuestions from '@salesforce/apex/AttendeeRegistrationController.getEventQuestions';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';

import { subscribe, MessageContext } from "lightning/messageService";

export default class AttendeeRegistrationForm extends LightningElement {
    @track isModalOpen = false;
    @track contactRecord = {};
    @api selectedEventId;

    question;
    questionId;
    questionOptions = [];
    @track response = '';

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
        console.log('handleMessage from form: ', this.selectedEventId);

    }


    handleFieldChange(e) {
        this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    }
    @wire(getEventQuestions, { eventId: '$selectedEventId' })
    wiredEventQuestion({ data, error }) {
        if (data) {
            data.forEach(question => {
                this.questionOptions = data;
                this.questionId = question.questionId;
            });
            console.log('getEventQuestions : ', JSON.stringify(data));
        } else if (error) {
            // Handle error
        }
    }
    handleRSVP() {
 console.log('clicked : ');
       this.response = this.template.querySelector("lightning-textarea").value;
       console.log('response : ',  JSON.stringify(this.response));
       console.log('this.questionId : ',  this.questionId);
       console.log('this.selectedEventId, : ',  this.selectedEventId);
       
        registerAttendee({ con: { ...this.contactRecord, sobjectType: CONTACT_OBJECT.objectApiName, }, eventId: this.selectedEventId, questionId: this.questionId, response: JSON.stringify(this.response) })
            .then((contact) => {
                console.log('contact--> : ', contact);
                console.log('this.selectedEventId--> : ', this.selectedEventId);
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