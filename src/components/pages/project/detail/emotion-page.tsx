import { Smile } from 'lucide-react';
import FeaturePlaceholder from './feature-placeholder';

export default function EmotionPage() {
  return (
    <FeaturePlaceholder
      title="Socia Emotion"
      description="Detect emotions (joy, anger, sadness, etc.) in tweets using CNN + BiLSTM models."
      icon={Smile}
      apiEndpoint="POST /api/emotions/classify"
    />
  );
}
