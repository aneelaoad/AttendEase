import { LightningElement,wire } from 'lwc';
import getFooterItems from '@salesforce/apex/FooterController.getFooterItems';
import COPYRIGHT from '@salesforce/label/c.COPYRIGHT';
import SOCIAL_ICONS from '@salesforce/resourceUrl/SOCIAL_ICONS';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";
export default class Footer extends LightningElement {
copyRightLabel = COPYRIGHT;
socialIcons = SOCIAL_ICONS;

 socialLinks =[];
linksLoaded = false;
selectedEventId
 @wire(MessageContext) messageContext;


  subscribeToMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage))
  }

 handleMessage(eventMessage) {
    this.selectedEventId = eventMessage.eventId;
   
    getFooterItems({ eventId:this.selectedEventId}).then(data=>{
         if (data) {
             this.linksLoaded= true
            data.forEach(link => {
                const iconName = link.socialMediaIcon;
                let socialLink = Object.assign({}, link, {socialMediaIcon: this.socialIcons + '/' + iconName});
                this.socialLinks.push(socialLink);
  
              });
        } else if (error) {
            console.error('Error:', error);
        }
    })

  }

   connectedCallback() {
    this.subscribeToMessageChannel();
  }
}