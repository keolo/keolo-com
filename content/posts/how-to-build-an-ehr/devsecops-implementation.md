---
title: '🚧 DevSecOps implementation'
draft: false
hiddenInHomeList: true
weight: 37
---
In this article, we'll explore the key components of an EHR infrastructure, including servers, databases, and networking, and discuss best practices for designing and implementing a scalable, secure, and reliable system.

## 🚧 Draft / work in progress

> This page is currently a draft and a work in progress. Please check back soon for updates (and/or connect with me on [LinkedIn](https://www.linkedin.com/in/keolo/))!
Infrastructure is the backbone of any software system, and an Electronic Health Record (EHR) is no exception. 

<!--
## Prerequisites

1. Google Cloud Platform (GCP) Account: Ensure you have a GCP project set up.
1. GitLab Account: Ensure you have a GitLab repository set up.
1. Gitpod: [Launch Gitpod](https://www.gitpod.io/docs/getting-started/)
1. Google Cloud SDK: Install the Google Cloud SDK on your local machine.
1. Terraform: [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/install-cli)
1. Service Account: Create a GCP service account with the necessary permissions.

## Configure GitLab

Create a Google Cloud Service Account in GitLab.

![Create Service Account](../create-service-account.png)

This will create a new GCP Service Account with the necessary permissions to access the GCP resources and it will create the below CI/CD variables in GitLab.

![CI/CD Variables](../ci-cd-variables.png)

> We'll use these variables in our GitLab CI/CD pipeline to authenticate with GCP and deploy our infrastructure.

## Create a new Gitpod Workspace

Create a new Gitpod workspace associated with your GitLab repository.

## Configure Infrastructure

Create a new Terraform configuration file `main.tf` in your GitLab repository.

```hcl
provider "google" {
  credentials = jsondecode(var.gcp_credentials)
  project     = var.gcp_project
  region      = var.gcp_region
}
```
-->

## GitHub Integration

- [Connect to a GitHub Repository](https://cloud.google.com/build/docs/automating-builds/github/connect-repo-github?generation=2nd-gen)
- [Required IAM Permissions](https://cloud.google.com/build/docs/automating-builds/github/connect-repo-github?generation=2nd-gen#iam_perms) (I needed to add the time condition to make these permissions temporary, please set to a reasonable time)

```sh
PROJECT_ID=ehr-system-426323
PN=$(gcloud projects describe ${PROJECT_ID} --format="value(projectNumber)")
CLOUD_BUILD_SERVICE_AGENT="service-${PN}@gcp-sa-cloudbuild.iam.gserviceaccount.com"

CONDITION_EXPRESSION="request.time < timestamp('2028-01-01T00:00:00.000Z')"
CONDITION_TITLE="cloudbuild-connection-setup"
CONDITION_DESCRIPTION="Temporary access for Cloud Build setup"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${CLOUD_BUILD_SERVICE_AGENT}" \
  --role="roles/secretmanager.admin" \
  --condition=expression="${CONDITION_EXPRESSION}",title="${CONDITION_TITLE}",description="${CONDITION_DESCRIPTION}"
```

## Test the Cloud Run service

[Test your private service](https://cloud.google.com/run/docs/authenticating/developers#testing)

Use the following script to properly decode the JWT token payload:

```sh
# Generate the Token
TOKEN=$(gcloud auth print-identity-token --audiences=https://appointment-scheduler-xtxfjdrdea-uc.a.run.app)

# Extract the Payload Part
PAYLOAD=$(echo $TOKEN | cut -d '.' -f 2)

# Add Necessary Padding:
# The JWT base64-encoded payload needs padding. The script checks the 
# length of the payload and adds the appropriate padding:
MOD=$((${#PAYLOAD} % 4))
if [ $MOD -eq 2 ]; then
  PAYLOAD="$PAYLOAD"'=='
elif [ $MOD -eq 3 ]; then
  PAYLOAD="$PAYLOAD"'='
fi

# Decode and Pretty Print with jq
echo $PAYLOAD | base64 --decode | jq

# Validate the Token
curl -H "Authorization: Bearer $TOKEN" https://oauth2.googleapis.com/tokeninfo?id_token=$TOKEN

# Call the Cloud Run Service
curl -H "Authorization: Bearer $TOKEN" https://appointment-scheduler-xtxfjdrdea-uc.a.run.app


curl -H "Authorization: Bearer $(gcloud auth print-identity-token --audiences=https://appointment-scheduler-xtxfjdrdea-uc.a.run.app)" https://appointment-scheduler-xtxfjdrdea-uc.a.run.app
```
