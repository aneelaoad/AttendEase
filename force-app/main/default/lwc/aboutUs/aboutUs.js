import { LightningElement, wire } from "lwc";
import getDenormalizedDescription from "@salesforce/apex/EventController.getDenormalizedEvent";
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";

export default class AboutUs extends LightningElement {
  subscription = null;
  eventDescriptionList = [];
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
        this.eventDescriptionList = data;

      });
  }


  handleScroll(scrollMessage) {
    const sectionName = scrollMessage.section;
    if (sectionName === 'About Us') {
      this.template.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
    }
  }

  connectedCallback() {
    this.subscribeToEventMessageChannel();
    this.subscribeToScrollMessageChannel();
  }


}