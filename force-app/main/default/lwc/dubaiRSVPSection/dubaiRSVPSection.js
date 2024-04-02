import { LightningElement, wire } from 'lwc';
// import getTicket from '@salesforce/apex/TicketController.getTicket';
import retrievePrice from '@salesforce/apex/PaymentController.retrievePrice';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';
// import createPaymentPage from '@salesforce/apex/PaymentController.createPaymentPage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import registerAttendee from '@salesforce/apex/DubaiRSVPController.registerAttendee';
import createPaymentPage from '@salesforce/apex/DubaiRSVPController.createPaymentPage';

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
  showCheckout = false;

  // ----attendee info----
  attendeeId
  firstName;
  lastName;
  email;
  taxReceipt;
  attendeeAddress;
  attendeeCountry;
  registrationType;
  townCity;
  postalCode;
  phoneNumber;
  sessionInterest;
  companyName;
  foodPreference;
  tShirtSize;
  designation;
  companySize;
  paymentPageLink;
message
  closeModal() { this.isOpen = false; document.body.style.overflow = 'auto'; }



  @wire(getDubaiDreaminEventId)
  wiredEventId({ error, data }) {
    if (data) {

      this.selectedEventId = data;
    } else if (error) {
      console.error('getDubaiDreaminEventId Error:', error);
    }
  }
  @wire(retrievePrice)
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
get countryOptions(){
  return  [
    {label: 'US', value:'US' },
    {label: 'UK', value:'UK' },
    {label: 'UAE', value:'UAE' },
  ]
}
get registrationTypeOptions(){
  return[
      {label:'Online', value:'Online'},
      {label:'Onsite', value:'Onsite'}
  ]
}

get townCityOptions(){
  return[
    {label:'New York', value:'New York'},
    {label:'Karachi', value:'Karachi'},
    {label:'Tokyo', value:'Tokyo'}
  ]
}
get sessionInterestOptions(){
  return [
    { label:'Session 1', value:'Session 1'},
    { label:'Session 2', value:'Session 2'},
    { label:'Session 3', value:'Session 3'}
  ]
}

get foodPreferenceOptions(){
  return [
    {label:'Veg', value:'Veg'},
    {label:'Non-Veg', value:'Non-Veg'}
  ]
}

get tshirtSizeOptions(){
  return[
    {label:'Small', value:'Small'},
    {label:'Medium', value:'Medium'},
    {label:'Large', value:'Large'}
  ]
}

get companySizeOptions(){
  return [
    { label:'1 - 50', value:'1 - 50'},
    { label:'50 - 100', value:'50 - 100'},
    { label:'100 - 200', value:'100 - 200'}
  ]
}

  handleFieldChange(event) {
    // const fieldName = event.target.value;
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
      case 'TAX RECEIPT':
        this.taxReceipt = value;
        break;
      case 'Address':
        this.attendeeAddress = value;
        break;
      case 'COUNTRY':
        this.attendeeCountry = value;
        break;
      case 'REGISTRATION TYPE':
        this.registrationType = value;
        break;
      case 'TOWN/CITY':
        this.townCity = value;
        break;
         case 'POSTAL CODE':
        this.postalCode = value;
        break;
         case 'PHONE NUMBER':
        this.phoneNumber = value;
        break;
         case 'WHICH TYPE OF SESSIONS ARE YOU MOST INTERESTED IN?':
        this.sessionInterest = value;
        break;
         case 'COMPANY NAME':
        this.companyName = value;
        break;
         case 'FOOD PREFERENCE':
        this.foodPreference = value;
        break;
         case 'T-SHIRT SIZE':
        this.tShirtSize = value;
        break;
         case 'YOUR ROLE IN COMPANY':
        this.designation = value;
        break;
         case 'COMPANY SIZE':
        this.companySize = value;
        break;
         case 'MESSAGE':
        this.message = value;
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
   
    console.log('quantity : ', q);
    console.log('price : ', i);
    console.log('Attendee Information: ' , JSON.stringify(attendeeListObj));

   
  }
toggleCheckOut(){
  let attendeeForm = this.template.querySelector('.attendee-form');
  let ticketForm = this.template.querySelector('.ticket_table_flShow');

  ticketForm.style.display = 'none'
  attendeeForm.style.display = 'block'
}
reverseToggle(){
   let attendeeForm = this.template.querySelector('.attendee-form');
  let ticketForm = this.template.querySelector('.ticket_table_flShow');

  ticketForm.style.display = 'block'
  attendeeForm.style.display = 'none'
}

  handlePayNow() {
       let attendeeListObj = {
          eventId: this.selectedEventId,
          ticketsList: this.ticketsWithQuantity,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          taxReceipt: this.taxReceipt,
          address: this.attendeeAddress,
          country:this.attendeeCountry,
          townCity:this.townCity,
          postalCode: this.postalCode,
          phone: this.phoneNumber,
          sessionInterest: this.sessionInterest,
          companyName: this.companyName,
          foodPreference: this.foodPreference,
          tShirtSize: this.tShirtSize,
          designation: this.designation,
          companySize: this.companySize,
          message: this.message
    }
    let q;
    let i;
  
    this.ticketsWithQuantity.forEach(ticket => {
      q = ticket.quantity;
      i = ticket.id;

    });
    console.log('attendeeListObj:  ',JSON.stringify(attendeeListObj));
       registerAttendee({ attendeeInfo: JSON.stringify(attendeeListObj) })
      .then((attendeeObj) => {
        console.log('OUTPUT OF REGISTER ATTENDEE : ',attendeeObj);
        this.attendeeId = attendeeObj.Id
        this.closeModal();
        
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Successfully registered for event! ',
            variant: 'success'
          })
        );
         createPaymentPage({ attendeeId: this.attendeeId, quantity: q, priceId: i })
      .then((paymentId => {
        this.paymentPageLink = paymentId;
            window.location.href = this.paymentPageLink;

        console.log('paymentId : ', paymentId);
      }))
      .catch((err) => {

      })

      })

      .catch((error) => {
        console.error('Error registering attendee: ', JSON.stringify(error));


      });


  }
}