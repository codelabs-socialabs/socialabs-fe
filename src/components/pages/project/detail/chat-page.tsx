import { MessageCircle } from 'lucide-react';
import FeaturePlaceholder from './feature-placeholder';

export default function ChatPage() {
  return (
    <FeaturePlaceholder
      title="Socia Chat"
      description="Chat with AI to ask questions about your project data and get insights."
      icon={MessageCircle}
      apiEndpoint="POST /api/chat"
    />
  );
}
