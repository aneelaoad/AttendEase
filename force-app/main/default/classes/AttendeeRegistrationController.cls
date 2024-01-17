public with sharing class AttendeeRegistrationController {


    @AuraEnabled
public static Contact registerAttendee(Contact con, String eventId) {
    System.debug('con => '+con);
 
    upsert con;

      Attendee__c newAttendee = new Attendee__c(
            Event__c = eventId,  
            Attendee__c = con.Id
        );
        insert newAttendee;
    return con;
}

    // @AuraEnabled
    // public static void registerAttendee(String firstName, String lastName, String email) {
   
    //     Contact newContact = new Contact(
    //         FirstName = firstName,
    //         LastName = lastName,
    //         Email = email
    //     );
    //     insert newContact;
    
    //     Attendee__c newAttendee = new Attendee__c(
    //         Event__c = 'a021y000009rlyCAAQ',  
    //         Attendee__c = newContact.Id
    //     );
    //     insert newAttendee;
    // }
}