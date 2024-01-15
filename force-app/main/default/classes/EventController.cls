public without sharing class EventController {
    @AuraEnabled(cacheable=true)
  
   public static List<DenormalizedEvent> getDenormalizedEvent(String eventId){
      //  String eventId = 'a021m00001cOhvpAAC';
        List<Event__c> eventsList = EventSelector.getEvents(eventId);
        List<DenormalizedEvent> denormalizedEventList = new List<DenormalizedEvent>();
        DateTime eventDateTime;
        
         for (Event__c event : eventsList) {
        DenormalizedEvent denormalizedEvent = new DenormalizedEvent();
        denormalizedEvent.eventTitle= event.Event_Title__c;
        denormalizedEvent.aboutUsDescription = event.Event_Organizer_Company__r.About_Us_Description__c;
        denormalizedEvent.eventDescription = event.Event_Description__c;
        denormalizedEvent.bannerImage = event.Banner_Image__c;
        denormalizedEvent.eventLocation = event.Event_Address__City__s;
        denormalizedEvent.eventDateTime=event.Event_Start_Date_and_Time__c;
        eventDateTime= event.Event_Start_Date_and_Time__c;
        denormalizedEvent.eventDate = eventDateTime.date();
        denormalizedEvent.eventTime = eventDateTime.time();

        denormalizedEventList.add(denormalizedEvent);
      
        }
         System.debug(denormalizedEventList);
        return denormalizedEventList;
       
    }

}