@isTest
public with sharing class EventTestDataFactory {
    public EventTestDataFactory() {

    }
    public static Event createEvent(String eventName, String eventTitle) {
        Event__c newEvent = new Event__c();
        newEvent.Name = eventName;
        newEvent.Event_Title__c = eventTitle;
        // Set other required fields for your event object
        return newEvent;
    }
}