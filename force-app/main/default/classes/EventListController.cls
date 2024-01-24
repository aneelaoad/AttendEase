public with sharing class EventListController {

     @AuraEnabled(cacheable=true)
    public static List<Event__c> getEvents() {
        return [SELECT Id, Name FROM Event__c];
    }
}