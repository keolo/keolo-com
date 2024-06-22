---
title: 'How to Build an EHR, Part I: Planning & Discovery'
draft: false
hiddenInHomeList: true
---

Event Storming is a collaborative workshop technique used to model and explore complex business processes by focusing on events that occur within a system.

This method encourages participants to visually map out key events, commands, and aggregates on a timeline, creating a shared understanding among stakeholders. It's particularly useful because it breaks down silos, facilitates clear communication, and highlights bottlenecks or inefficiencies, ultimately leading to more effective and aligned solutions in software development and process improvement.

### 1. Event Discovery

1. **Registration**
    - **Actors**: Patient, Practitioner, Administrator
    - **Event**: Account Created
    - **Outcome**: New account created in the system
2. **Authentication**
    - **Actors**: Patient, Practitioner, Administrator
    - **Event**: Person Authenticated
    - **Outcome**: Person authenticated, session created
3. **Profile Management**
    - **Actors**: Patient, Practitioner, Administrator
    - **Event**: Profile Updated
    - **Outcome**: Profile information updated in the system
4. **Patient Management**
    - **Actors**: Practitioner, Administrator
    - **Event**: Patient Record Created/Updated
    - **Outcome**: Patient demographic and medical history stored/updated
5. **Appointment Scheduling**
    - **Actors**: Patient, Practitioner, Administrator
    - **Event**: Appointment Requested, Scheduled, or Canceled
    - **Outcome**: Appointment information updated
6. **Medical Records Management**
    - **Actors**: Practitioner
    - **Event**: Medical Record Created/Updated
    - **Outcome**: Patient's medical records stored/updated
7. **Billing and Insurance**
    - **Actors**: Administrator, Billing Specialist
    - **Event**: Billing Information Created/Updated, Insurance Claim Processed
    - **Outcome**: Billing records and insurance claims processed
8. **Notification Service**
    - **Actors**: System
    - **Event**: Notification Sent (e.g., appointment reminder, test results)
    - **Outcome**: Person receives notification
9. **External System Integration**
    - **Actors**: System, External Systems
    - **Event**: Data Exchanged (with external systems pharmacy, lab, insurance)
    - **Outcome**: External data integrated, system data updated
10. **Audit Logging**
    - **Actors**: System
    - **Event**: System Access/Change Logged
    - **Outcome**: Audit log updated

### 2. Event Aggregation

1. **Person Registration & Authentication**
    - Events: Person creates an account, Person logs in
    - Aggregate: Person
2. **Profile and Patient Management**
    - Events: Patient updates profile information, Patient record created/updated
    - Aggregate: Patient
3. **Appointment Scheduling**
    - Events: Appointment requested, scheduled, or canceled
    - Aggregate: Appointment
4. **Medical Records Management**
    - Events: Medical record created/updated
    - Aggregate: MedicalRecord
5. **Billing and Insurance**
    - Events: Billing information generated/updated, insurance claim processed
    - Aggregate: Billing
6. **Notification Service**
    - Events: Notification sent
    - Aggregate: Notification
7. **External System Integration**
    - Events: Data exchanged with external systems
    - Aggregate: Integration
8. **Audit Logging**
    - Events: System access/change logged
    - Aggregate: AuditLog
9. **Data Security and Privacy Management**
    - Events: Data encrypted, access controlled
    - Aggregate: Security

### 3. Command Analysis

1. **Person Commands**
    - RegisterPerson
    - AuthenticatePerson
    - UpdateProfile
    - ScheduleAppointment
    - CancelAppointment
    - CreateMedicalRecord
    - UpdateMedicalRecord
    - GenerateBillingInfo
    - ProcessInsuranceClaim
2. **System Commands**
    - SendNotification
    - LogAuditEvent
    - EncryptData
    - ManageAccessControl

### 4. Read Model Analysis

1. **Person Details**
    - Data: Person profile, authentication status
2. **Patient Details**
    - Data: Patient demographics, medical history
3. **Appointment Details**
    - Data: Appointment schedules, notifications
4. **Medical Records**
    - Data: Medical history, lab results, imaging
5. **Billing and Insurance**
    - Data: Billing records, insurance claims
6. **Notifications**
    - Data: Notification history, status
7. **Audit Logs**
    - Data: Access and change logs
8. **Security Management**
    - Data: Encryption status, access controls

### 5. Process Modeling

1. **Account Registration Process**
    - RegisterAccount command triggers Person creates an account event
2. **Authentication Process**
    - AuthenticatePerson command triggers Person logs in event
3. **Profile Update Process**
    - UpdateProfile command triggers Person updates profile information event
4. **Patient Management Process**
    - Create/UpdatePatientRecord commands trigger Patient record created/updated events
5. **Appointment Scheduling Process**
    - ScheduleAppointment and CancelAppointment commands trigger Appointment requested, scheduled, or canceled events
6. **Medical Records Management Process**
    - Create/UpdateMedicalRecord commands trigger Medical record created/updated events
7. **Billing and Insurance Process**
    - GenerateBillingInfo and ProcessInsuranceClaim commands trigger Billing information generated/updated, insurance claim processed events
8. **Notification Process**
    - SendNotification command triggers Notification sent event
9. **External Integration Process**
    - DataExchange command triggers Data exchanged with external systems event
10. **Audit Logging Process**
    - LogAuditEvent command triggers System access/change logged event
11. **Data Security Management Process**
    - EncryptData and ManageAccessControl commands trigger Data encrypted, access controlled events

This high-level event storm provides a comprehensive overview of the key events, aggregates, commands, and read models necessary for designing a robust EHR system.

## Appendix

- [[EHR Domain Objects]]
