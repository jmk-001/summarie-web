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

export const CREATE_PROMPT_PRESET = gql`
  mutation CreatePromptPreset($data: CreatePromptPresetInput!) {
    createPromptPreset(data: $data) {
      id
      createdAt
    }
  }
`;
