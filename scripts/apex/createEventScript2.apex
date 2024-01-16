// Create a new event organizer user
User zeeshanUser = new User(
    FirstName = 'John',
    LastName = 'Doe',
    Username = 'John.Doe@gmail.com',
    Email = 'John.Doe11111@gmail.com',
    Alias = 'JD',
    CommunityNickname = 'John',
    TimeZoneSidKey = 'GMT', 
    LocaleSidKey = 'en_US',
    EmailEncodingKey = 'UTF-8',
    ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User'].Id,
    LanguageLocaleKey = 'en_US'
);

insert zeeshanUser;

// Create a new account for the event organizer
Account organizerCompany = new Account(
    Name = 'Universe Builders.co',
    Logo__c = 'https://crystalpng.com/wp-content/uploads/2022/06/zameen-logo.png'
);
insert organizerCompany;

// Create a new event with different details
Event__c newEvent2 = new Event__c();

newEvent2.Name = 'Dream Home Discovery Fair';
newEvent2.Banner_Image__c = 'https://example.com/dream_home_banner.jpeg';
newEvent2.Event_Title__c = 'Dream Home Discovery Fair - Explore Your Perfect Home';
newEvent2.Event_Organizer__c = zeeshanUser.Id;
newEvent2.Event_Organizer_Company__c = organizerCompany.Id;
newEvent2.Event_Type__c = 'Virtual';
newEvent2.Event_Charges__c = 0;  
newEvent2.Event_Description__c = 'Description for Dream Home Discovery Fair...';
newEvent2.Event_Address__CountryCode__s = 'PK';
newEvent2.Event_Address__City__s = 'Lahore';
newEvent2.Event_Address__PostalCode__s = '16000';  
newEvent2.Event_Address__Street__s = 'Dream Street';
Datetime startDate2 = Datetime.newInstance(2025, 3, 1, 10, 0, 0);
newEvent2.Event_Start_Date_and_Time__c = startDate2;
Datetime endDate2 = Datetime.newInstance(2025, 3, 1, 18, 0, 0);
newEvent2.Event_End_Date_and_Time__c = endDate2;

insert newEvent2;

// Add navigation bar menu items for the new event
Navigation_Control__c footerNavigation2 = new Navigation_Control__c();
footerNavigation2.RecordTypeId = getRecordTypeId('Footer Navigation');
footerNavigation2.Link_URL__c = 'https://twitter.com/';
footerNavigation2.Is_Visible__c = true;
footerNavigation2.Social_Media_Type__c = 'Twitter';
footerNavigation2.Event__c = newEvent2.Id;
insert footerNavigation2;

Navigation_Control__c headerNavigation2 = new Navigation_Control__c();
headerNavigation2.RecordTypeId = getRecordTypeId('Header Navigation');
headerNavigation2.Menu_Item_Name__c = 'About Us';
headerNavigation2.Order__c = 1;
headerNavigation2.Is_Visible__c = true;
headerNavigation2.Event__c = newEvent2.Id;
insert headerNavigation2;

// Add FAQ for the new event
FAQ__c faq2 = new FAQ__c();
faq2.Event__c = newEvent2.Id;
faq2.Question__c = 'What is Dream Home Discovery Fair?';
faq2.Answer__c = 'Dream Home Discovery Fair is an event to explore and discover your dream home.';

insert faq2;

// Add Speaker for the new event
Speaker__c newSpeaker2 = new Speaker__c(
    Company_Name__c = organizerCompany.Id,
    Email__c = 'speaker@example.com',
    Phone_Number__c = '123-456-7890',
    Speaker_Information__c = 'Experienced speaker with expertise in real estate trends and home discovery.',
    Speaker_Name__c = 'Jane Doe'
);

insert newSpeaker2;

private static Id getRecordTypeId(String recordTypeName) {
    return Schema.SObjectType.Navigation_Control__c.getRecordTypeInfosByName().get(recordTypeName).getRecordTypeId();
}
