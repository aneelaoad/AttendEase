# AttendEase Plus: Elevating Event Experiences


## Introduction:
AttendEase is a comprehensive event registration and management software designed to streamline the entire event process, from registration to information dissemination. This document outlines key features and benefits of AttendEase.

### 1. Effortless Registration:

Intuitive Registration Interface: Attendees can easily register for events through a user-friendly interface.
Quick Registration: Fast and efficient registration process ensures a smooth experience for attendees.
Customizable Forms: Tailor registration forms to capture specific attendee information.
### 2. Detailed Event Information:

Speaker Profiles: Display detailed information about event speakers, enhancing attendee engagement.
Session Details: Provide a comprehensive schedule with session details, ensuring attendees are well-informed.
Sponsor Highlights: Showcase event sponsors to acknowledge their support and enhance brand visibility.
### 3. Attendee Management:

Attendee Directory: Create a centralized directory of attendees for networking opportunities.
Check-In System: Streamline on-site check-in processes for a hassle-free experience.
Attendee Communication: Facilitate communication between event organizers and attendees.
### 4. FAQs and Support:

Frequently Asked Questions: Address common queries through a dedicated FAQ section.
Support System: Offer assistance to attendees through a built-in support system.
### 5. Engaging Experiences:

Networking Features: Foster networking opportunities among attendees.
Interactive Features: Incorporate interactive elements to keep attendees engaged.
Gamification Options: Introduce gamification to enhance the overall event experience.
### 6. Analytics and Insights:

Data Analytics: Provide organizers with valuable insights into attendee behavior and preferences.
Reporting Tools: Generate comprehensive reports for post-event analysis and improvement.
### 7. User-Friendly Admin Panel:

Easy Configuration: Simplify the setup and configuration process for event organizers.
Real-Time Updates: Enable organizers to make real-time updates to event information.
### 8. Mobile Responsiveness:

Mobile App Compatibility: Ensure AttendEase is accessible and functional on various devices.
Mobile Notifications: Send timely updates and notifications to attendees via mobile.


## Following are the prerequisite steps:
#### Step 1: Install NodeJS and Salesforce CLI 
Ensure Salesforce CLI is installed on your local machine. If not, download and install it from the official Salesforce CLI website.
#### Step 2: Create a Salesforce Project
Open your terminal or command prompt.
Navigate to the desired directory for your project.
Run the following command to create a new Salesforce project:
```
sfdx force:project:create -n YourProjectName
```
#### Step 3: Navigate to the Project Directory
Change into the newly created project directory using the ```cd``` command:
```
cd YourProjectName
```
#### Step 4: Initialize a Git Repository
Run the following commands to initialize a Git repository for version control:
```
git init
```
#### Step 5: Add a Remote Repository
Create a new repository on a platform like GitHub, GitLab, or Bitbucket. In our case it is the GitLab.
Copy the repository URL. In our case: ```https://github.com/aneelaoad/AttendEase.git```. 
Run the following command to add the remote repository:
```
git remote add origin https://github.com/aneelaoad/AttendEase.git
```
## Following are the main steps
### Step 1: Create a Pull from the Remote Branch 'develop'
1. Open your terminal or command prompt.
2. Navigate to your local repository using the cd command.
3. Run the following command to pull the latest changes from the 'develop' branch:
 ```
git pull origin develop
```

### Step 2: Create Feature Branch (e.g., AXX-Datamodel)
Run the following command to create a new feature branch:
```
git checkout -b AXX-Datamodel
```
### Step 3: Authorize the Dev Hub and Create Scratch Org
Login in to your org and enable Dev Hub. Ensure Salesforce CLI is installed. You can authorize through the VS Code or
Authorize the Dev Hub using the following command:
```
sfdx force:auth:web:login
```
Create a new scratch org using the following command:
``` 
sf org create scratch --definition-file config/project-scratch-def.json --alias MyScratchOrg --set-default --target-dev-hub MyHub
```

### Step 4: Start Working on the Scratch Org
Begin your assigned ticket development here. Commence work on the designated task to contribute to the project's progress. Utilize this space to implement changes and enhancements aligned with your assigned ticket. Foster collaboration and streamline development processes effectively. Ensure regular updates and communication on your progress.

### Step 5: Retrieve Changes from Scratch Org and Push to Feature Branch
Retrieve changes from the scratch org using the following command:
```
sf project deploy start
```
Ensure there are no conflicts and resolve if any.
Commit the changes to your feature branch using Git commands:
```
git add .
git commit -m "Description of changes made in the scratch org"
git push origin AXX-Datamodel
```
