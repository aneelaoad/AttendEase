public with sharing  class DenormalizedEvent {
  @AuraEnabled public String eventDescription;
  @AuraEnabled public String aboutUsDescription;
   @AuraEnabled public String bannerImage;
   @AuraEnabled public String company;
   @AuraEnabled public String companyLogo;
   @AuraEnabled public String eventTitle;
   @AuraEnabled public String eventCity;
   @AuraEnabled public String eventCountry;
   @AuraEnabled public String eventStreet;
   @AuraEnabled public DateTime eventDateTime;
 
  @AuraEnabled public String titleWarning = 'Title is missing';
  @AuraEnabled public String descriptionWarning = 'Description is missing';
  @AuraEnabled public String dateTimeWarning = 'N/A.';
  @AuraEnabled public String locationWarning= 'N/A.';
  @AuraEnabled public String bannerImageWarning= 'Banner image is missing.';


}