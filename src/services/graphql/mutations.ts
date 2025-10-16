import { gql } from "@apollo/client/core";

export const CREATE_DOCUMENT = gql`
  mutation CreateDocument($data: CreateDocumentInput!) {
    createDocument(data: $data) {
      id
      title
      content
      sourceType
      sourceUrl
    }
  }
`;

export const CREATE_SUMMARY_JOB = gql`
  mutation CreateSummaryJob($data: CreateSummaryJobInput!) {
    createSummaryJob(data: $data) {
      id
      status
      createdAt
    }
  }
`;

export const PROCESS_SUMMARY = gql`
  subscription ProcessSummary($jobId: String!) {
    processSummary(jobId: $jobId) {
      id
      userId
      jobId
      content
      tokensUsed
      model
      createdAt
    }
  }
`;
