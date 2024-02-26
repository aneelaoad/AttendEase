import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import registerAttendee from '@salesforce/apex/DubaiRSVPController.registerAttendee';
// import getEventQuestions from '@salesforce/apex/AttendeeRegistrationController.getEventQuestions';
import { subscribe, MessageContext } from "lightning/messageService";

export default class DubaiRSVP extends LightningElement {
    selectedEventId = 'a021m00001cYNRRAA4'

    isModalOpen = false;
    formLoads = false;
    formReset = false;


    // Attendee form details
    firstName;
    lastName;
    email;
    transactionId = '';
    amount = '';



    openModal() {
        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';

    }

    closeModal() {
        this.isModalOpen = false;
        //  this.resetForm();
        document.body.style.overflow = 'auto';

    }




    handleFieldChange(event) {
        // const fieldName = event.target.fieldName;
        const fieldName = event.target.label;
        const value = event.target.value;
        switch (fieldName) {
            case 'FirstName':
                this.firstName = value;
                break;
            case 'LastName':
                this.lastName = value;
                break;
            case 'Email':
                this.email = value;
                break;
            case 'TransactionId':
                this.transactionId = value;
                break;
            case 'Amount':
                this.amount = value;
                break;
            default:
                break;
        }
    }

 handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;
        
    }
    handleRSVP() {

        let attendeeListObj = {
            eventId: this.selectedEventId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            transactionID: this.transactionId, 
            amount: this.amount 

        }
        console.log('attendeeListObj : ', JSON.stringify(attendeeListObj));
        registerAttendee({ attendeeInfo: JSON.stringify(attendeeListObj) })
            .then((attendeeObj) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfully registered for event! ',
                        variant: 'success'
                    })
                );
            })
            .catch((err) => console.error(err));

        this.resetForm();
        this.closeModal();

    }


    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.responsesWithQuestionIds = [];
        this.questionsList = [];
        this.formReset = true;
    }

    connectedCallback() {
        // this.subscribeToMessageChannel();

    }
}