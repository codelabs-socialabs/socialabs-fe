import { Brain } from 'lucide-react';
import FeaturePlaceholder from './feature-placeholder';

export default function TopicModelingPage() {
  return (
    <FeaturePlaceholder
      title="Socia Topic Modelling"
      description="Discover main topics discussed in tweets using ETM (Embedded Topic Model) with 10-step NLP pipeline."
      icon={Brain}
      apiEndpoint="POST /api/topics/process"
    />
  );
}
