/**
 * 
 * @author Faraz
 * @since March 2024
 */
public class ApprovalProcessController {
    @AuraEnabled(cacheable=true)
    public static List<DenormalizedSession> getSessionTime(String recordId){

        // System.debug(recordId);
        // System.debug(startTime);
        // System.debug(endTime);

        ApprovalProcessSelector approvalProcessInstance = new ApprovalProcessSelector();
       
       
       
        List<ProcessInstanceWorkitem>  selectedProcessInstanceWorkItem =  approvalProcessInstance.getProcessInstanceWorkItemById(recordId);
       // String processInstanceId = [SELECT ProcessInstanceId, Id FROM ProcessInstanceWorkitem WHERE Id =:recordId].ProcessInstanceId;
      
        List<ProcessInstance> selectedProcessInstance =  approvalProcessInstance.getProcessInstanceById(selectedProcessInstanceWorkItem[0].ProcessInstanceId);
       
        // String speakerId = [SELECT Id, TargetObjectId  FROM ProcessInstance WHERE Id =: processInstanceId].TargetObjectId;
      
      
       SessionSpeakerSelector sessionSpeakerSelectorInstance = new SessionSpeakerSelector();
       List<Session_Speaker__c> selectedSessionSpeaker =  sessionSpeakerSelectorInstance.getSessionSpeakerBySpeakerId(selectedProcessInstance[0].TargetObjectId);
    // String sessionId = [SELECT Id, Speaker__c, Session__c FROM Session_Speaker__c Where Speaker__c = : speakerId]. Session__c; 
       
        
      SessionSelector sessionSelectorInstance = new SessionSelector();
      List<Session__c> selectedSessions =  sessionSelectorInstance.getSessionById(selectedSessionSpeaker[0].Session__c);
    //    Session__c currentSession  = [SELECT Id, Session_Start_Time__c, Session_End_Time__c From Session__c WHERE Id=:sessionId];
      
    //    System.debug(selectedSessions[0].Session_Start_Time__c);
    //    System.debug(selectedSessions[0].Session_End_Time__c);

    List<DenormalizedSession> sessionItemsList = new List<DenormalizedSession>();

       DenormalizedSession denormalizedSession = new DenormalizedSession();
       denormalizedSession.setSessionName(selectedSessions[0].Name); 
       denormalizedSession.setSessionTitle(selectedSessions[0].Session_Title__c); 
       denormalizedSession.setStartTime(String.valueof(selectedSessions[0].Session_Start_Time__c));
       denormalizedSession.setEndTime(String.valueof(selectedSessions[0].Session_End_Time__c));
    
       sessionItemsList.add(denormalizedSession);

       return sessionItemsList;
    }


    @AuraEnabled
    public static void setSessionTime(String sessionName, String sessionStartTime, String sessionEndTime){
      // System.debug(sessionName);
      // System.debug(sessionStartTime);
      // System.debug(sessionEndTime);

      // try{
      SessionSelector selectedSessionByName = new SessionSelector();

      List<Session__c> sessionList = selectedSessionByName.getSessionByName(sessionName);
      sessionList[0].Session_Start_Time__c= Time.newInstance(Integer.valueOf(sessionStartTime.split(':')[0]), Integer.valueOf(sessionStartTime.split(':')[1]), 0 ,0);
      sessionList[0].Session_End_Time__c= Time.newInstance(Integer.valueOf(sessionEndTime.split(':')[0]), Integer.valueOf(sessionEndTime.split(':')[1]), 0 ,0);
      // sessionList.add();
    System.debug(sessionList);
    Database.update(sessionList, true);
      // update sessionList;
    //  sessionList.add(new Session__c(Id=recordId, SessionStart));
      // }
      // catch(Exception e){

      //   throw new CustomException(e.getmessage());
      // }


    }

public class CustomException extends Exception {}

}