public class QuestionSelector {

@AuraEnabled(cacheable=true)
public static List<Question__C> getQuestionsList(String eventId){
        String query = 'SELECT Id, Name, Question__c, Question_Type__c, '
        +'(SELECT Id, Option__c FROM Question_Options__r) '      
        +'FROM Question__c WHERE Event__c = \''+eventId + '\'';
        List<Question__C> result = Database.query(String.valueof(query));
        System.debug(result);
        return result;
    }
}