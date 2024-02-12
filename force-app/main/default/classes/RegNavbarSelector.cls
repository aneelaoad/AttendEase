public class RegNavbarSelector {
   @AuraEnabled(cacheable=true)
    public static List<REG_NAVBAR__mdt> getNavbarItems() {
        String query = 'SELECT MasterLabel, Id, Order__c FROM REG_NAVBAR__mdt ORDER BY Order__c NULLS LAST';
        List<REG_NAVBAR__mdt> result = Database.query(query);
        return result;
}
}