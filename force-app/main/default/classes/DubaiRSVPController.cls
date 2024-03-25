/**
* @author: Aneela Oad
* @description: Manages the logic and functionality related to attendee registration.
* @since: 22/02/24
* @Last Modified by: Aneela Oad
*/
public without sharing class DubaiRSVPController {

    /**
    * @author: Aneela Oad
    * @description: Handles registration of attendee along with his/her payment
    * @param  String attendeeInfo
    * @return: void
    */
   @AuraEnabled
public static String registerAttendee(String attendeeInfo) {
    System.debug('attendeeInfo ---> '+ attendeeInfo);

    DenormalizedAttendee denormalizedAttendeeInfo = (DenormalizedAttendee) JSON.deserialize(attendeeInfo, DenormalizedAttendee.class);
    System.debug('denormalizedAttendeeInfo ---> '+ denormalizedAttendeeInfo);
   List<DenormalizedTicket> ticketsList = denormalizedAttendeeInfo.ticketsList;
   // System.debug('ticketsList ---> '+ ticketsList);

 
    if (attendeeExistsForEvent(denormalizedAttendeeInfo.email, denormalizedAttendeeInfo.eventId)) {
     throw new CustomException('An attendee with the same email already exists.');

    }
    
    List<Contact> existingContacts = ContactSelector.getContacts(denormalizedAttendeeInfo.email);
    Contact existingContact;
    Id contactId;

    if (existingContacts.size() == 0) {
        Contact contact = new Contact();
        contact.FirstName = denormalizedAttendeeInfo.firstName;
        contact.LastName = denormalizedAttendeeInfo.lastName;
        contact.Email = denormalizedAttendeeInfo.email; // Corrected the field name to "Email"
        if (Schema.sObjectType.Contact.isCreateable()) {
            insert contact;
        }
        contactId = contact.Id;  
    } else {
        existingContact = existingContacts.get(0);
        contactId = existingContact.Id;
    }
     Attendee__c attendee = new Attendee__c(
        Event__c = denormalizedAttendeeInfo.eventId,
        Attendee__c = contactId
     
    );
    
  
    if (Schema.sObjectType.Attendee__c.isCreateable()) {
        insert attendee;


         List<Subscription__c> subsToInsert = new List<Subscription__c>();

    for (denormalizedTicket ticket : ticketsList) {
    
     Subscription__c subscription = new Subscription__c();
    subscription.Attendee__c = attendee.Id;
    subscription.Ticket__c = ticket.id;
    subscription.Quantity__c = ticket.quantity;

    subsToInsert.add(subscription);
    }
   

    insert subsToInsert;
    
        return 'Attendee registered successfully.';
    } else {
        return 'Failed to register attendee.';
    }

    
}

// Helper method to check if an attendee with the same email already exists for the event
private static Boolean attendeeExistsForEvent(String email, Id eventId) {
    // Query Attendee__c records for the given email and event
    Integer count = [SELECT COUNT() FROM Attendee__c WHERE Attendee__r.Email = :email AND Event__c = :eventId];
    return count > 0;
}
public class CustomException extends Exception {}

}



// /**
// * @author: Aneela Oad
// * @description: Manages the logic and functionality related to attendee registration.
// * @since: 22/02/24
// * @Last Modified by: Aneela Oad
// */
// public without sharing class DubaiRSVPController {

//    /**
//   * @author: Aneela Oad
//   * @description: Handles registration of attendee along with his/her payment
//   * @param  String attendeeInfo
//   * @return: void
//   */
//    @AuraEnabled
//   public static void registerAttendee(String attendeeInfo) {
//       DenormalizedAttendee denormalizedAttendeeInfo = (DenormalizedAttendee) JSON.deserialize(attendeeInfo, DenormalizedAttendee.class);
//       System.debug('attendeeInfo ---> '+ denormalizedAttendeeInfo);
//       List<DenormalizedResponse> responsesList = denormalizedAttendeeInfo.responsesList;
//       List<String> responsesWithQuestionIds = new List<String>();
    
//       List<Contact> existingContacts = ContactSelector.getContacts(denormalizedAttendeeInfo.email);
//     Contact existingContact;

//     Id contactId;

//     if (existingContacts.size() == 0 ) {
//         Contact contact = new Contact();
//         contact.FirstName = denormalizedAttendeeInfo.firstName;
//         contact.LastName = denormalizedAttendeeInfo.lastName;
//         contact.email = denormalizedAttendeeInfo.email;
//         if(Schema.sObjectType.Contact.isCreateable()){
//           insert contact;
//         }
//           contactId = contact.id;  
      
//     } 
//     else {
//       existingContact =existingContacts.get(0);
//       contactId = existingContact.Id;
//     }
//     Attendee__c attendee = new Attendee__c(
//       Event__c = denormalizedAttendeeInfo.eventId,
//       Attendee__c = contactId,
//       TransactionID__c = denormalizedAttendeeInfo.transactionID,
//       Amount__c = denormalizedAttendeeInfo.amount
//     );
//     if( Schema.sObjectType.Attendee__c.isCreateable()) {
//       insert attendee;
//     }
      
  
 
      
       
// }
    
// }