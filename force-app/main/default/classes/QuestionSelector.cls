public class QuestionSelector {

@AuraEnabled(cacheable=true)
public static List<Question__C> getQuestionsList(String eventId){
        String query = 'SELECT Id, Name, Question__c FROM Question__c WHERE Event__c = \''+eventId + '\'';
        // String query = 'SELECT Question__c FROM FAQ__c WHERE Event__c =\''+eventId + '\'';
        List<Question__C> result = Database.query(String.valueof(query));
        System.debug(result);
        return result;
    }
}