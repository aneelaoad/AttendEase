public with sharing class SpeakerController {
    @AuraEnabled(cacheable=true)
    public static List<DenormalizedSpeaker> getSpeakers(String eventId){
        List<Speaker__c> speakersList = SpeakerSelector.getSpeakers(eventId);
        List<DenormalizedSpeaker> denormalizedSpeakerList = new List<DenormalizedSpeaker>();
      
        for (Speaker__c speaker : speakersList) {
            DenormalizedSpeaker denormalizedSpeaker = new DenormalizedSpeaker();
            denormalizedSpeaker.speakerName = speaker.Speaker_Name__c;
            denormalizedSpeaker.speakerInformation = speaker.Speaker_Information__c;
            denormalizedSpeaker.speakerContactNumber = speaker.Phone_Number__c;
            denormalizedSpeaker.speakerEmail = speaker.Email__c;
            denormalizedSpeaker.speakerImage = speaker.Speaker_Profile_Image__c;
            
            denormalizedSpeakerList.add(denormalizedSpeaker);
        }

        System.debug(denormalizedSpeakerList);
        return denormalizedSpeakerList;
    }
}