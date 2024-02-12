import { LightningElement, wire, track } from 'lwc';
import getNavigationItems from '@salesforce/apex/NavigationbarController.getNavigationItems';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import NAVBAR_MISSING_MESSAGE from '@salesforce/label/c.NAVBAR_MISSING_MESSAGE';


/**
* Author: Aneela Oad 
* @since: 10/12/24
* Description: Handles the logic and design of Navigation Bar for Site.
* Last modified by: Aneela Oad 
*/
export default class NavigationBar extends LightningElement {
    navigationItems = []
    companyLogo;
    stickyMargin;
    selectedEventId;
    sectionSelected;
    contentPadding = 'padding-top:10px';
    menuTab;
    isNavbarMissing = false;
    warningClass = '';
    warningMessage = NAVBAR_MISSING_MESSAGE
   @track menuOpen = false;

    get menuClass() {
        return this.menuOpen ? 'menu-open' : '';
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
    
    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage))
    }

    /**
    * Author: Aneela Oad 
    * @since: '20/01/24 '
    * Description: 'Method handles EVENT LMS '
    * @param  'eventMessage'
    */
    handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;

        getNavigationItems({ eventId: this.selectedEventId })

            .then((data) => {
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
            }).catch((err) => {
                this.isNavbarMissing = true;
            });

    }
    /**
    * Author: Aneela Oad 
    * @since: 22/01/24
    * Description: Method handles the data-target of section and publishes it. 
    * @param 
    */
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
                    this.contentPadding = 'padding-top:102px'
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
        this.subscribeToMessageChannel();
        

    }
}