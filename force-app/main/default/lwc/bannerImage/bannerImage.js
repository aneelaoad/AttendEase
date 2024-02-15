import { LightningElement, wire } from "lwc";
import getDenormalizedBannerImage from "@salesforce/apex/EventController.getEvent";
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
        
          this.bannerImage=data.bannerImage;
        });

      }
      connectedCallback() {
        this.subscribeToMessageChannel();
        this.bannerImageWarning = IMAGES+'/placeholder'+'.jpg';

    }

 isImgUrl(url) {

  return fetch(url, {method: 'HEAD'}).then(res => {

    return res.headers.get('Content-Type').startsWith('image')
  })
}
}