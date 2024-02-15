import { LightningElement, wire, track } from "lwc";
import getSponsor from "@salesforce/apex/SponsorController.getSponsor";
import { subscribe, MessageContext} from "lightning/messageService";
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';

export default class SponsorSection extends LightningElement {
    subscription = null;
    scrlMsg;
    @wire(MessageContext) messageContext;
    @track sponsorInformation;
    selectedEventId;
    @wire(MessageContext) messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage));
       this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
      }
      handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;
    
        getSponsor({eventId: this.selectedEventId})
        .then(data=> {
            this.sponsorInformation = data;
          
        });
      }
      handleScroll(message) {
        const scrollSection = message.section;
     
       if (scrollSection === 'Sponsors') {
     
            this.template.querySelector('.sectionSponser_outer').scrollIntoView({ behavior: 'smooth' });
         
       }
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}