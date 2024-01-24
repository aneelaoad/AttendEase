public with sharing class SponsorSelector {
    public static List<Sponsor__c> getSponsor(String eventId){
        String query ='SELECT  Id,Sponsor__r.Name,Sponsor__r.Logo__c,Event__r.Id '
         +' FROM Sponsor__c '
          + 'WHERE Event__r.Id = \'' + eventId + '\'';  
            
         List<Sponsor__c> result= Database.query(query);	
         System.debug('Sponsor Information'+result);
            return result;
        }
}