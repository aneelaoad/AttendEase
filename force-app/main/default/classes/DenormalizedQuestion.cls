public class DenormalizedQuestion {

    @AuraEnabled public string questionName;
    @AuraEnabled public string questionId;
    @AuraEnabled public string questionType;
    // @AuraEnabled public List<Question_Option__c> questionOptionList;
    @AuraEnabled public List<DenormalizedOption> questionOptionList;
    // @AuraEnabled public List<string> reponsesList;
    @AuraEnabled public Boolean showTextOptions;
    @AuraEnabled public Boolean showSingleSelectOptions;
    @AuraEnabled public Boolean showMultiSelectOptions;

// @AuraEnabled public List<string> questionTypes;
}