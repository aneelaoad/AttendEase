import { LightningElement,api, wire } from 'lwc';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';

export default class DubaiSpeakerRegistration extends LightningElement {

@api selectedEventId;


@wire(getDubaiDreaminEventId)
wiredEventId({ error, data }) {
    if (data) {
        
       
        this.selectedEventId=data;
    } else if (error) {
      
    }
}
}