import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import registerAttendee from '@salesforce/apex/DubaiRSVPController.registerAttendee';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';

export default class DubaiRSVP extends LightningElement {

    // selectedEventId ='a0B5j00000C8Cq4EAF';
    selectedEventId;

    isModalOpen = false;
    formLoads = false;
    formReset = false;


    // Attendee form details
    firstName;
    lastName;
    email;
    transactionId = '';
    amount = '';

    errorMessage = '';
    @wire(getDubaiDreaminEventId)
    wiredEventId({ error, data }) {
        if (data) {

            this.selectedEventId = data;
        } else if (error) {
            console.error('getDubaiDreaminEventId Error:', error);
        }
    }


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
        if (!this.lastName || !this.email || !this.transactionId || !this.amount) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Failure',
                    message: 'Please fill out the form!',
                    variant: 'warning'
                })
            );
            return;
        }
        let attendeeListObj = {
            eventId: this.selectedEventId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            transactionID: this.transactionId,
            amount: parseInt(this.amount)

        }


        registerAttendee({ attendeeInfo: JSON.stringify(attendeeListObj) })
            .then((attendeeObj) => {
                this.closeModal();
                this.resetForm();
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfully registered for event! ',
                        variant: 'success'
                    })
                );
            })

            .catch((error) => {
                if (error.body && error.body.message && error.body.message.includes('An attendee with the same email already exists.')) {
                    console.log('error.body.message : ',error.body.message);
                    this.errorMessage = 'An attendee with the same email already exists.';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message:  this.errorMessage,
                            variant: 'error'
                        })
                    );
                } else {

                    console.error('Error registering attendee: ', error);

                    this.errorMessage = 'An error occurred while registering attendee.';
                }
            });



    }


    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.transactionId = '';
        this.amount = ' ';
        this.responsesWithQuestionIds = [];
        this.questionsList = [];
        this.formReset = true;
    }


}