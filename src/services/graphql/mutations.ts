import { gql } from "@apollo/client/core";

export const CREATE_SUMMARY_JOB = gql`
  mutation CreateSummaryJob($data: CreateSummaryJobInput!) {
    createSummaryJob(data: $data) {
      id
      title
      status
      createdAt
    }
  }
`;
