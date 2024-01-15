import { LightningElement,wire,track } from 'lwc';
import getFooterItems from '@salesforce/apex/FooterController.getFooterItems';
import COPYRIGHT from '@salesforce/label/c.COPYRIGHT';
import SOCIAL_ICONS from '@salesforce/resourceUrl/SOCIAL_ICONS';
import EVENT_ID_LMS from '@salesforce/messageChannel/EventIDMessageChannel__c';
import { subscribe, MessageContext } from "lightning/messageService";
export default class Footer extends LightningElement {
copyRightLabel = COPYRIGHT;
socialIcons = SOCIAL_ICONS;

@track socialLinks =[];
linksLoaded = false;
selectedEventId

socialIconsBasePath = SOCIAL_ICONS;

 @wire(MessageContext) messageContext;


  subscribeToMessageChannel() {
    this.subscription = subscribe(this.messageContext, EVENT_ID_LMS, (eventMessage) => this.handleMessage(eventMessage))
  }

 handleMessage(eventMessage) {
    this.selectedEventId = eventMessage.eventId;
    console.log('handleMessage : ', this.selectedEventId);
    getFooterItems({ recordType: 'Footer_Navigation' , eventId:this.selectedEventId}).then(data=>{
         if (data) {
            this.linksLoaded = true;
            this.socialLinks = data.map(link => {
                const { socialMediaIcon, socialMediaLink, socialMediaType } = link;
             
                if (this.isValidSocialLink(socialMediaLink, socialMediaType)) {
                    const iconName = this.getSocialMediaIconName(socialMediaType);
                    const socialMediaIconUrl = `${this.socialIconsBasePath}/${iconName}`;
                    // const socialMediaIconUrl = Object.assign({}, link, {socialMediaIcon: this.socialIcons + '/' + iconName});
                    // console.log('socialMediaIconUrl : ',JSON.stringify(socialMediaIconUrl));

                    return {
                        socialMediaIcon: socialMediaIconUrl,
                        socialMediaLink,
                        socialMediaType
                    };
                }

                return null; 
            }).filter(Boolean); 

            // Additional logic or processing if needed
        } else if (error) {
            console.error('Error:', error);
        }
    })

  }



  // handleMessage(eventMessage) {
  //   this.selectedEventId = eventMessage.eventId;
  //   console.log('handleMessage : ', this.selectedEventId);
  //   getFooterItems({ recordType: 'Footer_Navigation' , eventId:this.selectedEventId}).then(data=>{
  //      if (data) {
  //           data.forEach(link => {
  //             const iconName = link.socialMediaIcon;
  //             let socialLink = Object.assign({}, link, {socialMediaIcon: this.socialIcons + '/' + iconName});
  //             this.socialLinks.push(socialLink);

  //           });
  //      }
  //   })

  // }



  isValidSocialLink(socialMediaLink, socialMediaType) {
        const lowerCasedLink = socialMediaLink.toLowerCase();

        if (
            (lowerCasedLink.includes('linkedin') && socialMediaType === 'LinkedIn') ||
            (lowerCasedLink.includes('facebook') && socialMediaType === 'Facebook') ||
            (lowerCasedLink.includes('twitter') && socialMediaType === 'Twitter') ||
            (lowerCasedLink.includes('instagram') && socialMediaType === 'Instagram')
        ) {
            return true;
        }

        return false;
    }

    getSocialMediaIconName(socialMediaType) {
           switch (socialMediaType) {
            case 'Facebook':
                return 'facebook.png';
            case 'Twitter':
                return 'twitter.png';
            case 'LinkedIn':
                return 'linkedin.png';
            case 'Instagram':
                return 'instagram.png';
            default:
                return 'default-icon.png'; 
        }
    }




  connectedCallback() {
    this.subscribeToMessageChannel();
  }
}