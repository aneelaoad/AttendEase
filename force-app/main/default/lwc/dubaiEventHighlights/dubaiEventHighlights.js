import { LightningElement, wire } from 'lwc';
import getEventHighlight from '@salesforce/apex/EventController.getEvent';
import { subscribe, MessageContext } from 'lightning/messageService';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import DUBAI_ASSET from '@salesforce/resourceUrl/DUBAI_ASSET';

export default class DubaiEventHighlights extends LightningElement {
    selectedEventId = 'a021m00001cTgUnAAK';
    // selectedEventId;
    eventTitle;
    eventStreet;
    eventCity;
    eventCountry;
    eventStartDateTime;
    eventEndDateTime;
    locationIcon;
    calenderIcon;
    pinkCircle;
    eventSubscription;
    scrollSubscription;
    @wire(MessageContext) messageContext;


// subscribeToEventMessageChannel() {
//     this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage));
//   }

    subscribeToMessageChannels() {

        this.scrollSubscription = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
     this.eventSubscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage));
  

    }
    
    handleScroll(message) {
        const scrollSection = message.section;
        if (scrollSection === 'About Us') {
            this.template.querySelector('.event-highlight-section').scrollIntoView({ behavior: 'smooth' });
        }

    }

    handleMessage(eventMessage) {
        console.log('eventMessage : ', JSON.stringify(eventMessage));

        this.selectedEventId = eventMessage.eventID;
        console.log('About Us Id : ', this.selectedEventId);
    }

    @wire(getEventHighlight, { eventId: '$selectedEventId' })
    wiredEventHighlight({ error, data }) {
        if (data) {
            this.eventTitle = data.eventTitle;
            this.eventStreet = data.eventStreet;
            this.eventCity = data.eventCity;
            this.eventCountry = data.eventCountry;
            this.eventStartDateTime = new Date(data.eventStartDateTime);
            this.eventEndDateTime = new Date(data.eventEndDateTime);
        } else if (error) {
            console.error('getEventHighlight Error:', error);
        }
    }
    // In this method we display Date in Correct format
    get formattedDate() {
        return this.eventStartDateTime ? this.eventStartDateTime.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }) : '';
    }
    // In this method we extract what is Days Of Week On That Day 
    get dayOfWeek() {
        return this.eventStartDateTime ? this.eventStartDateTime.toLocaleDateString('en-US', {
            weekday: 'long'
        }) : '';
    }
    // In this Method we combile Event Start Time and Event End Time in Range 
    get formattedTimeRange() {
        const startTime = this.eventStartDateTime ? this.eventStartDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        const endTime = this.eventEndDateTime ? this.eventEndDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        return `${startTime} to ${endTime}`;
    }
   





    connectedCallback() {
        this.subscribeToMessageChannels();
        // this.subscribeToEventMessageChannel();

        this.locationIcon = DUBAI_ASSET + '/location-icon.png';
        this.calenderIcon = DUBAI_ASSET + '/calender-icon.png';
        this.pinkCircle = DUBAI_ASSET + '/pink-circle.png';
    }

   

}