import { LightningElement, wire, api, track } from 'lwc';
import getEventHightlight from '@salesforce/apex/EventController.getEvent';
import RSVP_LABEL from '@salesforce/label/c.RSVP_LABEL';
import ICONS from '@salesforce/resourceUrl/ICONS';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";

export default class EventHighlight extends LightningElement {

@api selectedEventId;
  eventTitle;
  eventDescription;
  eventStreet;
  eventCity;
  eventCountry;
  eventDate;
  eventTime;
  eventStartDateTime;
  eventEndDateTime;
  buttonLabel = RSVP_LABEL;
  clockIcon;
  locationIcon;
  
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
      this.eventTitle = data.eventTitle;
      this.eventDescription = data.eventDescription;
      this.eventStreet = data.eventStreet;
      this.eventCity = data.eventCity;
      this.eventCountry = data.eventCountry;
      this.eventStartDateTime = data.eventStartDateTime;
      this.eventEndDateTime = data.eventEndDateTime;
      this.bannerImageWarning = data.bannerImageWarning;
      this.titleWarning = data.titleWarning;
      this.dateTimeWarning = data.dateTimeWarning;
      this.descriptionWarning = data.descriptionWarning
      this.locationWarning = data.locationWarning;
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