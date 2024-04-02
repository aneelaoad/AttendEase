public class PaymentController {

  private static final string API_KEY = 'sk_test_51Ooi90BG9mkkVMIk0Y9ms1YRanZ5Ypw16g9NGPa2VsQbdjTyKFbGoIqg6bx9lqkZXV4qaJ4qkNCS4MiLA8FL4SrR00s9Dxvc6Y';
  private static final string END_POINT = 'https://api.stripe.com/v1/payment_links';
  private static final string END_POINT_T = 'https://api.stripe.com/v1/prices?limit=2';
  


@AuraEnabled(cacheable=true)
public static List<Price> retrievePrice(){
  
  List<Price> pricesList;
    HttpRequest req = new HttpRequest();
    HttpResponse res = new HttpResponse();
    Http http = new Http();

    req.setEndPoint(END_POINT_T);
    req.setMethod('GET');
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    // String body = '?limit=2';
    req.setHeader('Authorization', 'Bearer ' + API_KEY);

    // req.setBody(body);

    
     res =  http.send(req);

      if (res.getStatusCode() == 200) {

         pricesList =  PriceParser.parsePrices(res.getBody());
              // pricesList =   getPricesDetails(res.getBody());
            //  String ticketName = getPricesDetails(res.getBody());
            //  getPricesDetails(res.getBody());
              // System.debug('pricesList ' + pricesList);
              // System.debug('res.getBody() ' + res.getBody());
              // System.debug('LIST ' + getPricesDetails(res.getBody()));
          System.debug('LIST ' + pricesList);
             
          

      }
      return pricesList;

}


@AuraEnabled(cacheable=true)
  public static string createPaymentPage( Integer quantity, String priceId){
    // priceId= 'price_1OzBh4BG9mkkVMIklLgDBgPf';
     String paymentLinkId;
  
    HttpRequest req = new HttpRequest();
    HttpResponse res = new HttpResponse();
    Http http = new Http();

    req.setEndPoint(END_POINT);
    req.setMethod('POST');
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    String body = '&line_items[0][quantity]='+quantity + '&line_items[0][price]='+priceId;
    req.setHeader('Authorization', 'Bearer ' + API_KEY);

    req.setBody(body);

    
     res =  http.send(req);

      if (res.getStatusCode() == 200) {
              paymentLinkId =   getPaymentLinkId(res.getBody());
              // paymentIntentId = getPaymentIntentId(res.getBody());
              System.debug('paymentLinkId: ' +paymentLinkId);
             


      }
        System.debug('paymentLinkId'+ paymentLinkId);
                    return paymentLinkId;
    
    // catch(exception e){
    //         System.debug('Exception creating PaymentIntent: ' + e.getMessage());

    // }

  }


  private static String getPaymentLinkId(String responseBody) {
     
        Map<String, Object> responseMap = (Map<String, Object>)JSON.deserializeUntyped(responseBody);
        String pageURL =  (String)responseMap.get('url');
        return pageURL;
    }
    //  private static void getPricesDetails(String responseBody) {
     
    //     Map<String, Object> responseMap = (Map<String, Object>)JSON.deserializeUntyped(responseBody);
    //     System.debug('responseMap'+ responseMap);
    //     // return (String)responseMap.get('data');
    // }
}