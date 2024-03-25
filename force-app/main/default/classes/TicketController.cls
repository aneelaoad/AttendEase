public with sharing class TicketController {
    @AuraEnabled(cacheable=true)
    public static List<DenormalizedTicket> getTicket(){
        List<Ticket__c> ticketList = new TicketSelector().getTicektInformation();
        List<DenormalizedTicket> denormalizedticketList = new List<DenormalizedTicket>();
        
        for (Ticket__c ticket : ticketList) {
            DenormalizedTicket denormalizedTicket = new DenormalizedTicket();
            denormalizedTicket.ticketTitle = ticket.Title__c;
            denormalizedTicket.id = ticket.Id;
            denormalizedTicket.ticketPrice = String.valueOf(ticket.Ticket_Price__c);
            denormalizedTicket.ticketVatTex = String.valueOf(ticket.Vat__c);
            denormalizedTicket.ticketDescription = ticket.Description__c;
            denormalizedticketList.add(denormalizedTicket);
        }
        System.debug('Ticket Info'+denormalizedticketList);
        return denormalizedticketList;
    }

  
}