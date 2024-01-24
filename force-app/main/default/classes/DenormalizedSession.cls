public with sharing class DenormalizedSession {

    @AuraEnabled public String sessionTitle;
    @AuraEnabled public String sessionDescription;
    @AuraEnabled public Date sessionStartDate;
    @AuraEnabled public Date sessionEndDate;
    @AuraEnabled public String sessionStartTime;
    @AuraEnabled public String sessionEndTime;
    @AuraEnabled public String sessionDuration;
    @AuraEnabled public List<String> speakerNames;
}