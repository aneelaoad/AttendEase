import { LightningElement, wire } from 'lwc';
import getFooterItems from '@salesforce/apex/FooterController.getFooterItems';
// import SOCIAL_ICONS from '@salesforce/resourceUrl/SOCIAL_ICONS';
import SOCIAL_ICONS from '@salesforce/resourceUrl/SO_ICONS';
import getNavigationItems from '@salesforce/apex/NavigationbarController.getNavigationItems';

export default class DubaiFooter extends LightningElement {
    // socialIcons = SOCIAL_ICONS;
    socialIcons = SOCIAL_ICONS;
    linksLoaded = false;
    socialLinks = [];
    selectedEventId = 'a021m00001cTgUnAAK';
    companyLogo

    @wire(getFooterItems, { eventId: '$selectedEventId' })

    wiredData({ error, data }) {
        if (data) {
            this.linksLoaded = true
            data.forEach(link => {
                const iconName = link.socialMediaIcon;
                let socialLink = Object.assign({}, link, { socialMediaIcon: this.socialIcons + '/' + iconName });
                this.socialLinks.push(socialLink);


            });
        } else if (error) {
            console.error('Error:', error);
        }
    }

    @wire(getNavigationItems, { eventId: '$selectedEventId' })
    wiredData1({ error, data }) {
        if (data) {
              this.linksLoaded = true
            data.forEach(navItem => {
                this.companyLogo = navItem.companyLogo;
                console.log('this.companyLogo : ',this.companyLogo);

            });
            
        } else if (error) {
            console.error('Error:', error);
        }
    }

}