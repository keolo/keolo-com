---
title: 'How to Build an EHR, Part I: Planning & Discovery'
draft: false
hiddenInHomeList: true
---
The first step towards delivering a successful project is **Planning & Discovery**. This phase involves understanding the business domain, defining the scope, and identifying the key events, interactions, and workflows that need to be implemented.

> We'll employ Event Storming as the main collaborative technique for Planning & Discovery, to model and explore the complex business processes, by focusing on events that occur within the system.

**Event Storming** encourages participants to visually map out key events, commands, and view models on a timeline, creating a shared understanding among stakeholders. It's particularly useful because it breaks down silos, facilitates clear communication, and highlights bottlenecks or inefficiencies, ultimately leading to more effective and aligned solutions in software development and process improvement.

> **Objective**: Perform Planning & Discovery for **Appointment Scheduling** by producing the following artifacts:
>
> 1. [EHR: Big Picture Event Storm](#ehr-big-picture-event-storm)
> 2. [Appointment Scheduling: Domain Model](#appointment-scheduling-domain-model)
> 3. [Appointment Scheduling: Feature Requirements](#appointment-scheduling-feature-requirements)
> 4. [EHR: Project Plan](#ehr-project-plan)

Let's start with creating the [EHR: Big Picture Event Storm](#ehr-big-picture-event-storm) before creating the process-level [Appointment Scheduling: Domain Model](#appointment-scheduling-domain-model). This will help us identify and understand all high-level events, interactions, and workflows, ensuring the main value streams and business processes are captured.

## EHR: Big Picture Event Storm
<!-- 
ffmpeg -i big-picture-event-storm.mov -vf "fps=10,scale=720:-1:flags=lanczos" -loop 0 -an -vsync 0 big-picture-event-storm.webp
 -->
![Big Picture Event Storm](../big-picture-event-storm.webp)

> The **Big Picture Event Storm** provides a high-level overview of the key events, commands, systems, and read models necessary for designing a robust Electronic Health Record (EHR) application.

The Event Storming process involves the following steps:

1. **Prepare Materials**: Prepare virtual collaboration tool, and invite key stakeholders.
1. **Define Scope**: Clarify the boundaries of the EHR system and the main goals of the Event Storming session.
1. **Categorize Objects**: Use different colors to categorize objects by type ([Event Storming Legend](#event-storming-legend)).
1. **Identify Events**: Write down all significant business events related to the EHR and place them on the timeline in order.
1. **Identify Actors**: Identify all actors involved in the events and link them to their corresponding events.
1. **Detail Processes**: Break down complex events into subprocesses and identify commands and policies.
1. **Capture Pain Points and Opportunities**: Mark pain points, inefficiencies, and potential improvements with different colored notes.
1. **Discuss and Iterate**: Facilitate discussions to validate events and processes, and iterate based on feedback.
1. **Document Outcomes**: Save the virtual board and document insights, pain points, and opportunities.
1. **Follow-Up Actions**: Create a summary report and define next steps such as detailed domain modeling or specific problem-solving workshops.

> At the end of the Eventing Storming session, you should have a clear understanding of the main business processes, events, and interactions within the EHR system and have a visual model that can guide the subsequent design and development phases.

![Big Picture Event Storm](../big-picture-event-storm.png)

Once we feel good about the **Big Picture Event Storm** we can proceed to the next step of creating a process-level event storm - the [Appointment Scheduling: Domain Model](#appointment-scheduling-domain-model).

## Appointment Scheduling: Domain Model

> The **Appointment Scheduling: Domain Model** is the process-level event storm for scheduling appointments. It's a detailed view of the Appointment Scheduling flow from the [EHR: Big Picture Event Storm](#ehr-big-picture-event-storm).

The system involves managing patient appointments and schedules by coordinating between patients, practitioners, and admins, viewing/reserving available time slots, handling appointment requests/notifications, and managing appointment statuses from scheduling to completion/cancellation.

Key policies ensure availability and scheduling are streamlined and effectively communicated.

![Appointment Scheduling Flow](../appointment-scheduling-flow.webp)

The **Appointment Scheduling: Domain Model** contains more detail than the [EHR: Big Picture Event Storm](#ehr-big-picture-event-storm) to help us visualize the interactions, data flows, and policies of the Appointment Scheduling process.

![Appointment Scheduling Flow](../appointment-scheduling-flow.png)

Next, we'll use this flow to simulate/write test scenarios via [Example Mapping](#example-mapping).

> It will also serve as a communication tool when architecting the [System Design]({{< ref "system-design" >}}) as well as future architecture discussions and feature enhancements. This is the model for the business/value workflows and the system itself (Domain Driven Design).

## Appointment Scheduling: Feature Requirements

> We can capture a feature's requirements (e.g. appointment scheduling) by defining **User Stories**, **Example Mappings**, and executable **Gherkin Scenarios** (Acceptance Criteria). This involves breaking down user stories into concrete examples and writing scenarios to ensure clarity and completeness.

The following is an example of a [User Story](#user-story), [Example Mapping](#example-mapping), and corresponding [Gherkin Scenarios](#gherkin-scenarios) for the [Appointment Scheduling Flow](#appointment-scheduling-flow).

### User Story

> **As a** patient, **I want to** request an appointment, **so that** I can receive medical care from my practitioner.

The above User Story starts at the `Request Availability` system command and ends at the `Appointment Scheduled` system event. It involves multiple steps and interactions between the patient, practitioner, and the system. Next, let's map out the various examples and scenarios for this User Story.

### Example Mapping

| **Rule**             | **Example**                           | **Scenario**                                             |
|----------------------|---------------------------------------|----------------------------------------------------------|
| Request Appointment  | Patient requests an appointment       | 1. Request appointment when slots are available          |
|                      |                                       | 2. Request appointment when no slots are available       |
| Reserve Appointment  | System reserves an appointment slot | 3. Successfully reserve an appointment slot               |
|                      |                                       | 4. Attempt to reserve an already reserved slot           |
| Send Notification    | Notification is sent upon reservation | 5. Notification sent to patient and practitioner         |
| Schedule Appointment | Practitioner confirms and schedules the appointment | 6. Schedule appointment after reservation                |
|                      |                                       | 7. Attempt to schedule appointment without reservation   |
| Cancel Appointment   | Person cancels an appointment        | 8. Cancel appointment successfully                       |
|                      |                                       | 9. Attempt to cancel an already cancelled appointment    |

### Gherkin Scenarios

> Gherkin scenarios are written in a structured format that is easy to understand and can be used for manual testing, automated testing, and acceptance testing.

Here are some example scenarios based on the Example Mapping:

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
    Given the patient is logged in
    And an appointment slot is available
    When the patient reserves the appointment slot
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

After mapping out the examples and writing the scenarios, we can now proceed to Architect the [System Design]({{< ref "system-design" >}}).

## EHR: Project Plan

- 🚧 Coming soon...

## Appendix

### Event Storming Legend

![Event Storming Legend](../legend.png)

- **View Model**: The view model represents how the system presents information back to the users or actors. It's the result of processing events and applying policies, shaping the data into a form that's useful for the user or the next action.
- **Actor**: An actor is an entity (person, system, or external trigger) that interacts with the system. Understanding who or what initiates actions is crucial for mapping out the subsequent steps.
- **Command**: A command is an action initiated by an actor, intended to cause some change in the system. It represents the intent to perform an operation.
- **System**: The system receives the command and processes it. The system's role might not always be explicitly represented as a primitive in Event Storming, but it's understood as the underlying mechanism that handles commands and triggers events.
- **Event**: The result of a command is often a domain event. An event is something that has happened in the past and is of importance to the business. It represents the outcome of a command processed by the system.
- **Policy**: A policy dictates what action should be taken in response to an event. It can be a business rule or a decision guideline that determines the next course of action. Policies are often triggered by events and can lead to the issuance of new commands.
- **Aggregates**: In Domain-Driven Design, which often goes hand-in-hand with Event Storming, an aggregate is a cluster of domain objects that can be treated as a single unit. It's where commands are processed and events are generated.
