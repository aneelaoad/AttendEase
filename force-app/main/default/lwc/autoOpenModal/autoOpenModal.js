import { LightningElement, track, wire, api } from 'lwc';
import getEvents from '@salesforce/apex/EventListController.getEvents';
import EVENT_CHANNEL from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class AutoOpenModal extends LightningElement {

    @track selectedEvent = '';
    @track eventOptions = [];

    @wire(MessageContext)
    messageContext;


    handleEventChange(event) {
        this.selectedEvent = event.detail.value;
    }

    publishEventId() {
        if (this.selectedEvent) {
            sessionStorage.setItem('eventId', this.selectedEvent);
            const payload = { eventId: this.selectedEvent };
            publish(this.messageContext, EVENT_CHANNEL, payload);
            this.hideModal();
        }

    }


    

  @wire(getEvents)
    wiredEvents({ error, data }) {
        if (data) {
            this.eventOptions = data.map(event => ({
                label: event.Name,
                value: event.Id
            }));

            console.log('this.eventOptions : ',JSON.stringify(this.eventOptions));
        } 
        
        
        else if (error) {
            console.error('Error fetching events', error);
        }
    }

    showModal() {
        const modalContainer = this.template.querySelector('.modal-container');
        modalContainer.classList.add('show-modal');
    }

    hideModal() {
        const modalContainer = this.template.querySelector('.modal-container');
        modalContainer.classList.remove('show-modal');
    }






    renderedCallback() {
        this.showModal();
    }

}