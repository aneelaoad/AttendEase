/**
* @author: Aneela Oad
* @description: Manages the logic and functionality related to attendee registration.
* @since: 22/02/24
* @Last Modified by: Aneela Oad
*/
public without sharing class DubaiRSVPController {
    
 private static final string API_KEY = 'sk_test_51Ooi90BG9mkkVMIk0Y9ms1YRanZ5Ypw16g9NGPa2VsQbdjTyKFbGoIqg6bx9lqkZXV4qaJ4qkNCS4MiLA8FL4SrR00s9Dxvc6Y';
  private static final string END_POINT = 'https://api.stripe.com/v1/payment_links';
  private static final string END_POINT_T = 'https://api.stripe.com/v1/prices?limit=2';
    /**
    * @author: Aneela Oad
    * @description: Handles registration of attendee along with his/her payment
    * @param  String attendeeInfo
    * @return: void
    */
   @AuraEnabled
   public static Attendee__c registerAttendee(String attendeeInfo) {
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
        Attendee__c = contactId,
           Company_Name__c	= denormalizedAttendeeInfo.companyName,
      Company_Size__c= denormalizedAttendeeInfo.companySize,
      Food_Preference__c= denormalizedAttendeeInfo.foodPreference,
      Message__c= denormalizedAttendeeInfo.message,
      Phone__c= denormalizedAttendeeInfo.phone,
      Session_Interest__c= denormalizedAttendeeInfo.sessionInterest,
      Tshirt_Size__c= denormalizedAttendeeInfo.tShirtSize,
      Designation__c= denormalizedAttendeeInfo.designation
     
    );
    
  
    if (Schema.sObjectType.Attendee__c.isCreateable()) {
        insert attendee;

    
        
    } 
        return attendee;

    
}
// public static String registerAttendee(String attendeeInfo) {
//     System.debug('attendeeInfo ---> '+ attendeeInfo);

//     DenormalizedAttendee denormalizedAttendeeInfo = (DenormalizedAttendee) JSON.deserialize(attendeeInfo, DenormalizedAttendee.class);
//     System.debug('denormalizedAttendeeInfo ---> '+ denormalizedAttendeeInfo);
//    List<DenormalizedTicket> ticketsList = denormalizedAttendeeInfo.ticketsList;
//    // System.debug('ticketsList ---> '+ ticketsList);

 
//     if (attendeeExistsForEvent(denormalizedAttendeeInfo.email, denormalizedAttendeeInfo.eventId)) {
//      throw new CustomException('An attendee with the same email already exists.');

//     }
    
//     List<Contact> existingContacts = ContactSelector.getContacts(denormalizedAttendeeInfo.email);
//     Contact existingContact;
//     Id contactId;

//     if (existingContacts.size() == 0) {
//         Contact contact = new Contact();
//         contact.FirstName = denormalizedAttendeeInfo.firstName;
//         contact.LastName = denormalizedAttendeeInfo.lastName;
//         contact.Email = denormalizedAttendeeInfo.email; // Corrected the field name to "Email"
//         if (Schema.sObjectType.Contact.isCreateable()) {
//             insert contact;
//         }
//         contactId = contact.Id;  
//     } else {
//         existingContact = existingContacts.get(0);
//         contactId = existingContact.Id;
//     }
//      Attendee__c attendee = new Attendee__c(
//         Event__c = denormalizedAttendeeInfo.eventId,
//         Attendee__c = contactId
     
//     );
    
  
//     if (Schema.sObjectType.Attendee__c.isCreateable()) {
//         insert attendee;

    
        
//         return 'Attendee registered successfully.';
//     } else {
//         return 'Failed to register attendee.';
//     }
    
// }

private static Boolean attendeeExistsForEvent( String email, Id eventId) {
    Integer count = [SELECT COUNT() FROM Attendee__c WHERE Attendee__r.Email = :email AND Event__c = :eventId];
    return count > 0;
}

@AuraEnabled
  public static string createPaymentPage(String attendeeId, Integer quantity, String priceId){
    String paymentLinkId;
    HttpRequest req = new HttpRequest();
    HttpResponse res = new HttpResponse();
    Http http = new Http();

    req.setEndPoint(END_POINT);
    req.setMethod('POST');
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    String body = '&line_items[0][quantity]='+quantity + '&line_items[0][price]='+priceId;
    req.setHeader('Authorization', 'Bearer ' + API_KEY);
    req.setBody(body);

     res =  http.send(req);
      if (res.getStatusCode() == 200) {
              paymentLinkId =   getPaymentLinkId(res.getBody());
             System.debug('paymentLinkId: ' +paymentLinkId);
      }
      String paymentLinkWithClientId =  paymentLinkId+'?client_reference_id='+attendeeId;
        // return paymentLinkId;
        return paymentLinkWithClientId;
  }



 private static String getPaymentLinkId(String responseBody) {
     
        Map<String, Object> responseMap = (Map<String, Object>)JSON.deserializeUntyped(responseBody);
        String pageURL =  (String)responseMap.get('url');
        return pageURL;
    }




public class CustomException extends Exception {}

}