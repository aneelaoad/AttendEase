import { LightningElement, wire, track } from "lwc";
import getSpeakers from "@salesforce/apex/SpeakerController.getSpeakers";
import { subscribe, MessageContext } from "lightning/messageService";
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';
import IMAGES from '@salesforce/resourceUrl/IMAGES'
export default class speakerSection extends LightningElement {
  subscription = null;
  scrlMsg;
  @track speakerInformation = [];
  showAllSpeakers = false;
  @track allspeakerInformation = [];
  @track threespeakerInformation = [];
  selectedEventId;
  showModal = false;

  speakerId;
  profilePlaceholder;
  speakerModalDetails;
  speakerName;
  speakerDescription;
  speakerTitle;
  speakerEmail;
  speakerPhone;
  speakerImage;

  openModal(event) {
    this.showModal = true;
    this.speakerId = event.target.dataset.speakerid
    console.log(event);
    console.log(' this.speakerId' + JSON.stringify(this.speakerId));
    this.speakerModalDetails = this.speakerInformation.find(speaker => speaker.speakerName === this.speakerId)
    console.log('this.speakerModalDetails : ', this.speakerModalDetails);

    this.speakerName=this.speakerModalDetails.speakerName;
    this.speakerDescription=this.speakerModalDetails.speakerInformation;
    this.speakerTitle=this.speakerModalDetails.speakerTitle;
    this.speakerEmail=this.speakerModalDetails.speakerEmail;
    this.speakerPhone = this.speakerModalDetails.speakerContactNumber;
    this.speakerImage = this.speakerModalDetails.speakerImage;
  }

  closeModal() {
    this.showModal = false;
  }

  @wire(MessageContext) messageContext;


  subscribeToMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage));
    this.scrlMsg = subscribe(this.messageContext, SCROLL_MESSAGE, (message) => this.handleScroll(message));
  }

  handleMessage(eventMessage) {
    this.selectedEventId = eventMessage.eventId;
    console.log('handleMessage : ', this.selectedEventId);
    getSpeakers({ eventId: this.selectedEventId })
      .then(data => {
        this.speakerInformation = data;

        // data.forEach(speaker => {
        //   this.profilePlaceholder = speaker.
        // });
        this.threespeakerInformation = this.speakerInformation.slice(0, 3);

      });
  }

  handleScroll(message) {
    const scrollSection = message.section;
    console.log('scrollSection:>' + scrollSection);
    if (scrollSection === 'Speakers') {
      console.log('In Scroling');
      this.template.querySelector('.sectionSpeaker').scrollIntoView({ behavior: 'smooth' });

    }
  }
  handleViewAllClick() {
    this.showAllSpeakers = true;
    this.allspeakerInformation = this.speakerInformation;
  }
  handleCloseModal() {
    this.showAllSpeakers = false;
  }
  connectedCallback() {
    this.subscribeToMessageChannel();
    this.profilePlaceholder = IMAGES + '/profile' + '.png';
  }
}