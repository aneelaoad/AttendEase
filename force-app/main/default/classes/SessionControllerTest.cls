/**
* @author: Muhammad Raza
* @description: Test class for testing the SessionController class.
*               This class tests the functionality related to retrieving sessions for an event.
* @since: 01/02/24
* @Last Modified by: Muhammad Raza
*/
@isTest
public with sharing class SessionControllerTest {
    /**
* @author: Muhammad Raza
* @description:  Test method to verify the functionality of the getSessions method.
*               It creates test data for event, session, speaker, and session speaker,
*               then verifies that the correct number of sessions is retrieved for the given event.
*/
    @isTest
    static void testingGetSessions(){
        // Create test event, session, and speaker
        Event__c testEvent = EventTestDataFactory.createEvent();
        Session__c testSession = EventTestDataFactory.createSession(testEvent);
        Speaker__c testSpeaker = EventTestDataFactory.createSpeaker(testEvent);
        Session_Speaker__c testSessionSpeaker = EventTestDataFactory.createSessionSpeaker(testSession,testSpeaker);
        
        new SessionSpeakerSelector().getSpeakersBySessionId(testSession.Id);
        
        Test.startTest();
        List<DenormalizedSession> result = SessionController.getSessions(testEvent.Id);
        Test.StopTest();
        Assert.areEqual(1, result.size(), 'Expected event list' );
    }
}