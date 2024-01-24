import { LightningElement, wire } from "lwc";
import getDenormalizedBannerImage from "@salesforce/apex/EventController.getDenormalizedEvent";
import { subscribe, MessageContext} from "lightning/messageService";
import EVENT_MESSAGE from '@salesforce/messageChannel/EventIDMessageChannel__c';
import IMAGES from '@salesforce/resourceUrl/IMAGES'
export default class BannerImage extends LightningElement {
    bannerImage;
    selectedEventId;
    bannerImageWarning;
    @wire(MessageContext) messageContext;
 
    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_MESSAGE, (eventMessage) => this.handleMessage(eventMessage));
      }
      
      handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;
        getDenormalizedBannerImage({eventId: this.selectedEventId})
        .then(data=> {
          data.forEach(event => {
         this.bannerImage = event.bannerImage;
          //  this.bannerImageWarning = event.bannerImageWarning;
          });
        });

      }
      connectedCallback() {
        this.subscribeToMessageChannel();
        this.bannerImageWarning = IMAGES+'/placeholder'+'.jpg';
        console.log('bannerImageWarning : ',this.bannerImageWarning);

    }


}