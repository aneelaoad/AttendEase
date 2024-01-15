public with sharing class SpeakerSelector {
    public static List<Speaker__c> getSpeakers(String eventId) {
        String queryOnEventSpeaker = 
            'SELECT Speaker__r.Id, Speaker__r.Speaker_Name__c, Speaker__r.Email__c, Speaker__r.Phone_Number__c, Speaker__r.Speaker_Information__c, Speaker__r.Speaker_Profile_Image__c ' +
            'FROM Event_Speaker__c ' +
            'WHERE Event__c = \'' + eventId + '\'';
        
        List<Event_Speaker__c> eventSpeakers = Database.query(queryOnEventSpeaker);
        List<Speaker__c> lstOfSpeakers = new List<Speaker__c>();
        
        for (Event_Speaker__c eventSpeaker : eventSpeakers) {
            Speaker__c speaker = eventSpeaker.Speaker__r;
            if (speaker != null) {
                lstOfSpeakers.add(speaker);
            }
        }
        System.debug('List Of Speakers'+lstOfSpeakers);
        return lstOfSpeakers;
    }
}