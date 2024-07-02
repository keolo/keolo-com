---
title: 'How to Build an EHR, Part II: System Design'
draft: false
hiddenInHomeList: true
---
Designing a system for an Electronic Health Record (EHR) involves several key components to ensure it meets the needs of healthcare providers, complies with regulatory requirements, and maintains the privacy and security of patient data. **For this tutorial, we'll focus on the Appointment Scheduling feature within the EHR application**.

> **Objective**: Design the system architecture for Appointment Scheduling by producing the following artifacts:
>
> 1. [Appointment Scheduling: Context Diagram](#appointment-scheduling-context-diagram)
> 1. [Appointment Scheduling: Platform Diagram](#appointment-scheduling-platform-diagram)
> 1. [Appointment Scheduling: Component Diagram](#appointment-scheduling-component-diagram)

Let's start with designing the [Appointment Scheduling: Context Diagram](#appointment-scheduling-context-diagram) before creating the [Appointment Scheduling: Context Diagram](#appointment-scheduling-context-diagram). This will help us identify and understand all key events, interactions, policies, and workflows, ensuring the system design accurately represents the requirements and relationships.

## Appointment Scheduling: Context Diagram

> The Appointment System Context Diagram illustrates the interactions and data flows between the **Appointment System** and various other systems and users.

The **Appointment System** is central to managing appointments between providers and patients, and it syncs with calendars to ensure availability and scheduling accuracy.

Practitioners and Patients authenticate through the Authentication System, which grants them access to the underlying systems.

![Context Diagram](../context-diagram.png)

The **Appointment System** integrates with the Calendar System (such as Google or Apple Calendar) to sync appointments and availability, ensuring that all schedules are up-to-date. Notifications about appointments are sent to users through the Notification System via email, SMS, or push notifications.

Additionally, the **Appointment System** interacts with the Billing System for financial transactions, the Registration System for new user sign-ups, and both the Practitioner Management System and Patient Management System for maintaining comprehensive profiles.

Finally, it also connects with the Medical Records System to ensure that appointments are aligned with the patient's medical history and ongoing treatment plans.

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

## Appointment Scheduling: Platform Diagram

> One level lower, the Platform Diagram outlines the interactions and data flows between the **Appointment Platform** and various user interfaces, as well as supporting systems for availability/scheduling and notifications.

Practitioners and patients access the **Appointment Platform** through multiple interfaces tailored to their devices: Desktop, Web, and Mobile. Each of these interfaces is built using Dart and Flutter, ensuring consistent functionality across all devices.

![Platform Diagram](../platform-diagram.png)

The core **Appointment Platform**, developed with Python, handles the core functionality for requesting, scheduling, and canceling appointments. It interfaces with the **Calendar System** (such as Google or Apple Calendar) to sync appointments and availability, ensuring that users' schedules are always up-to-date.

Additionally, it connects with the Notification Platform to send out appointment-related notifications via email, SMS, or push notifications, keeping users informed about their appointments. This setup ensures a seamless and integrated experience across different devices and platforms for both practitioners and patients.

If we take a closer look into the **Appointment Platform**, we can see the various components and services that the platform is comprised of, in the form of a [Appointment Scheduling: Component Diagram](#appointment-scheduling-component-diagram).

## Appointment Scheduling: Component Diagram

> The Component Diagram illustrates the pieces in the **Appointment Platform**, highlighting the interactions between various platforms, services, and data repositories.

The system's frontend is composed of Desktop, Web, iOS, and Android platforms, all built using Dart and Flutter, which interface with the backend via an API Gateway.

The API Gateway routes requests to different backend services, such as the **Calendar Synchronizer**, **Appointment Scheduler**, Practitioner Manager, and Patient Manager, all developed with Python.

![Component Diagram](../component-diagram.png)

These services communicate asynchronously through a Message Queue using Pub/Sub. Data is stored and managed across multiple repositories, including **Appointment Data**, **Practitioner Data**, **Patient Data**, and Activity Data, using Cloud SQL and BigQuery.

Additionally, the system integrates with external services for authentication (Stytch or Firebase Auth), **calendar synchronization** (Google/Apple Calendar), and notifications (Email, SMS, Push). This setup ensures secure, scalable, and efficient handling of appointment scheduling and management tasks.

## Appendix

### Integration

- **External Systems Integration**: Using HL7/FHIR standards for interoperability with other healthcare systems.
- **Payment Gateway Integration**: For handling billing and payments.
- **Third-Party Services**: Integration with services like pharmacy systems, lab systems, and insurance providers.

### Security Considerations

- **HIPAA Compliance:** Ensuring all data handling practices comply with HIPAA regulations. This involves conducting regular risk assessments, implementing necessary safeguards, and providing training to staff on HIPAA requirements.
- **Data Encryption:** Encrypting data at rest and in transit using industry-standard protocols. This is achieved by using advanced encryption standards (AES) and secure socket layer (SSL)/transport layer security (TLS) protocols.
- **Access Control:** Implementing strict access controls based on user roles and the principle of least privilege. This requires configuring role-based access control (RBAC) systems and regularly reviewing user permissions to ensure minimal access necessary for job functions.
- **Audit Logging:** Maintaining detailed logs of all access and changes to patient data for auditing purposes. This is done by deploying logging mechanisms that capture and store comprehensive records of user activities and system events, which are then monitored and reviewed regularly.

### Scalability and Performance

- **Auto-scaling**: Implement Google Cloud's auto-scaling capabilities for both Cloud Run and Cloud SQL to dynamically adjust resources based on demand. This allows the system to handle peak loads efficiently and ensures cost-effective resource utilization.
- **Caching**: Utilize Google Cloud's Memorystore for caching frequently accessed data, reducing response times and lowering the load on primary databases. Integrate caching strategies in both the frontend (Dart/Flutter) and backend (Python) to optimize performance.
- **Database Optimization**: Leverage Firestore or Cloud SQL for scalable and performant data storage. Implement indexing and query optimization to enhance database performance, especially for complex queries and large datasets.
- **Message Queue**: Use Google Pub/Sub for asynchronous communication between microservices, ensuring smooth handling of high-throughput and bursty workloads. This helps decouple services and improves overall system scalability.
- **Content Delivery Network (CDN)**: Integrate Google Cloud CDN to deliver static content swiftly to users worldwide, reducing latency and improving load times for web and mobile applications.

### Observability and Maintenance

- **Observability Tools**: Utilize tools like Google Cloud Monitoring, Cloud Logging, and Cloud Trace.
- **Disaster Recovery**: Implement backup and disaster recovery plans to ensure data integrity and availability.

### Tech Stack

- **Dart/Flutter**: The frontend is developed using Dart with Flutter, allowing for a high-performance, cross-platform user interface that runs on iOS, Android, and the web.
- **Python**: The backend of the application is built using Python to allow for easier skill and knowledge transfer between backend, data science, and devops teams.
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

### Architecture Principles

- **Domain Driven Design**: Focuses on the core business domain and its logic.
- **Clean Architecture**: Emphasizes separation of concerns, making the system easier to maintain and scale.
- **Medallion Architecture**: Structures data into layers (Bronze, Silver, Gold) for organized processing and analysis.
  - **Bronze Layer (Raw Data)**: Stores raw data ingested through Pub/Sub in Cloud Storage.
  - **Silver Layer (Cleaned Data)**: Dataflow processes raw data, cleaning and transforming it into a more refined state, stored in Cloud SQL.
  - **Gold Layer (Aggregated Data)**: Aggregated and enriched data stored in BigQuery, ready for analysis and reporting with Looker.

### Future Features

- [Apple Health Integration](https://support.apple.com/guide/healthregister/technical-requirements-specifications-health-apd12d144779/web)
  - [Prerequisites](https://support.apple.com/en-kg/guide/healthregister/apd380e106a1/web)
