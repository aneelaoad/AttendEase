import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import registerAttendee from '@salesforce/apex/AttendeeRegistrationController.registerAttendee';
import getEventQuestions from '@salesforce/apex/AttendeeRegistrationController.getEventQuestions';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';

import { subscribe, MessageContext } from "lightning/messageService";

export default class AttendeeRegistrationForm extends LightningElement {
    isModalOpen = false;
    formLoads = false;
    formReset= false;

    // Questionaire data
    @api selectedEventId;
    questionId;
    questionType;
    questionOption = [];
    questionsList = [];
    questionOptionList = [];
    responsesWithQuestionIds = [];

    // Attendee form details
    firstName;
    lastName;
    email;




    openModal() {
        this.isModalOpen = true;
         document.body.style.overflow = 'hidden';
       
    }

    closeModal() {
        this.isModalOpen = false;
      //  this.resetForm();
         document.body.style.overflow = 'auto';

    }

    @wire(MessageContext) messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage))
    }


    @wire(getEventQuestions, { eventId: '$selectedEventId' })
    wiredEventQuestion({ data, error }) {
        if (data) {

            data.forEach(question => {
                let optionList = [];
                // Loop 
                question.questionOptionList.forEach(option => {
                    optionList.push({
                        label: option.option,
                        value: option.option
                    });
                });

                this.questionsList.push({
                    ...question,
                    options: optionList
                });

            });


        } else if (error) {
            console.error(error)
        }
    }





    handleFieldChange(event) {
        const fieldName = event.target.fieldName;
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
            default:
                break;
        }
    }

    handleCheckboxChange(event) {
        const questionId = event.target.dataset.questionid;
        const responseValue = event.target.value;

        let stringList = responseValue.join(' ');


        const question = this.questionsList.find(q => q.questionId === questionId);

        if (question) {
            const existingResponseIndex = this.responsesWithQuestionIds.findIndex(response => response.questionId === questionId);
            if (existingResponseIndex !== -1) {
                this.responsesWithQuestionIds[existingResponseIndex].response = stringList;
            } else {

                this.responsesWithQuestionIds.push({
                    questionId: questionId,
                    response: stringList,
                });
            }

        }

    }
    handleRadioChange(event) {
        const questionId = event.target.dataset.questionid;
        const responseValue = event.target.value;

        const question = this.questionsList.find(q => q.questionId === questionId);

        if (question) {
            const existingResponseIndex = this.responsesWithQuestionIds.findIndex(response => response.questionId === questionId);
            if (existingResponseIndex !== -1) {
                this.responsesWithQuestionIds[existingResponseIndex].response = responseValue;
            } else {
                this.responsesWithQuestionIds.push({
                    questionId: questionId,
                    response: responseValue,
                });
            }

        }

    }

    handleTextAreaChange(event) {
        const questionId = event.target.dataset.questionid;
        const responseValue = event.target.value;

        const question = this.questionsList.find(q => q.questionId === questionId);

        if (question) {
            const existingResponseIndex = this.responsesWithQuestionIds.findIndex(response => response.questionId === questionId);
            if (existingResponseIndex !== -1) {
                this.responsesWithQuestionIds[existingResponseIndex].response = responseValue;
            } else {
                this.responsesWithQuestionIds.push({
                    questionId: questionId,
                    response: responseValue,
                });
            }

        }
    }






    handleRSVP() {
    
        let attendeeListObj = {
            eventId: this.selectedEventId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            responsesList: this.responsesWithQuestionIds,
            questionsList: this.questionsList

        }
    console.log('attendeeListObj : ',JSON.stringify(attendeeListObj) );
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
        this.formReset=true;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();

    }
}