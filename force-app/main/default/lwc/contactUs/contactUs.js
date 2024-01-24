import { LightningElement, wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCompanyInfo from '@salesforce/apex/CompanyInformationController.getCompanyInfo';
import { subscribe, MessageContext} from "lightning/messageService";
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';

export default class ContactUs extends LightningElement {
    organizationId;
    orgURL;
    pageUrl=window.location.origin +'/eventsproduct/s/';
    subscription = null;
    scrlMsg;
    @wire(MessageContext) messageContext;
    subscribeToMessageChannel() {
       this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
      }
    @wire(getCompanyInfo)
    getAllCompanyInfo({ data, error }) {
        if (data) {
            // Assuming data is a list, loop through it
            for (let i = 0; i < data.length; i++) {
                // Access properties for each item in the list
                this.organizationId = data[i].orgId;
                this.orgURL = data[i].orgUrl;
                console.log('org ID::', data[i].orgId);
                console.log('org URL::', data[i].orgUrl);
                // You might want to store this information in an array or another data structure
            }
            console.log('organizationId:'+this.organizationId);
            console.log('orgURL:'+this.orgURL);
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

    showToast(){
        const event = new ShowToastEvent({
            title: 'Show Toast Demo',
            message: 'Your Case has been Submitted Successfully!',
            variant: 'success',
        });
        this.dispatchEvent(event);
    }
    handleScroll(message) {
        const scrollSection = message.section;
        console.log('scrollSection:>'+scrollSection);
       if (scrollSection === 'Contact Us') {
           console.log('In Scroling');
            this.template.querySelector('.mainForm_outer').scrollIntoView({ behavior: 'smooth' });
         
       }
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}