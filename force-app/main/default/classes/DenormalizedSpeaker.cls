/**
* @author: Muhammad Raza
* @description: This class representing denormalized information about a speaker
* @created: 31/01/24
* @Last Modified by:  Muhammad Raza
*/
public with sharing class DenormalizedSpeaker {
    
   @AuraEnabled
    public String speakerName;
   @AuraEnabled 
    public String speakerInformation;
   @AuraEnabled
    public String speakerEmail;
   @AuraEnabled
    public String speakerContactNumber;
   @AuraEnabled
    public String speakerImage;
   @AuraEnabled
    public String speakerTitle;

    public DenormalizedSpeaker(){}
}