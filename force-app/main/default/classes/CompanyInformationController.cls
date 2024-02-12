public with sharing class CompanyInformationController {
    @AuraEnabled(cacheable=true)

    public static List<CompanyInformation> getCompanyInfo(){
        
        Id orgId = CompanyInformationSelector.getOrgId();
        String orgUrl = CompanyInformationSelector.getOrgUrl();
        List<CompanyInformation> denormalizedCaseList = new List<CompanyInformation>();
        
            CompanyInformation denormalizedCase = new CompanyInformation();
           
            denormalizedCase.orgId = orgId;
            denormalizedCase.orgUrl = orgUrl;
            denormalizedCaseList.add(denormalizedCase);

            System.debug(denormalizedCaseList);

        return denormalizedCaseList;

    }
        
}