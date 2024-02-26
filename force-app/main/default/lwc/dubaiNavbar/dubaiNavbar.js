import { LightningElement, wire } from 'lwc';
import getNavigationItems from '@salesforce/apex/NavigationbarController.getNavigationItems';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_CHANNEL from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { publish,  MessageContext, createMessageContext } from 'lightning/messageService';



export default class DubaiNavbar extends LightningElement {

  selectedEventId = 'a021m00001cTgUnAAK';
  buttonLabel = 'Contact Us';
  companyLogo;
  navigationItems = [];
  menuOpen = false;


    @wire(MessageContext)
    messageContext;


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  get menuClass() {
    return this.menuOpen ? 'menu-open' : '';
  }

  @wire(getNavigationItems, { eventId: '$selectedEventId' })
  wiredData({ error, data }) {
    if (data) {
      data.forEach(navItem => {
        this.companyLogo = navItem.companyLogo;

      });
      if (data && data.length > 0) {

        this.companyLogo = data[0].companyLogo;
        this.navigationItems = data;
      } else {

        this.isNavbarMissing = true;
      }

      this.navigationItems = data;
    } else if (error) {
      console.error('Error:', error);
    }
  }




  publishEventId(){
        // 

       
       const payload = { eventId: this.selectedEventId };
        publish(createMessageContext(), EVENT_CHANNEL, payload);

        // console.log('publishss : ',publish(this.messageContext, EVENTID_MESSAGE, payload));

     
  }
   handleNavItemClick(event) {
        const section = event.target.dataset.section;
        const payload = { section: section };
        publish(this.messageContext, SCROLL_MESSAGE, payload);
     
    }

    connectedCallback() {
      this.publishEventId();
      // const payload = {eventId: this.selectedEventId};
      //   publish(this.messageContext, EVENTID_MESSAGE, payload);
      // this.publishEventId();
    }
}