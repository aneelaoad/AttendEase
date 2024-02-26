import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCompanyInfo from '@salesforce/apex/CompanyInformationController.getCompanyInfo';
import { subscribe, MessageContext } from "lightning/messageService";
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';

export default class ContactUs extends LightningElement {
    organizationId;
    orgURL;
    pageUrl = window.location.origin + '/eventsproduct/s/';
    subscription = null;
    selectedEventId;
    //isFormLoaded=false;
    scrlMsg;
    @wire(MessageContext) messageContext;
    subscribeToMessageChannel() {
        this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
        this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage));
    }
    @wire(getCompanyInfo)
    getAllCompanyInfo({ data, error }) {
        if (data) {
            //this.isFormLoaded=true; 
            // Assuming data is a list, loop through it

            // Access properties for each item in the list
            this.organizationId = data.orgId;
            this.orgURL = data.orgUrl;

            // You might want to store this information in an array or another data structure



        } else if (error) {
            console.error('Error fetching company info:', error);
        }
    }
    handleSubmit(event) {
        //event.preventDefault();
        // Construct the dynamic action URL using template literals
        const actionUrl = `${this.orgURL}/servlet/servlet.WebToCase?encoding=UTF-8&orgId=${this.organizationId}`;

        // Set the action attribute of the form
        event.target.action = actionUrl;
        this.showToast();

        // Disable form inputs after submission

    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Show Toast Demo',
            message: 'Your Case has been Submitted Successfully!',
            variant: 'success',
        });
        this.dispatchEvent(event);
    }
    handleScroll(message) {
        const scrollSection = message.section;

        if (scrollSection === 'Contact Us') {
            this.template.querySelector('.contact-us').scrollIntoView({ behavior: 'smooth' });

        }

    }
    handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}