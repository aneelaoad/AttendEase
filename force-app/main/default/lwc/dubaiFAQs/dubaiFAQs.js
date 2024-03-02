import { LightningElement, wire } from 'lwc';
import getFAQsList from '@salesforce/apex/FAQsController.getFAQsList';
import DUBAI_ASSET from '@salesforce/resourceUrl/DUBAI_ASSET';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';
export default class DubaiFAQs extends LightningElement {
  //selectedEventId = 'a021m00001cTgUnAAK'
  selectedEventId;
    faqList;
mailBackgroundImg;

@wire(getDubaiDreaminEventId)
wiredEventId({ error, data }) {
if (data) {
    
    console.log('Dubai Dreamin Event ID:', data);
    this.selectedEventId=data;
} else if (error) {
    console.error('getDubaiDreaminEventId Error:', error);
}
}

@wire(getFAQsList, { eventId: '$selectedEventId' })
wiredData({ error, data }) {
  if (data) {
       this.faqList = data
    console.log('Data', data);
  } else if (error) {
     console.error('Error:', error);
  }
}



 

  connectedCallback() {
    // this.mailBackgroundImg = DUBAI_ASSET + '/directmail1.png';
    this.mailBackgroundImg = DUBAI_ASSET + '/vector1.png';
  }
   get mailBackgroundImage(){
    return `background: url(${this.mailBackgroundImg})`
  }
}