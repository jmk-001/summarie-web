export type CreatePromptPresetInput = {
  name: string;

  description?: string | null;

  schemaVersion: number;

  params: Record<string, any>;

  visibility: PromptVisibility;
};

export type PromptVisibility = "private" | "public" | "organization";
