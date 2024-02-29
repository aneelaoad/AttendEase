public class AttendeeTicketPDFController {
    public AttendeeTicket attendeeTicket { get; set; }

    public class AttendeeTicket {
        public String ticketNumber { get; set; }
        public Decimal amount { get; set; }
        public String transactionId { get; set; }
        public String attendeeName { get; set; }
    }

    public AttendeeTicketPDFController() {
        String attendeeRecordId = ApexPages.currentPage().getParameters().get('attendeeRecordId');
        System.debug(attendeeRecordId);
       setAttendeeInformation(attendeeRecordId);
    }
    
    public void setAttendeeInformation(Id recordId) {
        attendeeTicket = new AttendeeTicket();
       Attendee__c attendee = [SELECT Id, Name, Amount__c, TransactionID__c, Attendee_Full_Name__c 
                                     FROM Attendee__c
                                     WHERE Id = :recordId
                                     LIMIT 1];
                attendeeTicket.ticketNumber = attendee.Name;
                attendeeTicket.amount = attendee.Amount__c;
                attendeeTicket.transactionId = attendee.TransactionID__c;
                attendeeTicket.attendeeName = attendee.Attendee_Full_Name__c;         
       
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


        
		
    }
}