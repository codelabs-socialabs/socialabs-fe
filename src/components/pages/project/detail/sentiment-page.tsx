import { TrendingUp } from 'lucide-react';
import FeaturePlaceholder from './feature-placeholder';

export default function SentimentPage() {
  return (
    <FeaturePlaceholder
      title="Socia Sentiment"
      description="Classify tweet sentiment (positive, negative, neutral) using CNN + CNN-LSTM models."
      icon={TrendingUp}
      apiEndpoint="POST /api/sentiments/classify"
    />
  );
}
