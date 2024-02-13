/**
* @author: Muhammad Raza
* @description: Apex class for retrieving session information.
* @since: 01/01/24
* @Last Modified by:  Muhammad Raza
*/

public with sharing class SessionSelector {
    
 /**
* @author: Muhammad Raza
* @param whereClause - An optional WHERE clause to filter sessions.
* @return List<Session__c> - A list of sessions that meet the specified criteria.
* @description: This method constructs a dynamic SOQL query to fetch sessions with specified fields.
*                WHERE clause is optional and can be used for additional filtering.
*/
    
    public  List<Session__c> getSessionsList(String whereClause){
        String clause =  String.IsEmpty(whereClause)?'':'WHERE '+whereClause;
        String queryOnEventSpeaker = 'SELECT Id, Session_Title__c, Session_Start_Time__c, Session_End_Time__c, Session_Start_Date__c, Session_End_Date__c, Session_Duration__c, Session_Description__c, Event__r.Id '
            +' FROM Session__c '
            + clause  ;
        List<Session__c> lstofSessions = Database.query(queryOnEventSpeaker);
        return   lstofSessions;
    }
    
 /**
* @author: Muhammad Raza
* @param   eventId - The ID of the event to filter sessions.
* @return: List<Session__c> - A list of sessions associated with the specified event.
* @description: Retrieves a list of sessions associated with a specific event ID.
*               This method calls the getSessionsList method with a WHERE clause based 
*                on the event ID.
*/
    
    public  List<Session__c> getSessionsByEventId(String eventId){
        String clause = 'Event__r.Id = \''+eventId+'\' ';
        List<Session__c> sessions = getSessionsList(clause);
        
        if (sessions.size() > 0) {
            return sessions;
        }
        return null;    
    } 
}