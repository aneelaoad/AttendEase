/**
* @author: Muhammad Raza
* @description: This Class representing denormalized information about a session.
* @since: 01/01/24
* @Last Modified by: Muhammad Raza
*/
public with sharing class DenormalizedSession {

    @AuraEnabled 
	public String sessionId;
    @AuraEnabled 
	public String sessionName;
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
	public String sessionTrack;
    @AuraEnabled
	public List<DenormalizedSpeaker> lstOfSpeakers;

    public DenormalizedSession(){}


    public void setSessionName(String sessionName){

        this.sessionName = sessionName;
    }
    public void setSessionId(String sessionId){

        this.sessionId = sessionId;
    }
    public void setStartTime(String sessionStartTime){

        this.sessionStartTime = sessionStartTime;
    }
    public void setEndTime(String sessionEndTime){

        this.sessionEndTime = sessionEndTime;
    }
    public void setSessionTitle(String sessionTitle){

        this.sessionTitle = sessionTitle;
    }
}