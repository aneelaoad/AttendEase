/**
* @author: Aneela Oad
* @description: Handles the denormalization process for attendee data.
* @since: 11/12/23
* @Last Modified by: Aneela Oad
*/
public class DenormalizedAttendee{
@AuraEnabled public string eventId;
@AuraEnabled public string firstName;
@AuraEnabled public string lastName;
@AuraEnabled public string email;
@AuraEnabled public string transactionID;
@AuraEnabled public Decimal amount;
@AuraEnabled public List<DenormalizedResponse> responsesList;
@AuraEnabled public List<DenormalizedQuestion> questionsList;


public DenormalizedAttendee(){
    
}

}