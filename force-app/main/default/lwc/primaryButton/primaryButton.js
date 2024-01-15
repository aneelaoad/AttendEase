import { LightningElement, api } from 'lwc';
export default class PrimaryButton extends LightningElement {
@api label

handleRSVP(){
    console.log('clicked');
}
}