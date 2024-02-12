public with sharing class CompanyInformationSelector {
   public static Id getOrgId(){
    Id orgId = UserInfo.getOrganizationId();
    System.debug('OrgId'+orgId);
    return orgId;
   }
   public static String getOrgUrl(){
    string orgUrl = URL.getOrgDomainURL().toExternalForm();
    System.debug('orgUrl'+orgUrl);
    return orgUrl;
   }
}