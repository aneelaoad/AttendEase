import { LightningElement, wire } from "lwc";
import getDenormalizedDescription from "@salesforce/apex/EventController.getEvent";
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";
import CompanyDescriptionLabel from '@salesforce/label/c.Company_Description_Label';


export default class AboutUs extends LightningElement {
  subscription = null;
  aboutUsDescription;
  aboutUsLabel=CompanyDescriptionLabel;
  selectedEventId;
  @wire(MessageContext) messageContext;

  subscribeToEventMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage));
  }
  subscribeToScrollMessageChannel() {
    subscribe(this.messageContext, SCROLL_MESSAGE, (scrollMessage) => this.handleScroll(scrollMessage))

  }
  handleMessage(eventMessage) {
    this.selectedEventId = eventMessage.eventId;
    getDenormalizedDescription({ eventId: this.selectedEventId })
      .then(data => {
        this.aboutUsDescription = data.aboutUsDescription;
        
      });
  }


  handleScroll(scrollMessage) {
    const sectionName = scrollMessage.section;
    if (sectionName === 'About Us') {
      this.template.querySelector('.section_about').scrollIntoView({ behavior: 'smooth' });
    }
  }

  connectedCallback() {
    this.subscribeToEventMessageChannel();
    this.subscribeToScrollMessageChannel();
  }


}