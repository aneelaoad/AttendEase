import { LightningElement, wire, api } from 'lwc';
// import getEvents from '@salesforce/apex/EventController.getEvent';
import getEvents from '@salesforce/apex/EventSelector.getEvents';
import EVENT_CHANNEL from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService';


export default class AutoOpenModal extends LightningElement {

    selectedEventId = '';
    eventOptions = [];
    pageURL

    @wire(MessageContext)
    messageContext;


    handleEventChange(event) {
        this.selectedEventId = event.detail.value;
    }





    publishEventId() {
        const params = new URLSearchParams();
     
        this.pageURL = window.location.origin + '/eventsproduct/s/';

        if (this.selectedEventId) {
            sessionStorage.setItem('eventId', this.selectedEventId);
            params.append('eventId', this.selectedEventId);
            var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
            window.history.pushState({ path: refresh }, '', refresh);


            if (params.get('eventId') === this.selectedEventId) {
                this.hideModal();
                
            }

            const payload = { eventId: this.selectedEventId };
            publish(this.messageContext, EVENT_CHANNEL, payload);
            this.hideModal();
        }

    }




    @wire(getEvents,{whereClause: ''})
    wiredEvents({ error, data }) {
        if (data) {
            this.eventOptions = data.map(event => ({
                label: event.Name,
                value: event.Id
            }));
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