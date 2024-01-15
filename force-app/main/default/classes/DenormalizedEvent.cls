public with sharing class DenormalizedEvent {
  @AuraEnabled public String eventDescription;
  @AuraEnabled public String aboutUsDescription;
   @AuraEnabled public String bannerImage;
   @AuraEnabled public String company;
   @AuraEnabled public String companyLogo;
   @AuraEnabled public String eventTitle;
   @AuraEnabled public String eventLocation;
   @AuraEnabled public DateTime eventDateTime;
   @AuraEnabled public Date eventDate;
   @AuraEnabled public Time eventTime;
   //@AuraEnabled public String aboutUsDescription;
}