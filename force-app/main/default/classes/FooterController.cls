public class FooterController {


//  @AuraEnabled(cacheable=true)
// public static List<DenormalizedFooter> getFooterItems(String recordType) {
     
         
//         List<Navigation_Control__c> headerNavigationItemList = NavigationControlSelector.getHeaderNavigationMenu(recordType);
//         List<DenormalizedFooter> denormalizedFooterItemsList = new List<DenormalizedFooter>();
 
    	 
//     for (Navigation_Control__c navigationItem : headerNavigationItemList) {
//       DenormalizedFooter denormalizedMenuItem = new DenormalizedFooter();

//        denormalizedMenuItem.socialMediaType = navigationItem.Social_Media_Type__c;
//       denormalizedMenuItem.socialMediaLink = navigationItem.Link_URL__c;

//       denormalizedFooterItemsList.add(denormalizedMenuItem);

//     }
   
//     	System.debug('denormalizedFooterItemsList' +denormalizedFooterItemsList);
//         return denormalizedFooterItemsList;
//     }
//   ------------

@AuraEnabled(cacheable=true)
public static List<DenormalizedFooter> getFooterItems(String recordType, String eventId) {
    List<Navigation_Control__c> headerNavigationItemList = NavigationControlSelector.getHeaderNavigationMenu(recordType, eventId);
    List<DenormalizedFooter> denormalizedFooterItemsList = new List<DenormalizedFooter>();
    StaticResource SOCIAL_ICONS = [SELECT  Name FROM StaticResource WHERE Name = 'SOCIAL_ICONS'];


    Map<String, String> socialMediaIconsMap = new Map<String, String>();
    
    List<Schema.PicklistEntry> picklistValues = Navigation_Control__c.Social_Media_Type__c.getDescribe().getPicklistValues();
    for (Schema.PicklistEntry pickVal : picklistValues) {
        System.debug('pickVal'+pickVal.getValue().toLowerCase());
        socialMediaIconsMap.put(pickVal.getValue(),  pickVal.getValue().toLowerCase() + '.png');
    }

    for (Navigation_Control__c navigationItem : headerNavigationItemList) {
        DenormalizedFooter denormalizedMenuItem = new DenormalizedFooter();

        denormalizedMenuItem.socialMediaType = navigationItem.Social_Media_Type__c;
        denormalizedMenuItem.socialMediaLink = navigationItem.Link_URL__c;
    
        if (socialMediaIconsMap.containsKey(navigationItem.Social_Media_Type__c)) {
            denormalizedMenuItem.socialMediaIcon = socialMediaIconsMap.get(navigationItem.Social_Media_Type__c);
        } 

        denormalizedFooterItemsList.add(denormalizedMenuItem);
    }

    System.debug('denormalizedFooterItemsList: ' + denormalizedFooterItemsList);
    return denormalizedFooterItemsList;
}

//-----------

   @AuraEnabled(cacheable=true)
    public static List<String> getSocialLinkTypes() {
        Schema.DescribeFieldResult fieldResult = Navigation_Control__c.Social_Media_Type__c.getDescribe();
        List<String> picklistValues = new List<String>();
        
        for (Schema.PicklistEntry picklistEntry : fieldResult.getPicklistValues()) {
            picklistValues.add(picklistEntry.getLabel());
        }
        getSocialMediaIcons(picklistValues);
        return picklistValues;
    }


    @AuraEnabled(cacheable=true)
    public static Map<String, String> getSocialMediaIcons(List<String> socialMediaTypes) {
        String staticResourceName = 'SOCIAL_ICONS';
        Map<String, String> socialIconsMap = new Map<String, String>{
            'Facebook' => 'facebook.png',
            'Twitter' => 'twitter.png',
            'LinkedIn' => 'linkedin.png'
        };

        Map<String, String> result = new Map<String, String>();
        for (String socialMediaType : socialMediaTypes) {
            if (socialIconsMap.containsKey(socialMediaType)) {
                String iconName = socialIconsMap.get(socialMediaType);

                String iconPath = '/resource/' + staticResourceName + '/icons/' + iconName;

                result.put(socialMediaType, URL.getSalesforceBaseUrl().toExternalForm() + iconPath);
            } else {
                result.put(socialMediaType, '');
            }
        }
		System.debug('' +result);
        return result;
    }
// @AuraEnabled(cacheable=true)
//     public static String getSocialMediaIcon(List<String> socialLinkType) {
//         // Assuming "social_icons" is the name of the static resource
//         String staticResourceName = 'social_icons';

//         // Define a map to map picklist values to corresponding icon names
//         Map<String, String> socialIconsMap = new Map<String, String>{
//             'Facebook' => 'facebook.png',
//             'Twitter' => 'twitter.png',
//             'LinkedIn' => 'linkedin.png'
//             // Add more mappings as needed
//         };

//         // Check if the picklist value exists in the map
//         if (socialIconsMap.containsKey(socialLinkType)) {
//             // Get the corresponding icon name
//             String iconName = socialIconsMap.get(socialLinkType);

//             // Return the name of the icon (to be used in the Lightning web component)
//             return iconName;
//         }

//         // If the picklist value doesn't match any known social media type, return a default icon or handle accordingly
//         return '';
//     }
}