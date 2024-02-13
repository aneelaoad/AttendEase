/**
* @author: Muhammad Raza
* @description: A controller class for retrieving denormalized sponsor information.
* @since: 31/01/24
* @Last Modified by:  Muhammad Raza
*/
public with sharing class SponsorController {
    
/**
* 
* @param eventId The ID of the event to filter sponsor records.
* @return List<DenormalizedSponsor> A list of denormalized sponsor objects containing sponsor image URLs.
* @description: Retrieves a list of denormalized sponsor information based on the specified event ID.
*/
    @AuraEnabled(cacheable=true)
    public static List<DenormalizedSponsor> getSponsor(String eventId){
        List<Sponsor__c> sponsorList =new SponsorSelector().getSponsorsByEventId(eventId);
        List<DenormalizedSponsor> denormalizedSponsorList = new List<DenormalizedSponsor>();
        
        for (Sponsor__c sponsor : sponsorList) {
            DenormalizedSponsor denormalizedSponsor = new DenormalizedSponsor();
            denormalizedSponsor.sponsorImage = sponsor.Sponsor__r.Logo__c;
            denormalizedSponsorList.add(denormalizedSponsor);
        }
 
        return denormalizedSponsorList;
    }
}