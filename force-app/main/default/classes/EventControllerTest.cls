/**
* @author: Aneela Oad
* @description: Test class for EventController
* @since: 01/02/24
* @Last Modified by: Aneela Oad
*/
@isTest
public class EventControllerTest {
 
   /**
   * @author: Aneela Oad
   * @description: The method test the getEvent()  
   * @param  none
    * @return: void
   */
    @isTest
    static void getEventTest() {
        
        Account organizerCompany = new Account();
        organizerCompany.Name='Cloud-1';
        organizerCompany.Logo__c = 'https://play-lh.googleusercontent.com/8LfdOiQHWMsE1WXP_18yj61asw00uAHucGH2mOpDSesc_C5xEU9KJ_n1R0tLuhPZRW88=w240-h480-rw';
        organizerCompany.About_Us_Description__c = 'Test Description';
        insert organizerCompany;
        
        Datetime startDate = Datetime.newInstance(2024, 12, 14, 9, 0, 0);
        Datetime endDate = Datetime.newInstance(2024, 12, 14, 10, 30, 0);
        Event__c testEvent = new Event__c(
            Event_Title__c = 'Grand plot fair',
            Event_Organizer_Company__c = organizerCompany.Id,
            Event_Description__c = 'Test Event Description',
            Banner_Image__c = 'Test Image',
            Event_Address__City__s = 'Test City',
            Event_Address__CountryCode__s = 'US',
            Event_Address__Street__s = 'Test Street',
            Event_Start_Date_and_Time__c = startDate,
 	 		Event_End_Date_and_Time__c = endDate
         
        );
        insert testEvent;
        
        DenormalizedEvent result = EventController.getEvent(testEvent.Id);
        
        Assert.areEqual('Grand plot fair', result.eventTitle,'Expected Event Title ');
        Assert.areEqual('Test Description', result.aboutUsDescription, 'Expected Company About Us');
        Assert.areEqual('Test Event Description', result.eventDescription, 'Expected Event Description');
        Assert.areEqual('Test Image', result.bannerImage, 'Expected Event Image');
        Assert.areEqual('Test City', result.eventCity,'Expected Event City');
        Assert.areEqual('US', result.eventCountry, 'Expected Event Country');
        Assert.areEqual('Test Street', result.eventStreet, 'Expected Event Street');
        Assert.areEqual(testEvent.Event_Start_Date_and_Time__c, result.eventStartDateTime, 'Expected Event Start date');
        Assert.areEqual(testEvent.Event_End_Date_and_Time__c, result.eventEndDateTime, 'Expected Event end date');
    }
}