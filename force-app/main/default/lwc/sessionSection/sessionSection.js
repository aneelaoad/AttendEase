import { LightningElement, wire, track } from "lwc";
import getSession from "@salesforce/apex/SessionController.getSession";
import { subscribe, MessageContext} from "lightning/messageService";
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
  
    @wire(MessageContext) messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage));
       this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
      }

      handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;
        console.log('handleMessage : ', this.selectedEventId);
        getSession({eventId: this.selectedEventId})
        .then(data=> {
            this.sessionInformation = data;
            this.threesessionInformation = this.sessionInformation.slice(0, 3);
          
        });
      }
      handleScroll(message) {
        const scrollSection = message.section;
        console.log('scrollSection:>'+scrollSection);
       if (scrollSection === 'Sessions') {
           console.log('In Scroling');
            this.template.querySelector('.sectionSession_outer').scrollIntoView({ behavior: 'smooth' });
         
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
}