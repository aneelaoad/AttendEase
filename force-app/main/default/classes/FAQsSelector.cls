public class FAQsSelector { 

    public static List<FAQ__c> getFAQs(String eventId){
        String query = 'SELECT Question__c, Answer__c FROM FAQ__c WHERE Event__c =\''+eventId + '\'';
        List<FAQ__c> result = Database.query(String.valueof(query));
        System.debug(result);
        return result;
    }
}