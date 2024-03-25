import { LightningElement, wire, track } from 'lwc';
import registerSponsor from '@salesforce/apex/SponsorController.registerSponsor';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import SPONSOR_OBJECT from '@salesforce/schema/Sponsor__c';
import COMPANYTYPE_FIELD from '@salesforce/schema/Sponsor__c.Company_Type__c';
import INDUSTRY_FIELD from '@salesforce/schema/Sponsor__c.Industry__c';
import SPONSORSHIPLEVEL_FIELD from '@salesforce/schema/Sponsor__c.Sponsorship_Level__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDubaiDreaminEventId from '@salesforce/apex/EventController.getDubaiDreaminEventId';

export default class SponsorRegistrationForm extends LightningElement {
    
    @track companyTypePicklistValues = [];
    @track industryPicklistValues = [];
    @track sponsorshipLevelPicklistValues = [];


    
    selectedEventId;
    sponsorName = '';
    sponsorTitle = '';
    sponsorEmail = '';
    companyName = '';
    companyType = 'ISV';
    companyWebsite = '';
    companyPhone = '';
    companyAddress = '';
    sponsorProfileImage = '';
    companyDescription = '';
    sponsorInformation = '';
    companyIndustry='Information & Technology';
    sponsorshipLevel='Bronze';
    formReset = false;


    selectedEventId;
    showSessionFields = false;
    showModal = false;

    @wire(getObjectInfo, { objectApiName: SPONSOR_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: COMPANYTYPE_FIELD })
    wiredCompanyTypePicklistValues({ error, data }) {
        if (data) {
            this.companyTypePicklistValues = data.values.map(item => ({
                label: item.label,
                value: item.value
            }));
        } else if (error) {
            console.error('Error retrieving Company Type picklist values: ', error);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD })
    wiredIndustryPicklistValues({ error, data }) {
        if (data) {
            this.industryPicklistValues = data.values.map(item => ({
                label: item.label,
                value: item.value
            }));
        } else if (error) {
            console.error('Error retrieving Industry picklist values: ', error);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SPONSORSHIPLEVEL_FIELD })
    wiredSponsorshipLevelPicklistValues({ error, data }) {
        if (data) {
            this.sponsorshipLevelPicklistValues = data.values.map(item => ({
                label: item.label,
                value: item.value
            }));
        } else if (error) {
            console.error('Error retrieving Sponsorship Level picklist values: ', error);
        }
    }




    @wire(getDubaiDreaminEventId)
    wiredEventId({ error, data }) {
    if (data) {
        
     
        this.selectedEventId=data;
    } else if (error) {
        console.error('getDubaiDreaminEventId Error:', error);
    }
}

    openModal(event) {
        this.showModal = true;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.showModal = false;
        document.body.style.overflow = 'auto';
    }

    handleSponsorNameChange(event) {
        this.sponsorName = event.target.value;
    }

    handleSponsorTitleChange(event) {
        this.sponsorTitle = event.target.value;
    }

    handleSponsorEmailChange(event) {
        this.sponsorEmail = event.target.value;
    }

    handleSponsorshipChange(event) {
        this.sponsorshipLevel = event.target.value;
    }

    handleCompanyNameChange(event) {
        this.companyName = event.target.value;
    }

    handleCompanyTypeChange(event) {
        this.companyType = event.target.value;
    }

    handleCompnayWebsiteChange(event) {
        this.companyWebsite = event.target.value;
    }

    handleCompanyPhoneChange(event) {
        this.companyPhone = event.target.value;
    }

    handleCompanyIndustryChange(event) {
        this.companyIndustry = event.target.value;
    }

    handleCompnayAddressChange(event) {
        this.companyAddress = event.target.value;
    }

    handleSponsorProfileImageChange(event) {
        this.sponsorProfileImage = event.target.value;
    }

    handleCompnayDescriptionChange(event) {
        this.companyDescription = event.target.value;
    }

    handleSponsorInformationChange(event) {
        this.sponsorInformation = event.target.value;
    }
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        if (uploadedFiles.length > 0) {
            const file = uploadedFiles[0];
            // Access file information such as file name, document Id, etc.
            console.log('File Uploaded:', file.name);
            console.log('Document Id:', file.documentId);
            this.sponsorPictureId = file.documentId;
        }
    }
    
    resetForm() {
        this.sponsorName = '';
        this.sponsorTitle = '';
        this.sponsorEmail = '';
        this.companyName = '';
        this.companyType = 'ISV';
        this.companyWebsite = '';
        this.companyPhone = '';
        this.companyAddress = '';
        this.sponsorProfileImage = '';
        this.companyDescription = '';
        this.sponsorInformation = '';
        this.companyIndustry='Information & Technology';
        this.sponsorshipLevel='Bronze';
       this.formReset = true;



   }
    handleSponsorRegistration() {
        let sponsorInfo = {
            sponsorName:this.sponsorName,
            companyName:this.companyName,
            companyIndustry:this.companyIndustry,
            sponsorTitle: this.sponsorTitle,
            companyType:this.companyType,
            sponsorEmail:this.sponsorEmail,
            companyWebsite:this.companyWebsite,
            sponsorImage: this.sponsorProfileImage,           
            sponsorInformation: this.sponsorInformation,
            companyAddress:this.companyAddress,
            sponsorshipLevel:this.sponsorshipLevel,
            companyPhone:this.companyPhone,
            companyDescription:this.companyDescription,
            eventId: this.selectedEventId   
        };

        registerSponsor({ sponsorInfo: JSON.stringify(sponsorInfo) })
            .then((data) => {
                this.closeModal();
                this.resetForm();
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfully registered for event!',
                        variant: 'success'
                    })
                );
                // this.closeModal();
            })
            .catch((error) => {
                if (error.body && error.body.message && error.body.message.includes('A Sponsor with the same email already exists.')) {
                    console.log('error.body.message : ',error.body.message);
                    this.errorMessage = 'A Sponsor with the same email already exists.';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message:  this.errorMessage,
                            variant: 'error'
                        })
                    );
                } else {

                    console.error('Error registering sponsor: ', error);

                    this.errorMessage = 'An error occurred while registering attendee.';
                }

            })
    }

   
}