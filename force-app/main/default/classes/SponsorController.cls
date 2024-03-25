/**
* @author: Muhammad Raza
* @description: A controller class for retrieving denormalized sponsor information.
* @since: 31/01/24
* @Last Modified by:  Muhammad Faraz
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


     /**
      * @description registers sponsor for events
      * @param sponsorInfo 
      */
     @AuraEnabled
    public static void registerSponsor(String sponsorInfo) {
      DenormalizedSponsor denormalizedsponsorInfo = (DenormalizedSponsor) JSON.deserialize(sponsorInfo, DenormalizedSponsor.class);
      System.debug('sponsorInfo ---> '+ sponsorInfo);
      System.debug('denormalizedsponsorInfo ---> '+ denormalizedsponsorInfo);
    
    //  DenormalizedSession denormalizedSession =  denormalizedsponsorInfo.sessionInfo;
    

    if (sponsorExistsForEvent(denormalizedsponsorInfo.sponsorEmail, denormalizedsponsorInfo.eventId)) {
        throw new CustomException('A Sponsor with the same email already exists.');
   
       }
        Sponsor__c newSponsor = new Sponsor__c(
            Name = denormalizedsponsorInfo.sponsorName,
            Company_Name__c=denormalizedsponsorInfo.companyName,
            Industry__c=denormalizedsponsorInfo.companyIndustry,
            Sponsor_Title__c =denormalizedsponsorInfo.sponsorTitle,
            Company_Type__c=denormalizedsponsorInfo.companyType,
            Email__c=denormalizedsponsorInfo.sponsorEmail,
            Company_Website__c=denormalizedsponsorInfo.companyWebsite,
            Sponsor_Image__c = denormalizedsponsorInfo.sponsorImage,
            Company_HQ__c=denormalizedsponsorInfo.companyAddress,
            Sponsorship_Level__c= denormalizedsponsorInfo.sponsorshipLevel,
            Sponsor_Phone__c= denormalizedsponsorInfo.companyPhone,
            Company_Description__c= denormalizedsponsorInfo.companyDescription,
            Event__c = denormalizedsponsorInfo.eventId
             // Speaker_Information__c = denormalizedsponsorInfo.speakerInformation,
        );
        system.debug(newSponsor);
         insert newSponsor;
        
        // // Create Event Speaker record
        // Event_Speaker__c newEventSpeaker = new Event_Speaker__c(
        //     Event__c = denormalizedspeakerInfo.eventId,
        //     Speaker__c = newSpeaker.Id
        // );
        // insert newEventSpeaker;

        // Session__c newSession = new Session__c(
        //     Event__c = denormalizedspeakerInfo.eventId,
        //     Session_Title__c = denormalizedSession.sessionTitle,
        //     Session_Description__c = denormalizedSession.sessionDescription,
        //     Session_Start_Date__c = denormalizedSession.sessionStartDate,
        //     Session_End_Date__c = denormalizedSession.sessionEndDate,
        //     Session_Start_Time__c = Time.newInstance(Integer.valueOf(denormalizedSession.sessionStartTime.split(':')[0]), Integer.valueOf(denormalizedSession.sessionStartTime.split(':')[1]), 0 ,0),
        //     Session_End_Time__c = Time.newInstance(Integer.valueOf(denormalizedSession.sessionEndTime.split(':')[0]), Integer.valueOf(denormalizedSession.sessionEndTime.split(':')[1]), 0 ,0)
        // );
        // insert newSession;
}

private static Boolean sponsorExistsForEvent(String email, Id eventId) {
    // Query Sponsor__c records for the given email and event
    Integer count = [SELECT COUNT()  FROM Sponsor__c WHERE Email__c = :email AND Event__c=:eventId];

    // Integer juncCount  = [SELECT COUNT() FROM Event_Speaker__c WHERE Event__r.id=:eventid AND Speaker__r.Email__c=:email];
    return count > 0 ;
    
}

public class CustomException extends Exception {}

}