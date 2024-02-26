import { LightningElement, wire } from 'lwc';
import getFAQsList from '@salesforce/apex/FAQsController.getFAQsList';
import DUBAI_ASSET from '@salesforce/resourceUrl/DUBAI_ASSET';

export default class DubaiFAQs extends LightningElement {
  selectedEventId = 'a021m00001cTgUnAAK'
    faqList;
mailBackgroundImg;
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