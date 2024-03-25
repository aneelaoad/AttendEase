import { LightningElement, wire } from 'lwc';
import getTicket from '@salesforce/apex/TicketController.getTicket';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';
import registerAttendee from '@salesforce/apex/DubaiRSVPController.registerAttendee';

export default class DubaiRSVPSection extends LightningElement {
  selectedEventId;
  quantity = 0;
  ticketId;
  ticketsWithQuantity = [];
  ticketInfo = {}
  tickets;
  selectedTicket;
  totalTicketPrice;

  // --- section flags---
  isOpen = false;
  showTickets = false;
  showAttendeeForm = true;
  showOrderSummary = false;




  firstName;
  lastName;
  email;
  transactionId = '';
  amount = '';



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

  handleQuantityChange(event) {

    const ticketId = event.target.dataset.ticketid;
    this.quantity = parseInt(event.detail.value);

    const index = this.ticketsWithQuantity.findIndex(ticket => ticket.id === ticketId);

    console.log('index : ', index);

    if (index !== -1) {
      this.ticketsWithQuantity[index].quantity = this.quantity;
      this.ticketsWithQuantity[index].totalPrice = this.quantity * this.ticketsWithQuantity[index].ticketPrice;

    } else {

      this.selectedTicket = this.tickets.find(ticket => ticket.id === ticketId);
      this.ticketInfo = {
        id: ticketId,
        quantity: this.quantity,
        ticketTitle: this.selectedTicket.ticketTitle,
        ticketPrice: this.selectedTicket.ticketPrice,
        ticketVatTex: this.selectedTicket.ticketVatTex,
        totalPrice: this.quantity * this.selectedTicket.ticketPrice
      };
      this.ticketsWithQuantity.push(this.ticketInfo);

    }
    this.showOrderSummary = true;

    console.log('handlequantity : ', JSON.stringify(this.ticketsWithQuantity));



    // this.showOrderSummary = true
    // this.ticketId = event.target.dataset.ticketid;
    // this.quantity = event.detail.value;

    // this.selectedTicket = this.tickets.find(ticket => ticket.id === this.ticketId);
    // this.totalTicketPrice = this.quantity * this.selectedTicket.ticketPrice;
    // this.ticketInfo = {
    //   id: this.ticketId,
    //   quantity: this.quantity,
    //   ticketTitle: this.selectedTicket.ticketTitle,
    //   ticketPrice: this.selectedTicket.ticketPrice,
    //   ticketVatTex: this.selectedTicket.ticketVatTex
    // };
    // this.ticketsWithQuantity.push(this.ticketInfo);

  }
  handleCheckout() {
    document.body.style.overflow = 'hidden';

    this.isOpen = true;
    this.showOrderSummary = true
    this.showAttendeeForm = true
    console.log('this.ticketsWithQuantity : ', JSON.stringify(this.ticketsWithQuantity));
  }

  handleRSVP() {

    let attendeeListObj = {
      eventId: this.selectedEventId,
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


      });




  }

}