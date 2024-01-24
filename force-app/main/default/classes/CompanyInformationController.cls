public with sharing class CompanyInformationController {
    @AuraEnabled(cacheable=true)
    public static List<GetCompanyInformation> getCompanyInfo(){
        List<Case> caseList = GetCompanyInformationSelector.getCompanyInformations();
        Id orgId = GetCompanyInformationSelector.getOrgId();
        String orgUrl = GetCompanyInformationSelector.getOrgUrl();
        List<GetCompanyInformation> denormalizedCaseList = new List<GetCompanyInformation>();

        for (Case cas : caseList) {
            GetCompanyInformation denormalizedCase = new GetCompanyInformation();
            denormalizedCase.companyEmail = cas.SuppliedEmail;
            denormalizedCase.subject = cas.Subject;
            denormalizedCase.userName = cas.SuppliedName;
            denormalizedCase.contact = cas.SuppliedPhone;
            denormalizedCase.description = cas.Description;
            denormalizedCase.orgId = orgId; 
            denormalizedCase.orgUrl = orgUrl; 

            denormalizedCaseList.add(denormalizedCase);
        }

        System.debug(denormalizedCaseList);
        return denormalizedCaseList;
    }
}