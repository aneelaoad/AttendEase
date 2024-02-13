/**
* @author: Muhammad Raza
* @description:  This class representing denormalized information about a sponsor
* @since: 31/01/24
* @Last Modified by: Muhammad Raza
*/
public with sharing class DenormalizedSponsor {
    
    @AuraEnabled 
    public String sponsorImage;
    
    public DenormalizedSponsor(){}
    
}