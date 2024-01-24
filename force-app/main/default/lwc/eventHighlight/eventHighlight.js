import { LightningElement, wire, api, track } from 'lwc';
import getEventHightlight from '@salesforce/apex/EventController.getDenormalizedEvent';
import RSVP_LABEL from '@salesforce/label/c.RSVP_LABEL';
import ICONS from '@salesforce/resourceUrl/ICONS';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";

export default class EventHighlight extends LightningElement {

  eventTitle;
  eventDescription;
  eventStreet;
  eventCity;
  eventCountry;
  eventDate;
  eventTime;
  eventDateTime;
  buttonLabel = RSVP_LABEL;
  clockIcon;
  locationIcon;
  @api selectedEventId;

  titleWarning = '';
  dateTimeWarning = '';
  descriptionWarning = '';
  locationWarning = ''

  @wire(MessageContext) messageContext;


  subscribeToMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage))
  }

  handleMessage(eventMessage) {
    this.selectedEventId = eventMessage.eventId;

  }


  @wire(getEventHightlight, { eventId: '$selectedEventId' })
  wiredEventHightlight({ error, data }) {
    if (data) {
      data.forEach(event => {
        this.eventTitle = event.eventTitle;
        this.eventDescription = event.eventDescription;
        this.eventStreet = event.eventStreet;
        this.eventCity = event.eventCity;
        this.eventCountry = event.eventCountry;
        this.eventDateTime = event.eventDateTime;
        this.bannerImageWarning = event.bannerImageWarning;
        this.titleWarning = event.titleWarning;
        this.dateTimeWarning = event.dateTimeWarning;
        this.descriptionWarning = event.descriptionWarning
        this.locationWarning = event.locationWarning

      });
      console.log('getEventHightlight : ',JSON.stringify(getEventHightlight));

    } else if (error) {
      console.error(' getEventHightlight Error:', error);
    }
  }

  showWarning(warningProperty, message) {
    this[warningProperty] = message;
  }
  connectedCallback() {
    this.subscribeToMessageChannel();
    this.clockIcon = ICONS + '/clock.png';
    this.locationIcon = ICONS + '/location.png';


    // The warning messages if Event's any type of data/information is missing
    if (!this.eventTitle) {
      this.showWarning('titleWarning', this.titleWarning);
    }

    if (!this.eventDateTime) {
      this.showWarning('dateTimeWarning', this.dateTimeWarning);
    }

    if (!this.eventLocation) {
      this.showWarning('locationWarning', this.locationWarning);
    }

    if (!this.eventDescription) {
      this.showWarning('descriptionWarning', this.descriptionWarning);
    }
  if (!this.bannerImage) {
      this.showWarning('bannerImageWarning', this.bannerImageWarning);
    }

  }





}