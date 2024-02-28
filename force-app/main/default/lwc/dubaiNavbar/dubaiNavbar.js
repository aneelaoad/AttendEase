import { LightningElement, wire } from 'lwc';
import getNavigationItems from '@salesforce/apex/NavigationbarController.getNavigationItems';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_CHANNEL from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { publish, subscribe, MessageContext, createMessageContext } from 'lightning/messageService';



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




  publishEventId() {
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

  renderedCallback() {
    try {
      window.onscroll = () => {
        let stickysection = this.template.querySelector('.myStickyHeader');
        let sticky2 = stickysection.offsetTop;

        if (window.pageYOffset > sticky2) {
          stickysection.classList.add("slds-is-fixed");
          this.stickyMargin = 'margin-top:90px';
          this.contentPadding = 'padding-top:105px'
        } else {
          stickysection.classList.remove("slds-is-fixed");
          this.stickyMargin = '';
          this.contentPadding = 'padding-top:10px'
        }
      }
    } catch (error) {
      console.error('error =>', error);
    }
  }

  connectedCallback() {
    this.publishEventId();
    // const payload = {eventId: this.selectedEventId};
    //   publish(this.messageContext, EVENTID_MESSAGE, payload);
    // this.publishEventId();
  }
}