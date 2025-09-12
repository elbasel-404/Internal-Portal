# 02 - Key Features and Modules

This document provides a comprehensive overview of all features and modules available in the Portal, organized by functionality and user workflows.

## 🏠 Dashboard & Home Features

### Home Page (`app/(pages)/home/`)

The personalized dashboard serves as the central hub with configurable widgets:

#### Core Widgets
- **User Information (`@userInfo`)**: 
  - Personal details and quick profile access
  - Role-based information display
  - Avatar and contact details

- **Approval Requests Table (`@approvalRequestsTable`)**: 
  - Pending approvals requiring user action
  - Quick approve/reject functionality
  - Workflow status indicators

- **Attendance Information (`@attendance`)**: 
  - Daily attendance summary
  - Recent check-in/out times
  - Monthly attendance overview

- **Profile Completion Prompt (`@completeProfile`)**: 
  - Progress indicator for profile completeness
  - Links to update missing information
  - Compliance reminders

- **General Info Widgets (`@generalInfo`)**: 
  - Customizable information panels
  - Department announcements
  - System notifications

- **News Feed (`@news`)**: 
  - Latest company news
  - Priority announcements
  - Category filtering

- **Content Carousels (`@sliders`)**: 
  - Featured content rotation
  - Important updates showcase
  - Policy highlights

- **Timeline Calendar (`@timelineCalendar`)**: 
  - Upcoming events and deadlines
  - Personal schedule integration
  - Company calendar sync

#### Dashboard Customization
- Configurable widget layout in `app/(pages)/home/components/`
- User preference-based arrangement
- Role-based widget visibility

## 📰 Communication & News System

### News Management (`app/(pages)/news/`)

Comprehensive communication platform with categorized content:

#### News Categories

**Internal Advertisements (`internal-ads/`)**
- Job postings and career opportunities
- Internal promotions and transfers
- Department-specific announcements
- Skills development programs

**Family News (`monshaat-family/`)**
- Employee milestones and celebrations
- Birth and marriage announcements
- Achievement recognitions
- Condolence notices
- Community events

**Company News (`news/`)**
- Policy updates and changes
- Financial performance updates
- Strategic initiatives
- Industry recognition

**Press & Media (`press-file/`)**
- External press releases
- Media coverage archive
- Company publications
- Newsletter archive

#### Features
- Rich text editor for content creation
- Image and document attachments
- Comment and reaction system
- Email notification integration
- Search and filtering capabilities

## 👤 Profile & Personal Information

### User Profile Management (`app/(pages)/profile/`)

Comprehensive personal information management:

#### Profile Sections
- **Personal Details**: Name, contact information, emergency contacts
- **Employment Information**: Position, department, start date, salary details
- **Family Information**: Dependents, beneficiaries, family status
- **Skills & Qualifications**: Certifications, training history, expertise
- **Bank Details**: Account information for payroll
- **Document Repository**: Personal document storage

#### Features
- Real-time profile completion tracking
- Document upload and verification
- Privacy controls for information sharing
- Audit trail for changes
- Integration with HR systems

## 📋 Request Management System

### Core Request Workflow (`app/(pages)/request/`)

Unified request processing system handling diverse employee needs:

#### Request Lifecycle
1. **Initiation**: Form-based request creation
2. **Submission**: Validation and document attachment
3. **Routing**: Automatic workflow assignment
4. **Approval**: Multi-level approval process
5. **Processing**: Backend system integration
6. **Completion**: Notification and archival

### Request Types

#### 🕒 Time & Attendance

**Attendance Requests (`attendance/`)**
- Manual check-in/out corrections
- Time adjustment requests
- Missed punch rectification
- Overtime hour documentation

**Vacation Requests (`vacations/`)**
- Annual leave applications
- Sick leave submissions
- Emergency leave requests
- Vacation balance tracking
- Calendar integration

**Permission Requests (`permissions/`)**
- Short-term absence requests
- Partial day leave
- Late arrival/early departure
- Personal emergency permissions

**Overtime Management (`overtime-assignment/`, `overtime-confirm/`)**
- Overtime assignment requests
- Hour confirmation and approval
- Rate calculation and compensation
- Project-based overtime tracking

#### 💼 HR & Administrative

**HR Letter Requests (`hr-letter/`)**
- Employment verification letters
- Salary certificates
- No objection certificates
- Experience letters
- To-whom-it-may-concern documents
- Multi-language support (Arabic/English)

**Bank Account Changes (`bank-account-change/`)**
- Account detail updates
- Bank switching procedures
- IBAN verification
- Document submission requirements

**Passport Services (`passport/`)**
- Business passport requests
- Visa application support
- Travel document processing
- Embassy coordination

#### 🏥 Benefits & Insurance

**Medical Insurance (`medical/`)**
- Insurance claim submissions
- Pre-approval requests
- Provider network information
- Reimbursement tracking
- Family member coverage

#### 🎓 Development & Training

**Training Requests (`training/`)**
- Internal training enrollment
- External course approval
- Conference attendance requests
- Certification program participation
- Budget allocation and tracking

**Probation Evaluation (`probation-period/`)**
- Performance assessment scheduling
- Goal setting and tracking
- Feedback collection
- Evaluation result processing

#### 🏢 Operational

**Custody Requests (`custody/`)**
- Equipment assignment requests
- Asset tracking and management
- Return procedure documentation
- Maintenance and repair requests

**Purchase Requests (`purchase/`)**
- Procurement requisitions
- Budget approval workflow
- Vendor selection process
- Delivery tracking

**Deputation Assignments (`deputations/`)**
- Internal assignment requests
- Location change procedures
- Temporary assignment management
- Return planning

**Remote Work Requests (`remote-work/`)**
- Work-from-home applications
- Equipment and setup requirements
- Performance monitoring agreements
- Communication protocols

#### 🚪 Career Transitions

**Resignation Requests (`resignation/`)**
- Resignation submission process
- Notice period calculation
- Exit interview scheduling
- Clearance procedures
- Knowledge transfer planning

### Request Features
- **Form Validation**: Real-time validation with clear error messages
- **Document Management**: Multi-file upload with format verification
- **Workflow Tracking**: Visual progress indicators and status updates
- **Notification System**: Email and in-app notifications
- **Comment System**: Communication between requesters and approvers
- **Audit Trail**: Complete history of actions and decisions

## 👥 Employee & Organization Management

### Employee Directory (`app/(pages)/search-employee/`)

Advanced employee search and directory services:

#### Search Capabilities
- **Name-based Search**: First name, last name, nickname
- **Contact Search**: Phone, email, extension
- **Department Filtering**: Hierarchical department browsing
- **Skills-based Search**: Expertise and certification lookup
- **Location Search**: Office, floor, desk location

#### Features
- Employee profile cards with quick contact options
- Organizational chart integration
- Direct messaging capabilities
- Calendar availability checking
- Contact export functionality

### Department Management (`app/(pages)/employee-department/`)

Organizational structure and hierarchy management:

#### Features
- **Hierarchy Visualization**: Interactive org chart
- **Department Profiles**: Team information and objectives
- **Reporting Relationships**: Clear chain of command
- **Contact Lists**: Department-specific contact information
- **Statistics Dashboard**: Department metrics and KPIs

### Job Applications (`app/(pages)/employee-application/`)

Internal career development and application management:

#### Features
- **Internal Job Postings**: Current opportunities
- **Application Tracking**: Status monitoring
- **Interview Scheduling**: Calendar integration
- **Reference Management**: Internal recommendation system
- **Skills Assessment**: Competency evaluation tools

## 📊 Performance & Analytics

### Evaluation System (`app/(pages)/evaluation/`)

Comprehensive performance management platform:

#### Goal Management (`evaluation/goals/`)
- **Goal Setting**: SMART goal creation and tracking
- **Progress Monitoring**: Regular update and review cycles
- **Alignment Tracking**: Individual goals aligned with company objectives
- **Performance Analytics**: Achievement metrics and insights

#### Features
- **360-Degree Feedback**: Multi-source evaluation input
- **Performance Reviews**: Structured evaluation processes
- **Development Planning**: Career growth roadmaps
- **Competency Assessment**: Skills gap analysis

## 📋 Compliance & Administrative

### Obligations Management (`app/(pages)/obligation/`)

Financial and administrative obligation tracking:

#### Types of Obligations
- **Financial Obligations**: Loans, advances, reimbursements
- **Compliance Requirements**: Training certifications, document renewals
- **Contractual Obligations**: Service agreements, non-compete clauses
- **Clearance Procedures**: Exit clearances, equipment returns

### Rules & Policies (`app/(pages)/rules/`)

Centralized policy and procedure repository:

#### Features
- **Policy Database**: Searchable policy library
- **Update Notifications**: Automatic alerts for policy changes
- **Acknowledgment Tracking**: Employee policy acceptance
- **Version Control**: Historical policy versions
- **Compliance Reporting**: Policy adherence monitoring

### Surveys & Feedback (`app/(pages)/surveys/`)

Employee engagement and feedback collection:

#### Survey Types
- **Employee Satisfaction**: Regular engagement surveys
- **360-Degree Feedback**: Performance-related surveys
- **Pulse Surveys**: Quick opinion polls
- **Exit Interviews**: Departure feedback collection
- **Training Evaluation**: Course effectiveness assessment

#### Features
- **Anonymous Responses**: Privacy-protected feedback
- **Real-time Analytics**: Live survey result dashboards
- **Custom Question Types**: Multiple choice, rating scales, open text
- **Automated Reminders**: Response rate optimization
- **Report Generation**: Comprehensive analysis reports

## 💰 Financial & Transaction Management

### Transaction Tracking (`app/(pages)/transaction-list/`)

Financial transaction monitoring and reporting:

#### Transaction Types
- **Payroll Transactions**: Salary, bonuses, deductions
- **Expense Reimbursements**: Travel, training, miscellaneous
- **Loan Transactions**: Employee loans and repayments
- **Insurance Claims**: Medical and other insurance transactions
- **Procurement**: Purchase order processing

#### Features
- **Real-time Tracking**: Live transaction status
- **Financial Reporting**: Comprehensive transaction reports
- **Approval Workflows**: Multi-level authorization
- **Integration**: ERP and accounting system connectivity
- **Audit Trail**: Complete transaction history

## 🔧 System Integration & APIs

### External System Integration

The Portal integrates with various external systems:

- **HR Information Systems**: Employee data synchronization
- **Payroll Systems**: Salary and benefit processing
- **ERP Systems**: Financial and procurement integration
- **Email Systems**: Notification and communication
- **Calendar Systems**: Meeting and event scheduling
- **Document Management**: File storage and retrieval

### API Architecture

- **RESTful APIs**: Standard HTTP-based communication
- **Real-time Updates**: WebSocket integration for live updates
- **Batch Processing**: Scheduled data synchronization
- **Security**: OAuth2 and JWT-based authentication
- **Rate Limiting**: API usage monitoring and control

This comprehensive feature set ensures the Portal serves as a complete internal solution for employee self-service, HR management, and organizational communication.
