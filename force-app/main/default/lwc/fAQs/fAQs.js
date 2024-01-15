import { LightningElement, wire } from 'lwc';
import getFAQs from '@salesforce/apex/FAQsController.getDenormalizedFAQs';
import FAQ_LABEL from '@salesforce/label/c.FAQ_LABEL';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { publish, subscribe, MessageContext } from 'lightning/messageService';

export default class FAQs extends LightningElement {
  faqLabel = FAQ_LABEL
  faqList = []
  selectedEventId


  @wire(MessageContext) messageContext;


  subscribeToEventMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleEventId(eventMessage))

  }
  subscribeToScrollMessageChannel() {
    subscribe(this.messageContext, SCROLL_MESSAGE, (scrollMessage) => this.handleScroll(scrollMessage))

  }

  handleEventId(eventMessage) {
    this.selectedEventId = eventMessage.eventId;
    getFAQs({ eventId: this.selectedEventId }).then(data => {
      if (data) {
        this.faqList = data
      } else if (error) {
        console.error('wiredGetFAQs Error:', error);
      }
    });


  }
  handleScroll(scrollMessage) {
    const sectionName = scrollMessage.section;
    if (sectionName === 'FAQs') {
      this.template.querySelector('.faq').scrollIntoView({ behavior: 'smooth' });
    }
  }

  connectedCallback() {
    this.subscribeToEventMessageChannel();
    this.subscribeToScrollMessageChannel();
  }
}