public class DenormalizedAttendee{
@AuraEnabled public string eventId;
@AuraEnabled public string firstName;
@AuraEnabled public string lastName;
@AuraEnabled public string email;
@AuraEnabled public List<DenormalizedResponse> responsesList;
@AuraEnabled public List<DenormalizedQuestion> questionsList;

}