import { LightningElement, api, wire } from 'lwc';
import getTicket from '@salesforce/apex/TicketController.getTicket';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import registerAttendee from '@salesforce/apex/DubaiRSVPController.registerAttendee';

export default class RsvpModal extends LightningElement {
    selectedEventId;

    // --- section flags---
    isOpen = false;
    showTickets = false;
    showAttendeeForm = false;
    showOrderSummary = false;
    
    // --- attendee info properties---
    firstName;
    lastName;
    email;
    transactionId = '';
    amount = '';

    // --- ticket info properties---
    quantity = 0;
    ticketId;
    ticketsWithQuantity = [];
    ticketInfo = {}
    tickets;
    selectedTicket;


    openModal() { this.isOpen = true; document.body.style.overflow = 'hidden'; }
    closeModal() { this.isOpen = false; document.body.style.overflow = 'auto'; }


 @wire(getDubaiDreaminEventId)
  wiredEventId({ error, data }) {
    if (data) {

      this.selectedEventId = data;
    } else if (error) {
      console.error('getDubaiDreaminEventId Error:', error);
    }
  }
    @wire(getTicket)
    wiredTickets({ error, data }) {
        if (data) {
            this.showTickets = true
            this.tickets = data;
            console.log(' this.tickets : ', JSON.stringify(this.tickets));
        } else if (error) {
            console.error('Error fetching ticket data:', error);
        }
    }


    get options() {
        return [
            { label: 1, value: 1 },
            { label: 2, value: 3 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
            { label: 6, value: 6 },
            { label: 7, value: 7 },
            { label: 8, value: 8 },
            { label: 9, value: 9 },
            { label: 10, value: 10 }

        ];
    }

    handleChange(event) {
        this.value = event.target.value;
        console.log('this.value : ', this.value);
    }



    handleFieldChange(event) {
        // const fieldName = event.target.label;
        const fieldName = event.target.label;
        console.log('fieldName : ', fieldName);
        const value = event.target.value;
        switch (fieldName) {
            case 'FirstName':
                this.firstName = value;
                break;
            case 'LastName':
                this.lastName = value;
                break;
            case 'Email':
                this.email = value;
                break;
            case 'TransactionId':
                this.transactionId = value;
                break;
            case 'Amount':
                this.amount = value;
                break;
           
            default:
                break;
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;

    }


    handleQuantityChange(event) {
        this.ticketId = event.target.dataset.ticketid;
        this.quantity = event.detail.value;
        // this.ticketsWithQuantity[ticketId] = parseInt(quantity);

        this.selectedTicket = this.tickets.find(ticket => ticket.id === this.ticketId);

        this.ticketInfo = {
            id: this.ticketId,
            quantity: this.quantity,
            ticketTitle: this.selectedTicket.ticketTitle
        };
        this.ticketsWithQuantity.push(this.ticketInfo);

        console.log('this.selectedTicket : ',this.selectedTicket);
                
    }
    handleCheckout() {
        this.showTickets=true
        this.showOrderSummary=true

        console.log('this.ticketsWithQuantity : ', JSON.stringify(this.ticketsWithQuantity));
    }

    // handleTicketSelection(event) {
    //     this.ticketId = event.currentTarget.dataset.ticketid;
    //     this.selectedTicket = this.tickets.find(ticket => ticket.ticketTitle === this.ticketId);


    //     let ticketData = {
    //         ticketName: this.selectedTicket.ticketTitle,
    //         quantity: this.quantity
    //     };


    //     this.selectedTicketsList.push(ticketData);

    //     console.log('this.selectedTicketsList : ', JSON.stringify(this.selectedTicketsList));
    // }

    // handleTicketSelection(event) {

    //     this.ticketId = event.currentTarget.dataset.ticketid;
    //     this.selectedTicket = this.tickets.find(ticket => ticket.ticketTitle === this.ticketId);

    //     let arrayObject = Object.keys(this.selectedTicket).map(key => {
    //         return { label: key, value: this.selectedTicket[key] };
    //     });


    //     this.selectedTicketsList.push(this.selectedTicket);
    //      arrayObject.push({ label: this.quantity, value:  this.quantity});

    //     console.log('arrayObject : ', JSON.stringify(arrayObject));
    //     // console.log('ticketId : ', this.ticketId);
    //     // console.log('selectedTicket : ', this.selectedTicket);
    //     // console.log('selectedQuantity : ', this.selectedQuantity);
    //      console.log('this.selectedTicketsList : ', JSON.stringify(this.selectedTicketsList));

    // }

    handleRSVP() {
        
        let attendeeListObj = {
            eventId:this.selectedEventId,
            ticketsList: this.ticketsWithQuantity,
            // quantity: this.quantity,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        }

        console.log('attendeeListObj : ', JSON.stringify(attendeeListObj));
            registerAttendee({ attendeeInfo: JSON.stringify(attendeeListObj) })
                .then((attendeeObj) => {
                    this.closeModal();
                    this.resetForm();
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Successfully registered for event! ',
                            variant: 'success'
                        })
                    );
                })

                .catch((error) => {
                       console.error('Error registering attendee: ', error);

                    // if (error.body && error.body.message && error.body.message.includes('An attendee with the same email already exists.')) {
                    //     console.log('error.body.message : ',error.body.message);
                    //     this.errorMessage = 'An attendee with the same email already exists.';
                    //     this.dispatchEvent(
                    //         new ShowToastEvent({
                    //             title: 'Error',
                    //             message:  this.errorMessage,
                    //             variant: 'error'
                    //         })
                    //     );
                    // } else {

                    //     console.error('Error registering attendee: ', error);

                    //     this.errorMessage = 'An error occurred while registering attendee.';
                    // }
                });



        
    }
    //  @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: INDUSTRY_FIELD })
    //   propertyOrFunction;
}