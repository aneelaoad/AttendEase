public with sharing class SponsorController {
    @AuraEnabled(cacheable=true)
    public static List<DenormalizedSponsor> getSponsor(String eventId){
        List<Sponsor__c> sponsorList = SponsorSelector.getSponsor(eventId);
        List<DenormalizedSponsor> denormalizedSponsorList = new List<DenormalizedSponsor>();
      
        for (Sponsor__c sponsor : sponsorList) {
            DenormalizedSponsor denormalizedSponsor = new DenormalizedSponsor();
            denormalizedSponsor.sponsorName = sponsor.Sponsor__r.Name;
            denormalizedSponsor.sponsorImage = sponsor.Sponsor__r.Logo__c;
           denormalizedSponsorList.add(denormalizedSponsor);
        }

        System.debug(denormalizedSponsorList);
        return denormalizedSponsorList;
    }
}