public with sharing class SessionSelector {
    public static List<Session__c> getSession(String eventId){
        String query ='SELECT  Id,Session_Title__c,Session_Start_Time__c,Session_End_Time__c,Session_Start_Date__c,Session_End_Date__c,Session_Duration__c,Session_Description__c,Event__r.Id '
         +' FROM Session__c '
          + 'WHERE Event__r.Id = \'' + eventId + '\'';
            
         List<Session__c> result= Database.query(query);	
         System.debug('Session Information'+result);
            return result;
        }
}