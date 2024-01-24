public with sharing class SessionController {

    @AuraEnabled(cacheable=true)
    public static List<DenormalizedSession> getSession(String eventId){
        List<Session__c> sessionList = SessionSelector.getSessions(eventId);
        List<DenormalizedSession> denormalizedSessionList = new List<DenormalizedSession>();
      
        for (Session__c session : sessionList) {
            DenormalizedSession denormalizedSession = new DenormalizedSession();
            denormalizedSession.sessionTitle = session.Session_Title__c;
            denormalizedSession.sessionDescription = session.Session_Description__c;
            denormalizedSession.sessionStartDate = session.Session_Start_Date__c;
            denormalizedSession.sessionEndDate = session.Session_End_Date__c;
            denormalizedSession.sessionDuration = session.Session_Duration__c;
            
            DateTime sessionStartTime = DateTime.newInstance(session.Session_Start_Date__c, session.Session_Start_Time__c);
            denormalizedSession.sessionStartTime = sessionStartTime.format('hh:mm a');
            
            DateTime sessionEndTime = DateTime.newInstance(session.Session_End_Date__c, session.Session_End_Time__c);
            denormalizedSession.sessionEndTime = sessionEndTime.format('hh:mm a');

            // Get Speaker Names for the current session
            denormalizedSession.speakerNames = SessionSelector.getSessionSpeakersName(new List<Id>{session.Id});

            denormalizedSessionList.add(denormalizedSession);
        }

        System.debug(denormalizedSessionList);
        return denormalizedSessionList;
    }
}