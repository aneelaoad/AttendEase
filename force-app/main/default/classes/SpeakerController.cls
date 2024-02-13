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
}