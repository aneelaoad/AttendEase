import { LightningElement, wire } from "lwc";
import getDenormalizedBannerImage from "@salesforce/apex/EventController.getDenormalizedEvent";
import { subscribe, MessageContext} from "lightning/messageService";
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';
export default class BannerImage extends LightningElement {
    bannerImages;
    selectedEventId;
    @wire(MessageContext) messageContext;
 
    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage));
      }
      
      handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;
        console.log('handleMessage : ', this.selectedEventId);
        getDenormalizedBannerImage({eventId: this.selectedEventId})
        .then(data=> {
            this.bannerImages = data.map(item => ({ bannerImage: item.bannerImage }));
          
        });
      }
      connectedCallback() {
        this.subscribeToMessageChannel();
    }


}