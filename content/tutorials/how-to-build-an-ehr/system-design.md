---
title: 'How to Build an EHR, Part II: System Design'
draft: false
hiddenInHomeList: true
---
## Introduction

Designing a system for an Electronic Health Record (EHR) involves several key components to ensure it meets the needs of healthcare providers, complies with regulatory requirements, and maintains the privacy and security of patient data. For this tutorial, we'll focus on the Appointment Scheduling process within the EHR platform.

We should start by Event Storming the [Appointment Scheduling process](#appointment-scheduling-flow) before creating a [Context Diagram](#appointment-system-context-diagram) to comprehensively identify and understand all the key events, interactions, policies, and workflows involved, ensuring the system design accurately represents the system's requirements and relationships.

## Appointment Scheduling Flow

The Appointment Scheduling Flow for the EHR system involves managing patient appointments and schedules by coordinating between patients, practitioners, and coordinators, viewing and reserving available time slots, handling appointment requests and notifications, and managing appointment statuses from scheduling to completion or cancellation. Key policies ensure availability and scheduling are streamlined and effectively communicated.

![Appointment Scheduling Flow](../appointment-scheduling-flow.webp)

The Appointment Scheduling Flow contains more detail than the Big Picture Event storm so that we can map out the interactions, data flows, and policies of the Appointment Scheduling process.

We'll also use this flow to simulate/write test scenarios via [Example Mapping](#example-mapping) and will serve as a point of reference when designing the [Appointment System Context Diagram](#appointment-system-context-diagram).

## Example Mapping

Example Mapping involves breaking down user stories into concrete examples and writing scenarios to ensure clarity and completeness. Here's an example mapping and corresponding Cucumber scenarios for the Appointment Scheduling Flow.

### User Story

**As a** patient, **I want to** request an appointment, **so that** I can receive medical care from my practitioner.

### Mappings

| **Rule**             | **Example**                           | **Scenario**                                             |
|----------------------|---------------------------------------|----------------------------------------------------------|
| Request Appointment  | Patient requests an appointment       | 1. Request appointment when slots are available          |
|                      |                                       | 2. Request appointment when no slots are available       |
| Reserve Appointment  | System reserves an appointment slot | 3. Successfully reserve an appointment slot               |
|                      |                                       | 4. Attempt to reserve an already reserved slot           |
| Send Notification    | Notification is sent upon reservation | 5. Notification sent to patient and practitioner         |
| Schedule Appointment | Practitioner confirms/schedules appointment | 6. Schedule appointment after reservation                |
|                      |                                       | 7. Attempt to schedule appointment without reservation   |
| Cancel Appointment   | Person cancels an appointment        | 8. Cancel appointment successfully                       |
|                      |                                       | 9. Attempt to cancel an already cancelled appointment    |

### Cucumber Scenarios

#### Scenario 1: Request appointment when slots are available

```gherkin
Feature: Request Appointment
  Scenario: Request appointment when slots are available
    Given the patient is logged in
    And there are available appointment slots
    When the patient requests an appointment
    Then the appointment is requested successfully
    And a confirmation message is shown
```

#### Scenario 2: Request appointment when no slots are available

```gherkin
Feature: Request Appointment
  Scenario: Request appointment when no slots are available
    Given the patient is logged in
    And there are no available appointment slots
    When the patient requests an appointment
    Then an error message is shown indicating no availability
```

#### Scenario 3: Successfully reserve an appointment slot

```gherkin
Feature: Reserve Appointment
  Scenario: Successfully reserve an appointment slot
    Given the practitioner is logged in
    And an appointment slot is available
    When the practitioner reserves the appointment slot
    Then the appointment slot is reserved successfully
    And a confirmation message is shown
```

#### Scenario 4: Attempt to reserve an already reserved slot

```gherkin
Feature: Reserve Appointment
  Scenario: Attempt to reserve an already reserved slot
    Given the practitioner is logged in
    And the appointment slot is already reserved
    When the practitioner attempts to reserve the appointment slot
    Then an error message is shown indicating the slot is already reserved
```

#### Scenario 5: Notification sent to patient and practitioner

```gherkin
Feature: Send Notification
  Scenario: Notification sent to patient and practitioner
    Given the appointment slot is reserved
    When the system sends a notification
    Then the patient receives a notification
    And the practitioner receives a notification
```

#### Scenario 6: Schedule appointment after reservation

```gherkin
Feature: Schedule Appointment
  Scenario: Schedule appointment after reservation
    Given the appointment slot is reserved
    When the system schedules the appointment
    Then the appointment is scheduled successfully
    And a confirmation message is shown to both the patient and practitioner
```

#### Scenario 7: Attempt to schedule appointment without reservation

```gherkin
Feature: Schedule Appointment
  Scenario: Attempt to schedule appointment without reservation
    Given the appointment slot is not reserved
    When the system attempts to schedule the appointment
    Then an error message is shown indicating reservation is required
```

#### Scenario 8: Cancel appointment successfully

```gherkin
Feature: Cancel Appointment
  Scenario: Cancel appointment successfully
    Given the patient is logged in
    And the appointment is scheduled
    When the patient cancels the appointment
    Then the appointment is cancelled successfully
    And a cancellation confirmation is sent to both the patient and practitioner
```

#### Scenario 9: Attempt to cancel an already cancelled appointment

```gherkin
Feature: Cancel Appointment
  Scenario: Attempt to cancel an already cancelled appointment
    Given the patient is logged in
    And the appointment is already cancelled
    When the patient attempts to cancel the appointment
    Then an error message is shown indicating the appointment is already cancelled
```

These scenarios cover various aspects of the appointment scheduling process, ensuring that the system behaves as expected under different conditions.

After mapping out the examples and writing the scenarios, we can proceed to design the [Appointment System Context Diagram](#appointment-system-context-diagram).

## Appointment System Context Diagram

The Appointment System Context Diagram illustrates the interactions and data flows between the Appointment System and various other systems and users. The Appointment System is central to managing appointments between providers and patients, and it syncs with calendars to ensure availability and scheduling accuracy. Practitioners and patients authenticate through the Authentication System, which grants them access to the underlying systems.

![Context Diagram](../context-diagram.png)

The Appointment System integrates with the Calendar System (such as Google or Apple Calendar) to sync appointments and availability, ensuring that all schedules are up-to-date. Notifications about appointments are sent to users through the Notification System via email, SMS, or push notifications. Additionally, the Appointment System interacts with the Billing System for financial transactions, the Registration System for new user sign-ups, and both the Practitioner Management System and Patient Management System for maintaining comprehensive profiles. Finally, it also connects with the Medical Records System to ensure that appointments are aligned with the patient's medical history and ongoing treatment plans.

### Actors

- **Practitioners**: Healthcare professionals who access patient records, prescribe medications, and schedule appointments.
  - **Doctors**: Healthcare professionals who access patient records, prescribe medications, and schedule appointments.
  - **Nurses**: Assist doctors in patient care, record vital signs, and update patient information.
- **Patients**: Access their own health records, schedule appointments, and communicate with healthcare providers.
- **Administrators**: Manage user accounts, system settings, and generate reports.

### Systems

- **Appointment System**: Manages patient appointments, availability of practitioners, and scheduling.
- **Notification System**: Sends reminders for appointments, test results, and other important information.
- **Calendar System**: Integrates with the appointment system to manage practitioner schedules.
- **Billing System**: Manages patient billing, insurance claims, and payment processing.
- **External Systems**: Pharmacy systems, lab systems, insurance providers, and other healthcare systems that the EHR integrates with.

## Platform Diagram

Drilling down one level lower, the Platform Diagram outlines the interactions and data flows between the Appointment Platform and various user interfaces, as well as supporting systems for availability/scheduling and notifications. Practitioners and patients access the Appointment Platform through multiple interfaces tailored to their devices: Desktop, Web, and Mobile. Each of these interfaces is built using Dart and Flutter, ensuring consistent functionality across all devices.

![Platform Diagram](../platform-diagram.png)

The core Appointment Platform, developed with Python and Flask, handles the core functionality for requesting, scheduling, and canceling appointments. It interfaces with the Calendar Platform (such as Google or Apple Calendar) to sync appointments and availability, ensuring that users' schedules are always up-to-date. Additionally, it connects with the Notification Platform to send out appointment-related notifications via email, SMS, or push notifications, keeping users informed about their appointments. This setup ensures a seamless and integrated experience across different devices and platforms for both practitioners and patients.

If we take a closer look into the Appointment Platform, we can see the various components and services that the platform is comprised of.

## Component Diagram

![Component Diagram](../component-diagram.png)

### Components

- **API Gateway**: Manages all incoming API requests, ensuring security and proper routing.
- **Message Queue**: Facilitates asynchronous communication between microservices (Google Cloud Pub/Sub).
- **Microservices**: Each core functionality (e.g., patient management, appointment scheduling, billing) is a separate microservice and repository.
  - **Calendar Syncronizer**: Syncs appointments with external calendar systems.
  - **Appointment Scheduler**: Manages appointment scheduling and availability.
  - **Practitioner Manager**: Handles practitioner profiles and availability.
  - **Patient Manager**: Manages patient profiles and medical history.
- **Data Stores**: Databases for storing structured and unstructured data.
  - **Activity Database**: Stores user activity logs for auditing purposes.
  - **Appointment Database**: Stores appointment details and schedules.
  - **Practitioners Database**: Stores practitioner profiles and availability.
  - **Patients Database**: Stores patient profiles and medical history.

### Integration

- **External Systems Integration**: Using HL7/FHIR standards for interoperability with other healthcare systems.
- **Payment Gateway Integration**: For handling billing and payments.
- **Third-Party Services**: Integration with services like pharmacy systems, lab systems, and insurance providers.

## Security Considerations

- **HIPAA Compliance:** Ensuring all data handling practices comply with HIPAA regulations. This involves conducting regular risk assessments, implementing necessary safeguards, and providing training to staff on HIPAA requirements.
- **Data Encryption:** Encrypting data at rest and in transit using industry-standard protocols. This is achieved by using advanced encryption standards (AES) and secure socket layer (SSL)/transport layer security (TLS) protocols.
- **Access Control:** Implementing strict access controls based on user roles and the principle of least privilege. This requires configuring role-based access control (RBAC) systems and regularly reviewing user permissions to ensure minimal access necessary for job functions.
- **Audit Logging:** Maintaining detailed logs of all access and changes to patient data for auditing purposes. This is done by deploying logging mechanisms that capture and store comprehensive records of user activities and system events, which are then monitored and reviewed regularly.

## Scalability and Performance

- **Load Balancing**: Using load balancers to distribute incoming requests evenly across servers.
- **Auto-scaling**: Automatically scaling services based on demand to handle peak loads.
- **Caching**: Implementing caching strategies to improve response times for frequently accessed data.

## Monitoring and Maintenance

- **Monitoring Tools**: Using tools like Google Cloud Monitoring. 
- **Logging/Tracing**: Centralized logging using tools like Google Cloud Logging/Trace.
- **Disaster Recovery**: Implementing backup and disaster recovery plans to ensure data integrity and availability.

This high-level design provides a comprehensive foundation for an EHR system that is scalable, secure, and compliant with healthcare regulations.

## Tech Stack

- **Dart/Flutter**: The frontend is developed using Dart with Flutter, allowing for a high-performance, cross-platform user interface that runs on iOS, Android, and the web.
- **Python/Flask**: The backend of the application is built using Python with Flask, providing a lightweight and flexible framework for developing robust web services.
- **Terraform**: An infrastructure as code tool that allows for the safe and efficient provisioning and management of cloud resources through declarative configuration files.
- **Cloud Run**: Facilitates the deployment of containerized applications in a fully managed environment, ensuring scalability and efficiency.
- **Pub/Sub**: A messaging service for event-driven architectures, enabling asynchronous communication between different parts of the system.
- **Open Telemetry**: Utilized for observability, this tool helps in collecting, processing, and exporting telemetry data like traces, metrics, and logs.
- **Secret Manager**: Manages sensitive configuration data, such as API keys and database credentials, securely storing and accessing secrets.
- **Firestore or Cloud SQL**: These databases are used for storing and managing application data, with Firestore offering a NoSQL solution and Cloud SQL providing a relational database option.
- **Cloud Storage**: Used for storing unstructured data such as files, images, and backups, offering scalable and durable storage solutions.
- **BigQuery**: Employed for powerful, scalable data analytics, enabling complex queries and insights on large datasets.
- **Looker Studio**: Used for creating interactive and shareable dashboards, facilitating data visualization and business intelligence insights.
- **Stytch**: Handles authentication and user management, ensuring secure and streamlined access to the application.
- **Cloud Scheduler**: Automates the scheduling of jobs and tasks, ensuring timely execution of recurring activities.
- **GitLab**: Provides source code management and CI/CD pipelines, enabling efficient version control and automated deployment processes.
- **Gitpod**: Offers a cloud-based development environment, ensuring consistent and collaborative coding experiences for the development team.

## Architecture Principles

- **Domain Driven Design**: Focus on the core business domain and its logic.
- **Clean Architecture**: Emphasize separation of concerns, making the system easier to maintain and scale.
- **Medallion Architecture**: Structuring data into layers (Bronze, Silver, Gold) for organized processing and analysis.
  - **Bronze Layer (Raw Data)**: Stores raw data ingested through Pub/Sub in Cloud Storage.
  - **Silver Layer (Cleaned Data)**: Dataflow processes raw data, cleaning and transforming it into a more refined state, stored in Cloud SQL.
  - **Gold Layer (Aggregated Data)**: Aggregated and enriched data stored in BigQuery, ready for analysis and reporting with Looker.

## Appendix

- [Apple Health Integration](https://support.apple.com/guide/healthregister/technical-requirements-specifications-health-apd12d144779/web)
  - [Prerequisites](https://support.apple.com/en-kg/guide/healthregister/apd380e106a1/web)
