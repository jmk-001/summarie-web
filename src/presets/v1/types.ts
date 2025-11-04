export const Objectives = [
  "tldr",
  "abstract",
  "exec-brief",
  "meeting-minutes",
  "changelog",
  "news-brief",
  "research-brief",
] as const;

export const Formats = [
  "paragraph",
  "bullets",
  "numbered-bullets",
  "qa",
  "table",
  "json",
] as const;

export const Tones = [
  "neutral",
  "concise",
  "warm",
  "formal",
  "technical",
  "persuasive",
  "friendly",
  "journalistic",
] as const;

export const Audiences = [
  "general",
  "executive",
  "engineer",
  "legal",
  "medical",
  "kids",
] as const;

export const ReadingLevels = [
  "grade4",
  "grade8",
  "grade12",
  "college",
  "expert",
] as const;

export const Faithfulness = ["extractive", "hybrid", "abstractive"] as const;

export const NumbersMode = ["as-is", "normalize", "none"] as const;

export const CitationMode = ["none", "inline", "footnote", "url-list"] as const;

export const RedactMode = ["none", "names", "pii", "all"] as const;

export type Objective = (typeof Objectives)[number];
export type Format = (typeof Formats)[number];
export type Tone = (typeof Tones)[number];
export type Audience = (typeof Audiences)[number];
export type ReadingLevel = (typeof ReadingLevels)[number];
export type FaithfulnessT = (typeof Faithfulness)[number];
export type NumbersModeT = (typeof NumbersMode)[number];
export type CitationModeT = (typeof CitationMode)[number];
export type RedactModeT = (typeof RedactMode)[number];

export type OneOfLength =
  | { kind: "words"; words: number }
  | { kind: "ratio"; ratio: number };

export interface PromptPresetParamsV1 {
  objective: Objective;
  format: Format;
  length: OneOfLength;
  tone: Tone;
  audience: Audience;
  readingLevel: ReadingLevel;
  faithfulness: FaithfulnessT;
  compression: number;
  include: {
    quotes?: boolean;
    numbers?: NumbersModeT;
    citations?: CitationModeT;
    timestamps?: boolean;
    redact?: RedactModeT;
  };
  modelControls?: {
    temperature?: number;
    topP?: number;
    freqPenalty?: number;
    presencePenalty?: number;
  };
}

export interface PromptPresetPayloadV1 {
  schemaVersion: 1;
  params: PromptPresetParamsV1;
}
