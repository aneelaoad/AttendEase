public without sharing class EventSelector {

    public static List<Event__c> getEvents(String eventId) {
        String query = 'SELECT Name, Id, Event_Description__c, Event_Title__c, Event_Organizer_Company__c, '
                      + 'Event_Organizer_Company__r.Name, Event_Organizer_Company__r.Logo__c, Event_Organizer__c, '
                      + 'Event_End_Date_and_Time__c, Event_Start_Date_and_Time__c, Event_Total_Duration__c, Event_Type__c, '
                      + 'Event_Charges__c, Event_Address__c, Banner_Image__c, Event_Address__City__s, '
                      + 'Event_Address__PostalCode__s, Event_Address__StateCode__s, Event_Address__CountryCode__s, '
                      + 'Event_Organizer_Company__r.About_Us_Description__c '
                      + 'FROM Event__c '
                      + 'WHERE Id = \'' + eventId + '\'';

        List<Event__c> result = Database.query(query);
        System.debug('Event List: ' + result);
        return result;
    }
    // public static List<Event__c> getEvents(){
    //  // String whereClauseString=String.IsEmpty(whereClause)?'':'WHERE '+whereClause;
    // String eventId = 'a021m00001cOhvpAAC';
    // String query ='SELECT Name, Id,Event_Description__c,Event_Title__c, Event_Organizer_Company__c,'
    //  + 'Event_Organizer_Company__r.Name,Event_Organizer_Company__r.Logo__c, Event_Organizer__c, Event_End_Date_and_Time__c, '
    //  + 'Event_Start_Date_and_Time__c,Event_Total_Duration__c, Event_Type__c, Event_Charges__c, Event_Address__c,Banner_Image__c,'
    //  + 'Event_Address__City__s, Event_Address__PostalCode__s,Event_Address__StateCode__s, Event_Address__CountryCode__s,Event_Organizer_Company__r.About_Us_Description__c '
    //  + 'FROM Event__c '
    //  + 'WHERE id = \''+eventId + '\''; 
        
    //  List<Event__c> result= Database.query(query);	
    //     System.debug('Event List'+result);
    //     return result;
    // }
 }