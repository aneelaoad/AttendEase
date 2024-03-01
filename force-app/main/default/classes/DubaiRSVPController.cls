/**
* @author: Aneela Oad
* @description: Manages the logic and functionality related to attendee registration.
* @since: 22/02/24
* @Last Modified by: Aneela Oad
*/
public class DubaiRSVPController {

   /**
  * @author: Aneela Oad
  * @description: Handles registration of attendee along with his/her payment
  * @param  String attendeeInfo
  * @return: void
  */
   @AuraEnabled
  public static void registerAttendee(String attendeeInfo) {
      DenormalizedAttendee denormalizedAttendeeInfo = (DenormalizedAttendee) JSON.deserialize(attendeeInfo, DenormalizedAttendee.class);
      System.debug('attendeeInfo ---> '+ denormalizedAttendeeInfo);
      List<DenormalizedResponse> responsesList = denormalizedAttendeeInfo.responsesList;
      List<String> responsesWithQuestionIds = new List<String>();
    
      List<Contact> existingContacts = ContactSelector.getContacts(denormalizedAttendeeInfo.email);
    Contact existingContact;

    Id contactId;

    if (existingContacts.size() == 0 ) {
        Contact contact = new Contact();
        contact.FirstName = denormalizedAttendeeInfo.firstName;
        contact.LastName = denormalizedAttendeeInfo.lastName;
        contact.email = denormalizedAttendeeInfo.email;
        if(Schema.sObjectType.Contact.isCreateable()){
          insert contact;
        }
          contactId = contact.id;  
      
    } 
    else {
      existingContact =existingContacts.get(0);
      contactId = existingContact.Id;
    }
    Attendee__c attendee = new Attendee__c(
      Event__c = denormalizedAttendeeInfo.eventId,
      Attendee__c = contactId,
      TransactionID__c = denormalizedAttendeeInfo.transactionID,
      Amount__c = denormalizedAttendeeInfo.amount
    );
    if( Schema.sObjectType.Attendee__c.isCreateable()) {
      insert attendee;
    }
      
  
 
      
       
}
    
}