public with sharing class AttendeeRegistrationController {


    @AuraEnabled
public static Contact registerAttendee(Contact con, String eventId, String questionId,String response) {
       upsert con;

      Attendee__c newAttendee = new Attendee__c(
            Event__c = eventId,  
            Attendee__c = con.Id
        );
        insert newAttendee;

 Question_Response__c newResponse = new Question_Response__c( Question_Name__c = questionId, Response__c = response, attendee__c = newAttendee.Id);
  insert newResponse;
    System.debug('new attendee-->'+newAttendee);
    System.debug('new response-->'+newResponse);

    return con;
}

    @AuraEnabled(cacheable=true)
    public static List<DenormalizedQuestion>  getEventQuestions(String eventId) {
        
        List<DenormalizedQuestion> denormalizedQuestionsList = new List<DenormalizedQuestion>();
        List<Question__c> questionsList = QuestionSelector.getQuestionsList(eventId);
        for (Question__c question : questionsList) {
        DenormalizedQuestion denormalizedQuestion = new DenormalizedQuestion();
                denormalizedQuestion.questionName = question.Question__c;
                denormalizedQuestion.questionId = question.Id;

            denormalizedQuestionsList.add(denormalizedQuestion);
        }
        return denormalizedQuestionsList;
        
    }
}