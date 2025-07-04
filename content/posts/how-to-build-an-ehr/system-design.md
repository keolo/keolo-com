---
title: 'System design'
draft: false
hiddenInHomeList: true
weight: 33 
---
Designing a system for an Electronic Health Record (EHR) involves several key components to ensure it meets the needs of healthcare providers, complies with regulatory requirements, and maintains the privacy and security of patient data. **For this tutorial, we'll focus on the Appointment Scheduling feature within the EHR application**.

> **Objective**: Design the system architecture for **Appointment Scheduling** by producing the following artifacts:
>
> 1. [System Context Diagram](#system-context-diagram)
> 1. [Platform Diagram](#platform-diagram)
> 1. [Component Diagram](#component-diagram)

Let's start with designing the [System Context Diagram](#system-context-diagram) before creating the [Platform Diagram](#platform-diagram). This will help us identify and understand all key events, interactions, policies, and workflows, ensuring the system design accurately represents the requirements and relationships.

## System Context Diagram

> The EHR System Context Diagram illustrates the interactions and data flows between the **EHR System** and various other systems and users.

The **EHR System** is central to managing appointments between providers and patients, and it syncs with calendars to ensure availability and scheduling accuracy.

Practitioners and Patients authenticate through the Authentication System, which grants them access to the underlying systems.

![System Context Diagram](../system-context-diagram.png)

The **EHR system** integrates with the Calendar System (such as Google or Apple Calendar) to sync appointments and availability, ensuring that all schedules are up-to-date. Notifications about appointments are sent to users through the Notification System via email, SMS, or push notifications.

Additionally, the **EHR System** interacts with the Billing System for financial transactions, the Registration System for new user sign-ups, and both the Practitioner Management System and Patient Management System for maintaining comprehensive profiles.

## Platform diagram

> One level lower, the Platform Diagram outlines the interactions and data flows between the **EHR Platform** and various user interfaces, as well as supporting systems for availability/scheduling and notifications.

Practitioners and patients access the **EHR Platform** through multiple interfaces tailored to their devices: Desktop, Web, and Mobile. Each of these interfaces is built using Dart and Flutter, ensuring consistent functionality across all devices.

![Platform Diagram](../platform-diagram.png)

The core **EHR Platform**, developed with Python, handles the core functionality for requesting, scheduling, and canceling appointments. It interfaces with the **Calendar System** (such as Google or Apple Calendar) to sync appointments and availability, ensuring that users' schedules are always up-to-date.

Additionally, it connects with the Notification Platform to send out appointment-related notifications via email, SMS, or push notifications, keeping users informed about their appointments. This setup ensures a seamless and integrated experience across different devices and platforms for both practitioners and patients.

If we take a closer look into the **EHR Platform**, we can see the various components and services that the platform is comprised of, in the form of a [Component Diagram](#component-diagram).

## Component diagram

> The Component Diagram highlights the various components in the **EHR Platform**. It illustrates the interactions between various platforms, services, and data repositories.

The system's frontend is composed of Desktop, Web, iOS, and Android platforms, all built using Dart and Flutter, which interface with the backend via an API Gateway.

The API Gateway routes requests to different backend services, such as the **Calendar Synchronizer**, **Appointment Scheduler**, Practitioner Manager, and Patient Manager, all developed with Python.

![Component Diagram](../component-diagram.png)

These services communicate asynchronously through a Message Queue using Pub/Sub. Data is stored and managed across multiple repositories, including **Appointment Data**, **Practitioner Data**, **Patient Data**, and Activity Data, using Cloud SQL and BigQuery.

Additionally, the system integrates with external services for authentication (Stytch or Firebase Auth), **calendar synchronization** (Google/Apple Calendar), and notifications (Email, SMS, Push). This setup ensures secure, scalable, and efficient handling of appointment scheduling and management tasks.

<!--
## Appendix

### Integration

- **External Systems Integration**: Uses HL7/FHIR standards for interoperability.
- **Payment Gateway Integration**: Manages billing and payments.
- **Third-Party Services**: Integrates with pharmacy systems, lab systems, and insurance providers.

### Security considerations

- **HIPAA Compliance**: Ensures compliance through risk assessments, safeguards, and staff training.
- **Data Encryption**: Encrypts data at rest and in transit using AES and SSL/TLS.
- **Access Control**: Employs role-based access control and regular permission reviews.
- **Audit Logging**: Maintains detailed access logs for auditing.

### Scalability and Performance

- **Auto-scaling**: Uses Google Cloud's auto-scaling for Cloud Run and Cloud SQL.
- **Caching**: Implements Google Cloud's Memorystore and frontend/backend caching strategies.
- **Database Optimization**: Uses Supabase with indexing and query optimization.
- **Message Queue**: Utilizes Google Pub/Sub for asynchronous communication.
- **CDN**: Integrates Google Cloud CDN for fast content delivery.

### Observability and Maintenance

- **Observability Tools**: Uses Google Cloud Monitoring, Cloud Logging, and Cloud Trace.
- **Disaster Recovery**: Implements backup and disaster recovery plans.

### Tech Stack

- **Flutter**: Frontend developed using Dart with Flutter.
- **Python**: Backend, Data, and Infrastructure built using Python.
- **Pulumi**: Manages cloud resources with infrastructure as code.
- **Cloud Build**: Automates CI/CD pipelines.
- **API Gateway**: Routes requests to backend services.
- **Cloud Run**: Deploys containerized applications.
- **Pub/Sub**: Messaging service for asynchronous communication.
- **Secret Manager**: Manages sensitive configuration data securely.
- **Supabase**, **Cloud Storage**, **BigQuery**: Used for data storage and analytics.
- **Looker Studio**: Creates interactive dashboards.
- **Supabase Auth**: Manages authentication and user management.
- **Cloud Scheduler**: Schedules jobs and tasks.
- **GitHub**, **Project IDX**, **ClickUp**, **Figma**: Supports development and collaboration.

### Architecture Principles

- **Domain Driven Design**: Focuses on core business logic.
- **Clean Architecture**: Separates concerns for easier maintenance and scaling.
- **Medallion Architecture**: Organizes data into Bronze (raw data), Silver (cleaned data), and Gold (aggregated data) layers for processing and analysis.

### Future Features

- [Apple Health Integration](https://support.apple.com/guide/healthregister/technical-requirements-specifications-health-apd12d144779/web)
  - [Prerequisites](https://support.apple.com/en-kg/guide/healthregister/apd380e106a1/web)
-->
