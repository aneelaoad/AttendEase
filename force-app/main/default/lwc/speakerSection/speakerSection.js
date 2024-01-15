import { LightningElement, wire, track } from "lwc";
import getSpeakers from "@salesforce/apex/SpeakerController.getSpeakers";
import { subscribe, MessageContext} from "lightning/messageService";
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';

export default class speakerSection extends LightningElement {
    subscription = null;
    scrlMsg;
    @track speakerInformation = [];
    showAllSpeakers = false;
    @track allspeakerInformation = [];
    @track threespeakerInformation = [];
    selectedEventId;



    @wire(MessageContext) messageContext;


    subscribeToMessageChannel() {
      this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage));
      this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
    }
  
    handleMessage(eventMessage) {
      this.selectedEventId = eventMessage.eventId;
      console.log('handleMessage : ', this.selectedEventId);
      getSpeakers({eventId: this.selectedEventId})
      .then(data=> {
        this.speakerInformation = data;
        this.threespeakerInformation = this.speakerInformation.slice(0, 3);
        
      });
    }

    handleScroll(message) {
        const scrollSection = message.section;
        console.log('scrollSection:>'+scrollSection);
       if (scrollSection === 'Speakers') {
           console.log('In Scroling');
            this.template.querySelector('.sectionSpeaker').scrollIntoView({ behavior: 'smooth' });
         
       }
    }
    handleViewAllClick() {
        this.showAllSpeakers = true;
        this.allspeakerInformation = this.speakerInformation;
    }
    handleCloseModal() {
        this.showAllSpeakers = false;
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}