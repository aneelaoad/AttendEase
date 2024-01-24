public with sharing class AttendeeRegistrationController {

  @AuraEnabled(cacheable=true)
  public static List<DenormalizedQuestion> getEventQuestions(String eventId) {
      List<DenormalizedQuestion> denormalizedQuestionsList = new List<DenormalizedQuestion>();
      List<Question__c> questionsList = QuestionSelector.getQuestionsList(eventId);

      for (Question__c question : questionsList) {
          DenormalizedQuestion denormalizedQuestion = new DenormalizedQuestion();
          denormalizedQuestion.questionName = question.Question__c;
          denormalizedQuestion.questionId = question.Id;
          denormalizedQuestion.questionType = question.Question_Type__c;
          denormalizedQuestion.showTextOptions = denormalizedQuestion.questionType == 'Text';
          denormalizedQuestion.showSingleSelectOptions = denormalizedQuestion.questionType == 'Single-Select';
          denormalizedQuestion.showMultiSelectOptions = denormalizedQuestion.questionType == 'Multi-Select';

          List<Question_Option__c> options = question.Question_Options__r;
          List<DenormalizedOption> denormalizedOptions = new List<DenormalizedOption>();

            for (Question_Option__c questionOption : options) {
             DenormalizedOption denormalizedOption = new   DenormalizedOption();
             denormalizedOption.questionId = question.Id ;
             denormalizedOption.option = questionOption.Option__c;
               
               denormalizedOptions.add(denormalizedOption);
            }

          denormalizedQuestion.questionOptionList = denormalizedOptions;
          denormalizedQuestionsList.add(denormalizedQuestion);
      }

      return denormalizedQuestionsList;
  }

  //  @AuraEnabled
  // public static void registerAttendee(String attendeeList) {
  //     DenormalizedAttendee denormalizedAttendeeInfo = (DenormalizedAttendee) JSON.deserialize(attendeeList, DenormalizedAttendee.class);

  //     List<DenormalizedResponse> responsesList = denormalizedAttendeeInfo.responsesList;
  //     List<String> responsesWithQuestionIds = new List<String>();

  //     Contact contact = new Contact();
  //     contact.FirstName = denormalizedAttendeeInfo.firstName;
  //     contact.LastName = denormalizedAttendeeInfo.lastName;
  //     contact.email = denormalizedAttendeeInfo.email;
  //     insert contact;

  //     Attendee__c attendee = new Attendee__c(
  //         Event__c = denormalizedAttendeeInfo.eventId,
  //         Attendee__c = contact.Id
  //     );
  //     insert attendee;

  //     for (DenormalizedResponse res : responsesList) {
  //         Question_Response__c response = new Question_Response__c();

  //         response.Question_Name__c = res.questionId;
  //         response.Response__c = res.response;
  //         response.Attendee__c = attendee.Id;
  //         insert response;
  //     }
  // }

  @AuraEnabled
  public static void registerAttendee(String attendeeList) {
      DenormalizedAttendee denormalizedAttendeeInfo = (DenormalizedAttendee) JSON.deserialize(attendeeList, DenormalizedAttendee.class);

      List<DenormalizedResponse> responsesList = denormalizedAttendeeInfo.responsesList;
      List<String> responsesWithQuestionIds = new List<String>();
        System.debug('attendee Info: '+denormalizedAttendeeInfo.email);
    
      List<Contact> existingContacts = [SELECT Id, Name FROM Contact WHERE Email =: denormalizedAttendeeInfo.email];
    // System.debug('existingContact: '+existingContact);
    System.debug('responsesList: '+responsesList);
    System.debug('responsesWithQuestionIds: '+responsesWithQuestionIds);
    Contact existingContact;

    // Check for Contact
    // if contact does not exists it will create
    Id contactId;
    

    // for (Contact existingContact : existingContacts) {
    //   //code_block
    // }

    if (existingContacts.size() == 0 ) {
      Contact contact = new Contact();
      contact.FirstName = denormalizedAttendeeInfo.firstName;
      contact.LastName = denormalizedAttendeeInfo.lastName;
      contact.email = denormalizedAttendeeInfo.email;
        insert contact;
        contactId = contact.id;   


    } else {
      existingContact =existingContacts.get(0);
      contactId = existingContact.Id;
    }

        Attendee__c attendee = new Attendee__c(
          Event__c = denormalizedAttendeeInfo.eventId,
          Attendee__c = contactId
      );
      insert attendee;


      for (DenormalizedResponse res : responsesList) {
          Question_Response__c response = new Question_Response__c();

          response.Question_Name__c = res.questionId;
          response.Response__c = res.response;
          response.Attendee__c = attendee.Id;
          insert response;
      }
  
}
    
  }