import { LightningElement, wire, track } from "lwc";
import getSponsor from "@salesforce/apex/SponsorController.getSponsor";
import { subscribe, MessageContext } from "lightning/messageService";
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';

export default class SponsorSection extends LightningElement {
    selectedEventId = 'a021m00001cTgUnAAK';
    subscription = null;
    scrlMsg;
    sponsorInformation;
    @wire(MessageContext) messageContext;


    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage));
        this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
    }
    handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;

      
    }
    
    @wire(getSponsor, { eventId: '$selectedEventId' })
    wiredData({ error, data }) {
      if (data) {
        this.sponsorInformation = data
      } else if (error) {
         console.error('Error:', error);
      }
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