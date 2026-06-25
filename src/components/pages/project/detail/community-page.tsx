import { Network } from 'lucide-react';
import FeaturePlaceholder from './feature-placeholder';

export default function CommunityPage() {
  return (
    <FeaturePlaceholder
      title="Socia Community Detection"
      description="Detect communities and clusters using Louvain method and network analysis."
      icon={Network}
      apiEndpoint="POST /api/sna/community"
    />
  );
}
