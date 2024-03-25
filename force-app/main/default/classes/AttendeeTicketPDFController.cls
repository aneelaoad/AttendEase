public class AttendeeTicketPDFController {
    public static AttendeeTicket attendeeTicket { get; set; } // Change to static
    
    public class AttendeeTicket {
        public String ticketNumber { get; set; }
        public Decimal amount { get; set; }
        public String transactionId { get; set; }
        public String attendeeName { get; set; }
        public String attendeeEmail { get; set; } 
    }
    
    public AttendeeTicketPDFController() {
        String attendeeRecordId = ApexPages.currentPage().getParameters().get('attendeeRecordId');
        System.debug(attendeeRecordId);
        setAttendeeInformation(attendeeRecordId);
    }
    
    public static void setAttendeeInformation(Id recordId) {
        System.debug('@@setAttendeeInformation'+recordId);
        attendeeTicket = new AttendeeTicket();
        Attendee__c attendee = [SELECT Id, Name, Amount__c, TransactionID__c, Attendee_Full_Name__c,Attendee__r.Email
                                FROM Attendee__c
                                WHERE Id = :recordId
                                LIMIT 1];
        System.debug('Attende'+attendee);
        attendeeTicket.ticketNumber = attendee.Name;
        attendeeTicket.amount = attendee.Amount__c;
        attendeeTicket.transactionId = attendee.TransactionID__c;
        attendeeTicket.attendeeName = attendee.Attendee_Full_Name__c; 
        System.debug('#ATT Email:'+attendee.Attendee__r.Email);
        attendeeTicket.attendeeEmail = attendee.Attendee__r.Email;
        System.debug('Attendee Information'+attendeeTicket);
    }
    
    @InvocableMethod(label='Get Attendee Info')
    public static void getAttendeeInfo(List<String> recordIds) {
        System.debug(recordIds);
        PageReference pg = new Pagereference('/apex/AttendeeTicket?attendeeRecordId=' + recordIds.get(0));
        pg.setRedirect(false);
        Blob content = pg.getContent();
        
        ContentVersion conVer = new ContentDocumentUtils().constructContentVersion(content,'Attendee_Ticket.pdf');
        insert conVer;
        
        List<ContentVersion> contentVersions = new ContentVersionSelector().getContentVersion('Id = \'' + conVer.Id + '\'');
        
        
        ContentDocumentLink conDocLink = New ContentDocumentLink();
        conDocLink.LinkedEntityId = recordIds.get(0);
        conDocLink.ContentDocumentId = contentVersions.get(0).ContentDocumentId;
        conDocLink.shareType = 'V';
        conDocLink.Visibility='AllUsers';
        insert conDocLink;        
        
         setAttendeeInformation(recordIds.get(0));
        
        // Send Email Section 
        String emailBody =  'Thank you ' + attendeeTicket.attendeeName + ' for registering for the Dubai Dreamin\' Event! We\'re thrilled to have you join<br/>';
        emailBody +=        'us for what promises to be an enriching and engaging experience.<br/><br/>';
        emailBody +=        'Here are the event details:<br/><br/>';
        emailBody +=        '<b>Date</b>: 9th November, 2024<br/>';
        emailBody +=        '<b>Location</b>: Dubai, UAE<br/><br/>';
        emailBody +=        'Your registration has been successfully confirmed, and we look forward to welcoming<br/>';
        emailBody +=        'you. The event agenda will include insightful sessions, networking opportunities, and<br/>';
        emailBody +=        'hands-on workshops tailored to empower you with the latest insights and tools in<br/>';
        emailBody +=        'Salesforce technology.<br/><br/>';
        emailBody +=        'Should you have any questions leading up to the event, please don\'t hesitate to reach out to our team at <a href="mailto:info@dubaidreamin.com">info@dubaidreamin.com</a>.<br/><br/>';
        emailBody +=        'We\'re excited to see you there and share in this journey of learning and collaboration.<br/><br/>';
        emailBody +=        'Best regards,<br/>Maham Hassan';

        Messaging.SingleEmailMessage myEmail=new  Messaging.SingleEmailMessage();
        // Sending Email Attachment
        Messaging.EmailFileAttachment emailFileAttachment= new Messaging.EmailFileAttachment();
        emailFileAttachment.setFileName('Attendee');
       myEmail.setSubject('Attendee Registration Successfull');
         myEmail.setHtmlBody(emailBody);
        myEmail.setToAddresses(new String[]{attendeeTicket.attendeeEmail}); 
        myEmail.setEntityAttachments(new List<Id>{contentVersions.get(0).Id});
        System.debug('Email'+myEmail);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{myEmail});
    }
}