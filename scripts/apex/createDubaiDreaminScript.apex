User testUser = new User(
    FirstName = 'test',
    LastName = 'user001',
    Username = 'testuser112231824@gmail.com',
    Email = 'testuser@gmail.com',
    Alias = 'TA',
    CommunityNickname = 'test',
    TimeZoneSidKey = 'GMT', 
    LocaleSidKey = 'en_US',
    EmailEncodingKey = 'UTF-8',
    ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1].Id,
    LanguageLocaleKey = 'en_US'
);

insert testUser;

String testUserId = [SELECT Id FROM User WHERE Email = 'zeeshan.alikhan@gmail.com' LIMIT 1].Id;
Account dubaiAccount = new Account(
    Name = 'Dubai Dreamin',
    Logo__c = 'https://dubaidreamin.com/assets/img/logo/main_logo.png'
);
insert dubaiAccount;

Event__c newEvent = new Event__c(
    Name = 'Dubai Dreamin',
    Banner_Image__c = 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    Event_Title__c = 'Dubai Dreamin 24',
    Event_Organizer__c = testUserId,
    Event_Organizer_Company__c = dubaiAccount.Id,
    Event_Type__c = 'Hybrid',
    Event_Charges__c = 500,
    Event_Description__c = 'Dubai Dreamin takes center stage as the ultimate community-driven assembly for Salesforce professionals. Immerse yourself in a full-day spectacle featuring a rich array of content tracks and riveting keynote speakers that promise an unforgettable experience!',
    Event_Address__CountryCode__s = 'AE',
    Event_Address__City__s = 'Dubai',
    Event_Address__PostalCode__s = '15500',
    Event_Address__Street__s = 'Street 152',
    Event_Start_Date_and_Time__c = Datetime.newInstance(2024, 11, 14, 9, 0, 0),
    Event_End_Date_and_Time__c = Datetime.newInstance(2024, 11, 14, 10, 30, 0)
);

insert newEvent;

// ============ ADD NAVIGATION BAR MENU ITEMS======================

Navigation_Control__c footerNavigation = new Navigation_Control__c(
    RecordTypeId = getRecordTypeId('Footer Navigation'), 
    Link_URL__c = 'https://twitter.com/',
    Is_Visible__c = true,
    Social_Media_Type__c = 'Twitter',
    Event__c = newEvent.Id
);

Navigation_Control__c headerNavigation = new Navigation_Control__c(
    RecordTypeId = getRecordTypeId('Header Navigation'), 
    Menu_Item_Name__c = 'About Us',
    Order__c = 1,
    Is_Visible__c = true,
    Event__c = newEvent.Id
);

insert new List<Navigation_Control__c>{footerNavigation, headerNavigation};

private static Id getRecordTypeId(String recordTypeName) {
    return Schema.SObjectType.Navigation_Control__c.getRecordTypeInfosByName().get(recordTypeName).getRecordTypeId();
}

// ============ ADD FAQ ======================
FAQ__c faq = new FAQ__c(
    Event__c = newEvent.Id,
    Question__c = 'What is Dubai Dreamin?',
    Answer__c = 'Dubai Dreamin is a community-focused conference aimed at learning'
);
insert faq;

// ============ ADD EventSPEAKER ======================

Speaker__c speaker = new Speaker__c(
    Company_Name__c = dubaiAccount.Id, // Assuming organizerCompany is supposed to be dubaiAccount
    Email__c = 'test@example.com',
    Phone_Number__c = '123-456-7890',
    Speaker_Information__c = 'Experienced speaker with expertise in real estate trends and home discovery.',
    Speaker_Name__c = 'Jane Doe'
    // Speaker_Profile_Image__c = 'https://ca.slack-edge.com/T03QSUT4URF-U03QBBJ9E3X-29ffce660e56-512'
);

insert speaker;

Event_Speaker__c eventSpeaker = new Event_Speaker__c(
    Event__c = newEvent.Id,
    Speaker__c = speaker.Id
);

insert eventSpeaker;
