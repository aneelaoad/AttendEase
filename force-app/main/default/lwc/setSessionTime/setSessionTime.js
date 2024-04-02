import { LightningElement, api, wire } from 'lwc';
import getSessionTime from '@salesforce/apex/ApprovalProcessController.getSessionTime';
import setSessionTime from '@salesforce/apex/ApprovalProcessController.setSessionTime';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


// import { getRecord } from 'lightning/uiRecordApi';

// const FIELDS = ["Speaker.Name"];
export default class SetSessionTime extends LightningElement {
  sessionName;
  sessionTitle
  sessionStartTime;
  sessionEndTime;
    @api recordId;

    @wire(getSessionTime, { recordId: "$recordId"})
    getSessionResults({ error, data }) {
      if (data) {
        console.log('data', data[0].sessionName);
        console.log('data', data[0].sessionTitle);
        console.log('data', data[0].sessionStartTime);
        console.log('data', data[0].sessionEndTime);
        this.sessionName = data[0].sessionName;
        this.sessionTitle = data[0].sessionTitle;
        this.sessionStartTime = data[0].sessionStartTime;
        this.sessionEndTime = data[0].sessionEndTime;
        // this.sessionStartTime = data;
        // console.log(this.sessionStartTime);
      } else if (error) {
        this.error = error;
        // this.sessionTrackOption = undefined;
      }
    }


    handleStartTimeChange(event){
        this.sessionStartTime = event.target.value;

    }
    handleEndTimeChange(event){
        this.sessionEndTime = event.target.value;

    }
    // @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
    // contact;
  
    // get myname() {
    //   return this.contact.data.fields.Name.value;
    // }

    handleSubmission(){
      setSessionTime({ sessionName: this.sessionName, sessionStartTime: this.sessionStartTime, sessionEndTime: this.sessionEndTime })
        .then((data => {
         
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Session Updated Successfully!',
                    variant: 'success'
                })
            );
            this.closeModal();
        }))
        .catch((error) => {
            if (error.body && error.body.message ) {
                // console.log('error.body.message : ',error.body.message);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                         message:  error.body.message,
                        variant: 'error'
                    })
                );
            } else {

                console.error('Error registering speaker: ', error);

                this.errorMessage = 'An error occurred while registering speaker.';
            }

        })


        // console.log(this.recordId)
        // console.log(this.myname)
    }
}