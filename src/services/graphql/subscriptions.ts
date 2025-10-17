import { gql } from "@apollo/client/core";

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
