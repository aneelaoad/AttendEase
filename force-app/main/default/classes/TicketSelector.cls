public with sharing class TicketSelector {
    public List<Ticket__c> getTicektInformation(){
        List<Ticket__c> lstTicket=[Select Id,Title__c, Ticket_Price__c,Vat__c,Description__c From Ticket__c];
        System.debug('Ticket Information'+lstTicket);
        return lstTicket;
    }

     public List<Subscription__c> getTicketsWithQuantity(){
        List<Subscription__c> ticketsWithQuantity=[SELECT Id, Name, Quantity__c, Attendee__r.Id, Ticket__r.Title__c, Ticket__r.Ticket_Price__c, Ticket__r.Vat__c
        FROM Subscription__c];
        return ticketsWithQuantity;
    }
}