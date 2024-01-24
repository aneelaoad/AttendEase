public with sharing class GetCompanyInformationSelector {
   public static List<Case> getCompanyInformations(){
    String query = 'SELECT Id,SuppliedEmail,Description,Subject,SuppliedName,SuppliedPhone '
    + 'FROM Case';
    List<Case> result = Database.query(query);
    System.debug('Case List: ' + result);
    return result;
   }
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