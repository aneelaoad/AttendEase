/**
* @author: Muhammad Raza
* @description: Controller Class for handling speaker information.
* @created: 31/01/24
* @Last Modified by: Muhammad Raza
*/

public without sharing class SpeakerController {   
    
/**
* 
* @param eventId - The ID of the event for which to retrieve speaker information.
* @return  List<DenormalizedSpeaker> - A list of denormalized speaker information for the specified event.
* @description:This method calls the getSpeakerByEventId method from the EventSpeakerSelector class
*              to fetch a list of speakers for the specified event...
*/
    
    @AuraEnabled(cacheable=true)
    public static List<DenormalizedSpeaker> getSpeakers(String eventId){
        
        List<Speaker__c> speakersList = EventSpeakerSelector.getSpeakerByEventId(eventId);
        List<DenormalizedSpeaker> denormalizedSpeakerList = new List<DenormalizedSpeaker>();
        
        for (Speaker__c speaker : speakersList) {
            DenormalizedSpeaker denormalizedSpeaker = new DenormalizedSpeaker();
            denormalizedSpeaker.speakerName = speaker.Speaker_Name__c;
            denormalizedSpeaker.speakerInformation = speaker.Speaker_Information__c;
            denormalizedSpeaker.speakerContactNumber = speaker.Phone_Number__c;
            denormalizedSpeaker.speakerEmail = speaker.Email__c;
            denormalizedSpeaker.speakerImage = speaker.Speaker_Profile_Image__c;
            denormalizedSpeaker.speakerTitle = speaker.Speaker_title__c;
            denormalizedSpeakerList.add(denormalizedSpeaker);
        }
        return denormalizedSpeakerList;
    }



    // speaker registration 
     @AuraEnabled
    public static void registerSpeaker(String speakerInfo) {
      DenormalizedSpeaker denormalizedspeakerInfo = (DenormalizedSpeaker) JSON.deserialize(speakerInfo, DenormalizedSpeaker.class);
      System.debug('speakerInfo ---> '+ speakerInfo);
      System.debug('denormalizedspeakerInfo ---> '+ denormalizedspeakerInfo.sessionInfo);
      DenormalizedSession denormalizedSession =  denormalizedspeakerInfo.sessionInfo;

      if (speakerExistsForEvent(denormalizedspeakerInfo.speakerEmail, denormalizedspeakerInfo.eventId)) {
        throw new CustomException('A Speaker/Co-Speaker with the same email already exists.');
   
       }
      if (speakerExistsForEvent(denormalizedspeakerInfo.coSpeakerEmail, denormalizedspeakerInfo.eventId)) {
        throw new CustomException('A Speaker/Co-Speaker with the same email already exists.');
   
       }
      
      
      Speaker__c newSpeaker = new Speaker__c(
            Speaker_Name__c = denormalizedspeakerInfo.speakerName,
            Email__c = denormalizedspeakerInfo.speakerEmail,
            Speaker_Title__c =denormalizedspeakerInfo.speakerTitle,
            // Speaker_Profile_Image__c = denormalizedspeakerInfo.speakerImage,
            Speaker_Information__c = denormalizedspeakerInfo.speakerInformation,
            Company_Name__c = denormalizedspeakerInfo.companyName,
            Speaker_Role__c = denormalizedspeakerInfo.speakerRole,
            Speaker_Type__c = 'Primary Speaker',
            Primary__c = true
        );
        system.debug('speaker record'+newSpeaker);
        insert newSpeaker;
       system.debug(denormalizedspeakerInfo.speakerImageBlob);

       if( denormalizedspeakerInfo.speakerImage!=''){
        ContentVersion cvSpeaker = createContentVersion(denormalizedspeakerInfo.speakerImageBlob, denormalizedspeakerInfo.speakerImage);
        ContentDocumentLink cdlSpeaker = createContentLink(cvSpeaker.Id, newSpeaker.Id);
       }


        if(denormalizedspeakerInfo.hasCoSpeaker){
            Speaker__c newCoSpeaker = new Speaker__c(
            Speaker_Name__c = denormalizedspeakerInfo.coSpeakerName,
            Speaker_Title__c =denormalizedspeakerInfo.coSpeakerTitle,
            // Speaker_Profile_Image__c = denormalizedspeakerInfo.coSpeakerImage,
            Speaker_Role__c = denormalizedspeakerInfo.coSpeakerRole,
            Email__c = denormalizedspeakerInfo.coSpeakerEmail,
            Speaker_Type__c = 'Co-Speaker',
            Primary__c=false,
            Parent_Speaker__c=newSpeaker.id
            );
            system.debug(newCoSpeaker);
           insert newCoSpeaker;
          if( denormalizedspeakerInfo.coSpeakerImage!=''){
            ContentVersion cvCoSpeaker = createContentVersion(denormalizedspeakerInfo.coSpeakerImageBlob, denormalizedspeakerInfo.coSpeakerImage);
           ContentDocumentLink cdlCoSpeaker = createContentLink(cvCoSpeaker.Id, newCoSpeaker.Id);
          }
           
        }
        
        // Create Event Speaker record
        Event_Speaker__c newEventSpeaker = new Event_Speaker__c(
            Event__c = denormalizedspeakerInfo.eventId,
            Speaker__c = newSpeaker.Id
        );
        insert newEventSpeaker;
        EventSelector selectedEvent = new EventSelector();
        // List<Event__c> currentEvent =selectedEvent.getEvents(denormalizedspeakerInfo.eventId);
        system.debug('eventid'+denormalizedspeakerInfo.eventId);
        String currentEventid =EventSelector.getDubaiDreaminEvent();
        Event__c currentEvent =selectedEvent.getEventById(denormalizedspeakerInfo.eventId);
        Time sessionStartDummyTime = Time.newInstance(12, 0, 0, 0);

        Session__c newSession = new Session__c(
            Event__c = denormalizedspeakerInfo.eventId,
            Session_Title__c = denormalizedSession.sessionTitle,
            Session_Description__c = denormalizedSession.sessionDescription,
            Session_Start_Date__c =currentEvent.Event_Start_Date_and_Time__c.date() ,
            Session_End_Date__c = currentEvent.Event_End_Date_and_Time__c.date(),

            // Session_Start_Date__c = denormalizedSession.sessionStartDate,
            // Session_End_Date__c = denormalizedSession.sessionEndDate,
            Session_Start_Time__c = sessionStartDummyTime ,
            Session_End_Time__c =sessionStartDummyTime.addMinutes(45),
            // Session_Start_Time__c = Time.newInstance(Integer.valueOf(denormalizedSession.sessionStartTime.split(':')[0]), Integer.valueOf(denormalizedSession.sessionStartTime.split(':')[1]), 0 ,0),
            // Session_End_Time__c = Time.newInstance(Integer.valueOf(denormalizedSession.sessionEndTime.split(':')[0]), Integer.valueOf(denormalizedSession.sessionEndTime.split(':')[1]), 0 ,0),
            Session_Track__c = denormalizedSession.sessionTrack
            
        );
        insert newSession;


        Session_Speaker__c newSessionSpeaker = new Session_Speaker__c(
            Session__c = newSession.Id,
            Speaker__c = newSpeaker.Id
        );
        insert newSessionSpeaker;
    }

    // Helper method to check if an attendee with the same email already exists for the event
private static Boolean speakerExistsForEvent(String email, Id eventId) {
    // Query Speaker__c records for the given email and event
    Integer count = [SELECT COUNT()  FROM Speaker__c WHERE Email__c = :email ];

    Integer juncCount  = [SELECT COUNT() FROM Event_Speaker__c WHERE Event__r.id=:eventid AND Speaker__r.Email__c=:email];
    return count > 0 && juncCount >0;
    
}
private static ContentVersion createContentVersion(String base64, String filename) {
    ContentVersion cv = new ContentVersion();
    cv.VersionData = EncodingUtil.base64Decode(base64);
    cv.Title = filename;
    cv.PathOnClient = filename;
    try {
      insert cv;
      return cv;
    } catch(DMLException e) {
      System.debug(e);
      return null;
    }
  }

  
  private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
              if (contentVersionId == null || recordId == null) { return null; }
                ContentDocumentLink cdl = new ContentDocumentLink();
                cdl.ContentDocumentId = [  SELECT ContentDocumentId  FROM ContentVersion  WHERE Id =: contentVersionId ].ContentDocumentId;
                cdl.LinkedEntityId = recordId;
                // ShareType is either 'V', 'C', or 'I'
                // V = Viewer, C = Collaborator, I = Inferred
                cdl.ShareType = 'V';
                try {
                  insert cdl;
                  return cdl;
                } catch(DMLException e) {
                  System.debug(e);
                  return null;
                }
              }

    public class CustomException extends Exception {}
}