import { Users } from 'lucide-react';
import FeaturePlaceholder from './feature-placeholder';

export default function InfluencerPage() {
  return (
    <FeaturePlaceholder
      title="Socia Influencer Recommendation"
      description="Identify key influencers and opinion leaders in the conversation network."
      icon={Users}
      apiEndpoint="POST /api/sna/influencer"
    />
  );
}
