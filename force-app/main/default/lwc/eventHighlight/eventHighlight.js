import { LightningElement, wire, api } from 'lwc';
import getEventHightlight from '@salesforce/apex/EventController.getDenormalizedEvent';
import RSVP_LABEL from '@salesforce/label/c.RSVP_LABEL';
import ICONS from '@salesforce/resourceUrl/ICONS';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";

export default class EventHighlight extends LightningElement {

  eventTitle;
  eventDescription;
  eventLocation;
  eventDate;
  eventTime;
  eventDateTime;
  buttonLabel = RSVP_LABEL;
  clockIcon;
  locationIcon;
  @api selectedEventId;

  @wire(MessageContext) messageContext;


  subscribeToMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage))
  }

  handleMessage(eventMessage) {
    this.selectedEventId = eventMessage.eventId;
    console.log('handleMessage : ', this.selectedEventId);

  }


  @wire(getEventHightlight, { eventId: '$selectedEventId' })
  wiredEventHightlight({ error, data }) {
    if (data) {
      data.forEach(event => {
        this.eventTitle = event.eventTitle;
        this.eventDescription = event.eventDescription;
        this.eventLocation = event.eventLocation;
        this.eventDateTime = event.eventDateTime;
        this.eventTime = event.eventTime;
        this.eventDate = event.eventDate;
      });

    } else if (error) {
      console.error(' getEventHightlight Error:', error);
    }
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
    this.clockIcon = ICONS + '/clock.png';
    this.locationIcon = ICONS + '/location.png';
  }

   



}