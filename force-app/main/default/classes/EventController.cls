public with sharing class EventController {
    @AuraEnabled(cacheable=true)
  
   public static List<DenormalizedEvent> getDenormalizedEvent(String eventId){
        List<Event__c> eventsList = EventSelector.getEvents(eventId);
        List<DenormalizedEvent> denormalizedEventList = new List<DenormalizedEvent>();
              
         for (Event__c event : eventsList) {
        DenormalizedEvent denormalizedEvent = new DenormalizedEvent();
        denormalizedEvent.eventTitle= event.Event_Title__c;
        denormalizedEvent.aboutUsDescription = event.Event_Organizer_Company__r.About_Us_Description__c;
        denormalizedEvent.eventDescription = event.Event_Description__c;
        denormalizedEvent.bannerImage = event.Banner_Image__c;
        denormalizedEvent.eventCity = event.Event_Address__City__s;
        denormalizedEvent.eventCountry = event.Event_Address__CountryCode__s;
        denormalizedEvent.eventStreet = event.Event_Address__Street__s;
        denormalizedEvent.eventDateTime=event.Event_Start_Date_and_Time__c;
      
     

        denormalizedEventList.add(denormalizedEvent);
      
        }
         System.debug(denormalizedEventList);
        return denormalizedEventList;
       
    }

}