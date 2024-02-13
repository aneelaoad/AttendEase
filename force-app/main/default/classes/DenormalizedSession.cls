/**
* @author: Muhammad Raza
* @description: This Class representing denormalized information about a session.
* @since: 01/01/24
* @Last Modified by: Muhammad Raza
*/
public with sharing class DenormalizedSession {

    @AuraEnabled 
	public String sessionTitle;
    @AuraEnabled 
	public String sessionDescription;
    @AuraEnabled    
	public Date sessionStartDate;
    @AuraEnabled
	public Date sessionEndDate;
    @AuraEnabled
	public String sessionStartTime;
    @AuraEnabled
	public String sessionEndTime;
    @AuraEnabled
	public String sessionDuration;
    @AuraEnabled
	public List<DenormalizedSpeaker> lstOfSpeakers;

    public DenormalizedSession(){}
}