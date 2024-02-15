/**
* @author: Muhammad Raza
* @description: Controller Class for handling speaker information.
* @created: 31/01/24
* @Last Modified by: Muhammad Raza
*/

public with sharing class SpeakerController {   
    
/**
* 
* @param eventId - The ID of the event for which to retrieve speaker information.
* @return  List<DenormalizedSpeaker> - A list of denormalized speaker information for the specified event.
* @description:This method calls the getSpeakerByEventId method from the EventSpeakerSelector class
*              to fetch a list of speakers for the specified event.
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
      System.debug('denormalizedspeakerInfo ---> '+ denormalizedspeakerInfo);
      DenormalizedSession denormalizedSession =  denormalizedspeakerInfo.sessionInfo;

        Speaker__c newSpeaker = new Speaker__c(
            Speaker_Name__c = denormalizedspeakerInfo.speakerName,
            Speaker_Title__c =denormalizedspeakerInfo.speakerTitle,
            Speaker_Profile_Image__c = denormalizedspeakerInfo.speakerImage,
            Speaker_Information__c = denormalizedspeakerInfo.speakerInformation
        );
        insert newSpeaker;
        
        // Create Event Speaker record
        Event_Speaker__c newEventSpeaker = new Event_Speaker__c(
            Event__c = denormalizedspeakerInfo.eventId,
            Speaker__c = newSpeaker.Id
        );
        insert newEventSpeaker;

        Session__c newSession = new Session__c(
            Event__c = denormalizedspeakerInfo.eventId,
            Session_Title__c = denormalizedSession.sessionTitle,
            Session_Description__c = denormalizedSession.sessionDescription,
            Session_Start_Date__c = denormalizedSession.sessionStartDate,
            Session_End_Date__c = denormalizedSession.sessionEndDate,
            Session_Start_Time__c = Time.newInstance(Integer.valueOf(denormalizedSession.sessionStartTime.split(':')[0]), Integer.valueOf(denormalizedSession.sessionStartTime.split(':')[1]), 0 ,0),
            Session_End_Time__c = Time.newInstance(Integer.valueOf(denormalizedSession.sessionEndTime.split(':')[0]), Integer.valueOf(denormalizedSession.sessionEndTime.split(':')[1]), 0 ,0)
        );
        insert newSession;


        Session_Speaker__c newSessionSpeaker = new Session_Speaker__c(
            Session__c = newSession.Id,
            Speaker__c = newSpeaker.Id
        );
        insert newSessionSpeaker;
    }
}