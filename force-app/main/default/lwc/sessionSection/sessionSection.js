import { LightningElement, wire, track } from "lwc";
import getSession from "@salesforce/apex/SessionController.getSession";
import { subscribe, MessageContext } from "lightning/messageService";
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';
export default class SessionSection extends LightningElement {

    subscription = null;
    scrlMsg;
    @wire(MessageContext) messageContext;
    @track sessionInformation = [];
    showAllSession = false;
    @track allsessionInformation = [];
    @track threesessionInformation = [];
    selectedEventId;
    selectedSessionId


    showModal = false;
    sessionDetails;
    sessionTitle;
    sessionDescription;
    sessionStartDate;
    sessionEndDate;
    sessionSartTime;
    sessionEndTime;
    sessionDuration;
    
    openModal(event) {
        this.showModal = true;
        console.log(event);
        this.selectedSessionId = event.target.dataset.sessionid;
        console.log('selectedSessionId: ' + JSON.stringify(this.selectedSessionId));

        this.sessionDetails = this.threesessionInformation.find(session => session.sessionTitle === this.selectedSessionId
        );
        console.log('sessionDetails: ' + JSON.stringify(this.sessionDetails));

       this.sessionTitle = this.sessionDetails.sessionTitle;
       this.sessionDescription = this.sessionDetails.sessionDescription;
       this.sessionStartDate = this.sessionDetails.sessionStartDate;
       this.sessionEndDate = this.sessionDetails.sessionEndDate;
       this.sessionEndTime = this.sessionDetails.sessionEndTime;
       this.sessionDuration = this.sessionDetails.sessionDuration;
    //    this.sessionTitle = this.sessionDetails.sessionTitle;
    }

    closeModal() {
        this.showModal = false;
    }



    @wire(MessageContext) messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage));
        this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
    }

    handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;
        console.log('handleMessage : ', this.selectedEventId);
        getSession({ eventId: this.selectedEventId })
            .then(data => {
                this.sessionInformation = data;
                this.threesessionInformation = this.sessionInformation.slice(0, 3);

            });
    }
    handleScroll(message) {
        const scrollSection = message.section;
        console.log('scrollSection:>' + scrollSection);
        if (scrollSection === 'Sessions') {
            console.log('In Scroling');
            this.template.querySelector('.Sessions').scrollIntoView({ behavior: 'smooth' });

        }
    }
    handleViewAllClick() {
        this.showAllSession = true;
        this.allsessionInformation = this.sessionInformation;
    }
    handleCloseModal() {
        this.showAllSession = false;
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }



    // openModal(event) {
    //     this.isModalOpen = true;
    //     this.selectedSessionId = event.currentTarget.dataset.sessionid;
    //     this.sessionDetails = this.threesessionInformation.find(session => session.Id === this.selectedSessionId);
    //     console.log('sessionDetails: ' + JSON.stringify(this.sessionDetails));

    //     // this.isModalOpen = true;
    //     //  this.selectedSessionId = event.currentTarget.dataset.sessionid;
    //     // console.log('sessionId : ',this.selectedSessionId);

    // }
}