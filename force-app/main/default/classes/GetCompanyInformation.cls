public with sharing class GetCompanyInformation {
    @AuraEnabled public Id orgId;
    @AuraEnabled public String orgUrl;
    @AuraEnabled public String companyEmail;
    @AuraEnabled public String subject;
    @AuraEnabled public String contact;
    @AuraEnabled public String description;
    @AuraEnabled public String userName;
}