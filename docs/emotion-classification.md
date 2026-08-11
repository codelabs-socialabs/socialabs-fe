# Technical Documentation: Emotion Classification Pipeline

## 1. Feature Overview
The Emotion Classification module categorizes project documents into 6 core Indonesian emotional states (`Anger`, `Fear`, `Joy`, `Love`, `Sad`, `Neutral`) using CNN and BiLSTM neural networks.

## 2. Architecture Components
- **Frontend (`socialabs-fe`)**: Renders emotion distribution pie chart, dominant emotion metric cards, 6-category percentage breakdown bars, and representative posts per emotion.
- **NestJS Gateway (`socialabs-be-nest`)**:
  - `EmotionAnalysisProcessor` (BullMQ): Handles emotion classification jobs.
  - `AiBackendClient.getEmotions()`: Normalizes raw document responses from AI Backend into 6-category percentage metrics (`emotionPercentageCnn` and `emotionPercentageBilstm`).
- **FastAPI AI Service (`socialabs-be-ai`)**:
  - CNN & BiLSTM Keras model engine (`app/domains/emotion/`).

## 3. Data Flow Diagram (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor User as Frontend User
    participant FE as React Frontend
    participant Nest as NestJS Gateway
    participant Redis as BullMQ / Redis
    participant AI as FastAPI AI Service (BiLSTM)
    participant Mongo as MongoDB (emotions)

    Nest->>Redis: Trigger 'emotion-analysis' job (Chained after Sentiment)
    Redis->>Nest: EmotionAnalysisProcessor starts
    Nest->>AI: POST /emotions/predict { project_id }
    
    AI->>Mongo: Read Topic Documents by project_id
    AI->>AI: Text preprocessing & tokenization
    AI->>AI: Run CNN & BiLSTM 6-class emotion inference
    AI->>Mongo: Save EmotionModel documents
    AI-->>Nest: Return classification complete

    Nest->>Nest: Trigger next chained queue ('sna-analysis')
    Nest->>FE: SSE Progress Stream Event (stage: 'MODELING', progress: 85%)

    User->>FE: Open Emotion Analysis Page
    FE->>Nest: GET /projects/:pId/emotions
    Nest->>AI: GET /emotions/by-project/:pId
    AI->>Mongo: Query EmotionModel documents
    Mongo-->>AI: Return Emotion documents
    AI-->>Nest: Return raw document list
    Nest->>Nest: Compute 6-category percentages (Anger, Fear, Joy, Love, Sad, Neutral)
    Nest-->>FE: Return EmotionResult object
    FE->>User: Render Emotion Pie Chart, Snapshot Cards, and Representative Posts
```

## 4. Data Contracts & Interfaces

```ts
export interface EmotionPercentage {
  Anger: number;
  Fear: number;
  Joy: number;
  Love: number;
  Sad: number;
  Neutral: number;
}

export interface EmotionResult {
  total: number;
  documents: EmotionDocument[];
  emotionPercentageCnn: EmotionPercentage;
  emotionPercentageBilstm: EmotionPercentage;
  emotionByTopicCnn: Record<string, EmotionPercentage>;
  emotionByTopicBilstm: Record<string, EmotionPercentage>;
}
```

## 5. Maintenance & Notes for Developers
- **6 Core Emotion Labels**: Must remain exact case: `Anger`, `Fear`, `Joy`, `Love`, `Sad`, `Neutral`.
- **Normalization Gate**: `AiBackendClient.getEmotions` in NestJS validates that `emotionPercentageCnn` is never undefined even when AI Backend returns raw uncalculated document arrays.
