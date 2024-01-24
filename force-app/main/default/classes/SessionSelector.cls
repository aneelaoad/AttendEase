public with sharing class SessionSelector {
   public static List<id> lstOfSessionId=new  List<id>();
    public static List<String> lstOfAllSpeker=new List<String>();
    public static List<Session__c> getSessions(String eventId){
        String query ='SELECT Id, Session_Title__c, Session_Start_Time__c, Session_End_Time__c, Session_Start_Date__c, Session_End_Date__c, Session_Duration__c, Session_Description__c, Event__r.Id '
         +' FROM Session__c '
          + 'WHERE Event__r.Id = \'' + eventId + '\'';
            
        List<Session__c> result = Database.query(query);   
        for(Session__c s:result){
            lstOfSessionId.add(s.Id);
        }
        System.debug('Session Information'+result);
        return result;
    }
      public static List<String> getSessionSpeakersName(List<Id> lstOfSessionId){
        String query ='SELECT Id, Speaker__r.Speaker_Name__c FROM Session_Speaker__c WHERE Session__c IN :lstOfSessionId';

        List<Session_Speaker__c> result = Database.query(query);    
        System.debug('Session Speaker Information'+result);

        List<String> lstOfAllSpeaker = new List<String>();
        for(Session_Speaker__c sp : result){
            lstOfAllSpeaker.add(sp.Speaker__r.Speaker_Name__c);
        }
        return lstOfAllSpeaker;
    }
}