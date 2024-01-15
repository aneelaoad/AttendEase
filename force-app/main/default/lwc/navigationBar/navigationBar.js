import { LightningElement, wire, track } from 'lwc';
import getNavigationItems from '@salesforce/apex/NavigationbarController.getNavigationItems';
import SCROLL_MESSAGE from '@salesforce/messageChannel/ScrollMessageChannel__c';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { publish,subscribe,  MessageContext } from 'lightning/messageService';

export default class NavigationBar extends LightningElement {
    navigationItems = []
    companyLogo;
    stickyMargin;
    selectedEventId;
    sectionSelected;
    contentPadding = 'padding-top:10px';

menuTab

    @wire(MessageContext)
    messageContext;

   subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage))
    }

    handleMessage(eventMessage) {
        this.selectedEventId = eventMessage.eventId;
       
        getNavigationItems( { recordType: 'Header_Navigation', eventId: this.selectedEventId })
        .then(data => {
            data.forEach(navItem => {
                this.companyLogo = navItem.companyLogo;                
            });
            
            this.navigationItems = data;
        });

    }


    handleNavItemClick(event) {
       const section = event.target.dataset.section;
        const payload = { section: section};
        publish(this.messageContext, SCROLL_MESSAGE, payload);
        console.log('payload : ',JSON.stringify(payload));
    }



//   @wire(getNavigationItems, { recordType: 'Header_Navigation', eventId: '$selectedEventId' })
//     wiredNavigationItems({ error, data }) {
//         if (data) {
//             data.forEach(navItem => {
//                 this.companyLogo = navItem.companyLogo
//             });
//             this.navigationItems = data;
//         } else if (error) {
//             console.error('Error retrieving event names', error);
//         }
//     }

    renderedCallback() {
        //this.selectedEventId = sessionStorage.getItem('eventId');
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
            console.log('error =>', error);
        }
    }
connectedCallback() {
    this.subscribeToMessageChannel();
    
  }
}