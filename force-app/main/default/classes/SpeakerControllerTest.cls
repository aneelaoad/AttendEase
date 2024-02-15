/**
* @author: Muhammad Raza
* @description: Test class for testing the SpeakerController class.
*               This class tests the functionality related to retrieving speakers for an event.
* @since: 01/02/24
* @Last Modified by: Muhammad Raza 
*/
@isTest
public with sharing class SpeakerControllerTest {
    
    /**
* @author: Muhammad Raza
* @description:  Test method to verify the functionality of the getSpeakers method.
*               It creates test data for event, session, speaker, and event speaker,
*               then verifies that the correct number of speakers is retrieved for the given event.
*/
    @isTest
    static void testingGetSpeakers(){
        Event__c testEvent = EventTestDataFactory.createEvent();
        Session__c testSession = EventTestDataFactory.createSession(testEvent);
        Speaker__c testSpeaker = EventTestDataFactory.createSpeaker(testEvent);
        
        Event_Speaker__c testEventSpeaker = EventTestDataFactory.createEventSpeaker(testEvent,testSpeaker);
        
        
        Test.startTest();
        List<DenormalizedSpeaker> result = SpeakerController.getSpeakers(testEvent.Id);
        Test.StopTest();
        Assert.areEqual(1, result.size(), 'Expected event list' );
    }
}