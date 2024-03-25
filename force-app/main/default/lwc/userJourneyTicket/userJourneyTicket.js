import { LightningElement, wire,api,track } from 'lwc';
import getTicket from '@salesforce/apex/TicketController.getTicket';

export default class TicketComponent extends LightningElement {
    @track earlyBirdTicketTitle;
    @track earlyBirdTicketPrice;
    @track earlyBirdTicketVatTax;
    @track earlyBirdTicketDescription;
    showTicket = false;
    orderSummary;
    orderTotal;
    totalAmount;

    // @wire(getTicket)
    // wiredTicket({ error, data }) {
    //     if (data) {
    //         console.log('data'+data);
    //         this.earlyBirdTicketTitle = data.ticketTitle;
    //         this.earlyBirdTicketPrice = data.ticketPrice;
    //         this.earlyBirdTicketVatTax = data.ticketVatTex;
    //         this.earlyBirdTicketDescription = data.ticketDescription;
    //     } else if (error) {
    //         console.error('Error fetching ticket details:', error);
    //     }
    // }

   

    fetchTicket(){
        getTicket({})
        .then(result=>{
            
                        this.earlyBirdTicketTitle = result.ticketTitle;
                        this.earlyBirdTicketPrice = result.ticketPrice;
                        this.earlyBirdTicketVatTax = result.ticketVatTex;
                        this.earlyBirdTicketDescription = result.ticketDescription;
                        console.log('data',Json.stringify(this.result));

                    } 

        )

    }
    handleQuantityChange(event) {
        const selectedQuantity = parseInt(event.target.value, 10);
        if (selectedQuantity > 0) {
            // Calculate order summary based on selected quantity and ticket price
            // const ticketPrice = parseFloat(this.earlyBirdTicketPrice);
            // const vatPrice = parseFloat(this.earlyBirdTicketVatTax);
            // const subtotal = selectedQuantity * ticketPrice;
            // const vat = selectedQuantity * vatPrice;
            // this.orderSummary = `${selectedQuantity} x ${this.earlyBirdTicketTitle}`;
            // this.orderTotal = `£${subtotal.toFixed(2)}\n£${vat.toFixed(2)}`;
            // this.totalAmount = `£${(subtotal + vat).toFixed(2)}`;
            this.showTicket = true;
            this.fetchTicket();
        } else {
            this.showTicket = false;
        }
    }
}
