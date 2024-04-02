trigger SpeakerTrigger on Speaker__c (after update) {


    SpeakerHandler.approvalAction(Trigger.new);
}