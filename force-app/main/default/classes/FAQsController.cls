public without sharing class FAQsController {

     @AuraEnabled(cacheable=true)
    public static List<DenormalizedFAQs> getDenormalizedFAQs(String eventId){

        List<DenormalizedFAQs> denormalizedFaqsList = new List<DenormalizedFAQs>();
        List<FAQ__c> faqsList = FAQsSelector.getFAQs(eventId);
        for (FAQ__c faq : faqsList) {
        DenormalizedFAQs denormalizedFaq = new DenormalizedFAQs();
        denormalizedFaq.question=faq.Question__c;
        denormalizedFaq.answer=faq.Answer__c;
        
        denormalizedFaqsList.add(denormalizedFaq);
        }

        return denormalizedFaqsList ;
    }
}