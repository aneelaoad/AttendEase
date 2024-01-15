User zeeshanUser = new User(
    FirstName = 'Zeeshan',
    LastName = 'Ali Khan',
    Username = 'zeeshan.alikhan@gmail.com',
    Email = 'zeeshan.alikhan@gmail.com',
    Alias = 'ZA',
    CommunityNickname = 'zeeshan',
    TimeZoneSidKey = 'GMT', 
    LocaleSidKey = 'en_US',
    EmailEncodingKey = 'UTF-8',
    ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User'].Id,
    LanguageLocaleKey = 'en_US'
);

insert zeeshanUser;

Account zameenAccount = new Account(
    Name = 'Zameen.co',
    Logo__c = 'https://crystalpng.com/wp-content/uploads/2022/06/zameen-logo.png'

);
insert zameenAccount;




Event__c newEvent = new Event__c();

    newEvent.Name = 'Zameen Expo';
	newEvent.Banner_Image__c = 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    newEvent.Event_Title__c = 'Zameen Expo - The Annual Festival';
    newEvent.Event_Organizer__c = zeeshanUser.Id;
    newEvent.Event_Organizer_Company__c = zameenAccount.Id;
    newEvent.Event_Type__c = 'Hybrid';
    newEvent.Event_Charges__c= 500;
    newEvent.Event_Description__c= 'Unveil prime real estate opportunities and discover your dream property at this premier real estate event, showcasing the latest in the world of property and housing The prospect of acquiring prime real estate is an exciting venture that beckons individuals to explore lucrative opportunities and fulfill their dreams of owning the perfect property. At this premier real estate event, attendees are invited to unveil a myriad of exclusive opportunities that transcend the ordinary, offering a glimpse into a world where real estate aspirations transform into reality. With a focus on showcasing the latest innovations and trends in the realm of property and housing, this event emerges as a pivotal platform for enthusiasts, investors, and industry professionals alike. The event serves as a curated space where the doors to prime real estate swing open, revealing a landscape rich with possibilities. From luxurious residential developments to high-yield commercial spaces, the showcased properties represent the epitome of architectural excellence and investment potential. Attendees are encouraged to explore the diverse portfolio of offerings, each meticulously chosen to cater to a spectrum of preferences and requirements. Whether one envisions a waterfront residence, a dynamic urban dwelling, or a sprawling countryside estate, this event is designed to cater to the diverse tastes and aspirations of the real estate connoisseur.In the dynamic real estate market, staying abreast of the latest trends is paramount. This premier event is not just a gathering; it is a window into the future of property and housing. Thoughtfully curated exhibits and presentations delve into cutting-edge technologies, sustainable design practices, and evolving market dynamics, providing attendees with invaluable insights. From smart home integrations to eco-friendly developments, the event is a showcase of innovation, enabling participants to make informed decisions in an ever-evolving real estate landscape. Furthermore, the event transcends the traditional boundaries of a property exhibition by fostering a sense of community and collaboration. It brings together a network of industry professionals, seasoned investors, and aspiring homeowners under one roof. Attendees have the opportunity to engage in meaningful conversations, exchange ideas, and build connections that extend beyond the confines of the event venue. The synergy created within this vibrant community contributes to the overall enrichment of knowledge and the cultivation of fruitful partnerships. For those embarking on the journey of property ownership, the event offers more than just a glimpse into available opportunities. It is an educational platform where experts conduct workshops, seminars, and panel discussions to empower attendees with the knowledge needed to make informed decisions. From understanding the intricacies of mortgage rates to navigating legal aspects, the event provides a comprehensive education that is invaluable to both seasoned investors and first-time homebuyers. In conclusion, this premier real estate event is a gateway to a world of possibilities, where prime real estate opportunities unfold and dreams find their dwelling. It transcends the conventional boundaries of a property showcase, offering an immersive experience that blends innovation, community building, and education. Attendees are encouraged to step into this realm of endless potential, where the latest in the world of property and housing is not just showcased but celebrated. Whether one seeks an investment opportunity, a dream home, or simply wishes to stay ahead in the real estate game, this event promises to be an enriching journey into the future of real estate.'; 
	newEvent.Event_Address__CountryCode__s='PK';
	newEvent.Event_Address__City__s='Lahore' ;
    newEvent.Event_Address__PostalCode__s='15500';
    newEvent.Event_Address__Street__s='Street #152';
    Datetime startDate = Datetime.newInstance(2024, 12, 14, 9, 0, 0);
    newEvent.Event_Start_Date_and_Time__c = startDate;
 	Datetime endDate = Datetime.newInstance(2024, 12, 14, 10, 30, 0);
    newEvent.Event_End_Date_and_Time__c = endDate;


insert newEvent;


FAQ__c faq = new FAQ__c();
faq.Event__c=newEvent.Id;
faq.Question__c = 'What is Zameen.co?';
faq.Answer__c = 'Zameen.co is one of the Pakistans leading real estate businesses';

insert faq;