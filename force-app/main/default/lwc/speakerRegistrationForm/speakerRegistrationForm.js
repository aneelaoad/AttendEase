import { LightningElement, wire, api} from 'lwc';
import registerSpeaker from '@salesforce/apex/SpeakerController.registerSpeaker';
// import getEvents from '@salesforce/apex/EventController.getEvents';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, MessageContext } from "lightning/messageService";

export default class SpeakerRegistrationForm extends LightningElement {
    speakerName = '';
    speakerTitle = '';
    speakerProfileImage;
    speakerInformation = '';
     @api selectedEventId;
    showSessionFields = false;
    showModal=false;
    
    // @wire(MessageContext) messageContext;
    // subscribeToMessageChannel() {
    //     this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage));
    // }

    // handleMessage(eventMessage) {
    //     this.selectedEventId = eventMessage.eventId;
    //     console.log('handleMessage : ',this.selectedEventId);
    // }


     openModal(event) {
        this.showModal = true;
        document.body.style.overflow = 'hidden';
     }
      closeModal() {
        this.showModal = false;
        document.body.style.overflow = 'auto';

    }
    handleSpeakerNameChange(event) {
        this.speakerName = event.target.value;
    }

    handleSpeakerTitleChange(event) {
        this.speakerTitle = event.target.value;
    }
    handleProfileImageChange(event) {
        // this.speakerProfileImage = event.target.files[0];
        this.speakerProfileImage = event.target.value;;
    }

    handleSpeakerInformationChange(event) {
        this.speakerInformation = event.target.value;
    }



   
 handleAddSession() {
        this.showSessionFields = true;
        console.log('clicked : ');
    }

    handleSessionTitleChange(event) {
        this.sessionTitle = event.target.value;
    }

    handleSessionStartDateChange(event) {
        this.sessionStartDate = event.target.value;
    }

    handleSessionEndDateChange(event) {
        this.sessionEndDate = event.target.value;
    }

    handleSessionStartTimeChange(event) {
        this.sessionStartTime = event.target.value;
    }

    handleSessionEndTimeChange(event) {
        this.sessionEndTime = event.target.value;
    }

 



 handleRegistration() {
        console.log('this.speakerName : ', this.speakerName);
        console.log('this.speakerTitle : ', this.speakerTitle);
        console.log('this.selectedEventId : ', this.selectedEventId);
        console.log('this.sessionStartTime : ', this.sessionStartTime);
        console.log('this.sessionEndTime : ', this.sessionEndTime);
        let speakerInfo = {
            speakerName:this.speakerName,
            speakerTitle: this.speakerTitle,
            speakerImage: this.speakerProfileImage,
            speakerInformation: this.speakerInformation,
            sessionInfo: {
                sessionTitle: this.sessionTitle,
                sessionStartDate: this.sessionStartDate,
                sessionEndDate: this.sessionEndDate,
                sessionStartTime: this.sessionStartTime,
                sessionEndTime: this.sessionEndTime
            },
            eventId: this.selectedEventId
        }
        console.log('speakerInfo : ', JSON.stringify(speakerInfo));
  
        // registerSpeaker({ speakerName: this.speakerName, speakerTitle: this.speakerTitle, selectedEventId: this.selectedEventId, speakerImage: this.speakerProfileImage, speakerInformation:this.speakerInformation })
        registerSpeaker({ speakerInfo: JSON.stringify(speakerInfo) })
            .then((data => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfully registered for event! ',
                        variant: 'success'
                    })
                );
            }))
            .catch((error) => {

            })

            this.closeModal();

    }
    connectedCallback() {
        // this.subscribeToMessageChannel();

    }
}