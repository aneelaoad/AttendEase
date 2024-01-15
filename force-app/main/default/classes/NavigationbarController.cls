public class NavigationbarController {

  @AuraEnabled(cacheable=true)
public static List<DenormalizedNavigationControl> getNavigationItems(String recordType, String eventId) {
     
         
        List<Navigation_Control__c> headerNavigationItemList = NavigationControlSelector.getHeaderNavigationMenu(recordType, eventId);
        List<DenormalizedNavigationControl> denormalizedHeaderNavigationItemsList = new List<DenormalizedNavigationControl>();
 
    	 
    for (Navigation_Control__c navigationItem : headerNavigationItemList) {
      DenormalizedNavigationControl denormalizedMenuItem = new DenormalizedNavigationControl();

      denormalizedMenuItem.companyLogo = navigationItem.Event__r.Event_Organizer_Company__r.Logo__c;
      denormalizedMenuItem.menuTab = navigationItem.Menu_Item_Name__c;
      denormalizedMenuItem.section = navigationItem.Section__c;
      denormalizedMenuItem.socialMediaType = navigationItem.Social_Media_Type__c;
      denormalizedMenuItem.socialMediaLink = navigationItem.Link_URL__c;

      denormalizedHeaderNavigationItemsList.add(denormalizedMenuItem);

    }
   
    	System.debug('denormalizedHeaderNavigationItemsList' +denormalizedHeaderNavigationItemsList);
        return denormalizedHeaderNavigationItemsList;
    }
    
}