import type { Field } from "../preset.types";
import {
  Objectives,
  Formats,
  Tones,
  Audiences,
  ReadingLevels,
  Faithfulness,
  NumbersMode,
  CitationMode,
  RedactMode,
} from "./types";

export const formSpecV1: Field[] = [
  {
    key: "objective",
    label: "Objective",
    kind: "select",
    options: Objectives,
    required: true,
  },
  {
    key: "format",
    label: "Format",
    kind: "select",
    options: Formats,
    required: true,
  },
  {
    key: "length",
    label: "Length",
    kind: "discriminated",
    discriminatorKey: "length.kind",
    cases: {
      words: [
        {
          key: "length.kind",
          label: "Mode",
          kind: "radio",
          options: ["words"] as const,
        } as any,
        {
          key: "length.words",
          label: "Words",
          kind: "slider",
          min: 10,
          max: 2000,
          step: 10,
          integer: true,
        },
      ],
      ratio: [
        {
          key: "length.kind",
          label: "Mode",
          kind: "radio",
          options: ["ratio"] as const,
        } as any,
        {
          key: "length.ratio",
          label: "Compression ratio",
          kind: "slider",
          min: 0.05,
          max: 0.9,
          step: 0.05,
        },
      ],
    },
  },
  { key: "tone", label: "Tone", kind: "select", options: Tones },
  { key: "audience", label: "Audience", kind: "select", options: Audiences },
  {
    key: "readingLevel",
    label: "Reading level",
    kind: "select",
    options: ReadingLevels,
  },
  {
    key: "faithfulness",
    label: "Faithfulness",
    kind: "select",
    options: Faithfulness,
  },
  {
    key: "compression",
    label: "Compression",
    kind: "slider",
    min: 0,
    max: 100,
    step: 1,
    integer: true,
    suffix: "%",
  },
  {
    key: "include",
    label: "Include",
    kind: "group",
    children: [
      { key: "include.quotes", label: "Allow quotes", kind: "switch" },
      {
        key: "include.numbers",
        label: "Numbers",
        kind: "select",
        options: NumbersMode,
      },
      {
        key: "include.citations",
        label: "Citations",
        kind: "select",
        options: CitationMode,
      },
      { key: "include.timestamps", label: "Timestamps", kind: "switch" },
      {
        key: "include.redact",
        label: "Redaction",
        kind: "select",
        options: RedactMode,
      },
    ],
  },
  {
    key: "modelControls",
    label: "Advanced",
    kind: "group",
    children: [
      {
        key: "modelControls.temperature",
        label: "Temperature",
        kind: "slider",
        min: 0,
        max: 1,
        step: 0.05,
      },
      {
        key: "modelControls.topP",
        label: "Top-p",
        kind: "slider",
        min: 0,
        max: 1,
        step: 0.05,
      },
      {
        key: "modelControls.freqPenalty",
        label: "Freq penalty",
        kind: "slider",
        min: -2,
        max: 2,
        step: 0.1,
      },
      {
        key: "modelControls.presencePenalty",
        label: "Presence penalty",
        kind: -2 as any,
      } as any, // (typo guard: see note)
    ],
  },
];
