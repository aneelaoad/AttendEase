trigger CreateTicketFromStripeEvent on stripeGC__Stripe_Event__c (after insert) {
    List<ticket__c> ticketsToInsert = new List<ticket__c>();
    
    for (stripeGC__Stripe_Event__c eventRecord : Trigger.new) {
        if (eventRecord.stripeGC__Request_Body__c != null) {
            Map<String, Object> eventData = (Map<String, Object>) JSON.deserializeUntyped(eventRecord.stripeGC__Request_Body__c);
            
            if (eventData.containsKey('data')) {
                Map<String, Object> dataMap = (Map<String, Object>) eventData.get('data');
                
                if (dataMap.containsKey('object')) {
                    Map<String, Object> objectMap = (Map<String, Object>) dataMap.get('object');
                    
                    if (objectMap.containsKey('client_reference_id')) {
                        String clientReferenceId = (String) objectMap.get('client_reference_id');
                        
                        // Create ticket record
                        ticket__c newTicket = new ticket__c();
                        //newTicket.TransactionID__c = clientReferenceId;
                         newTicket.Attendee__c = clientReferenceId;
						newTicket.TransactionID__c = eventRecord.Id;
                        ticketsToInsert.add(newTicket);
                    }
                    System.debug('ticketsToInsert' +ticketsToInsert);
                }
            }
        }
    }
    
    if (!ticketsToInsert.isEmpty()) {
        insert ticketsToInsert;
    }
}