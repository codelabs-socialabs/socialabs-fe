import type { Project } from '@/types/project';

export const dummyProjects: Project[] = [
  {
    id: 'prj_001',
    workspaceId: 'ws_socialabs_001',
    name: 'MBG Prabowo Trend Monitoring',
    description:
      'Monitoring public sentiment and conversation spikes related to MBG Prabowo across Twitter.',
    createdAt: '2025-02-01',
    keyword: 'mbg prabowo',
    category: 'Politics',
    language: 'id',
    startDate: '2025-01-25',
    endDate: '2025-02-05',
    status: 'COMPLETED',
    dataLimit: 30000,
    tweetsRetrieved: 28432,
    topicsCount: 18,
  },
  {
    id: 'prj_002',
    workspaceId: 'ws_socialabs_001',
    name: 'MBG Jatinangor Local Buzz Analysis',
    description:
      'Analyzing local buzz and viral conversation regarding MBG events in Jatinangor.',
    createdAt: '2025-02-10',
    keyword: 'mbg jatinangor',
    category: 'Regional Issue',
    language: 'id',
    startDate: '2025-02-08',
    endDate: '2025-02-20',
    status: 'CRAWLING',
    dataLimit: 20000,
  },
  {
    id: 'prj_003',
    workspaceId: 'ws_socialabs_001',
    name: 'MBG Policy Response Sentiment',
    description:
      'Tracking public reactions to MBG-related government policy discussions.',
    createdAt: '2025-02-12',
    keyword: 'mbg kebijakan pemerintah',
    category: 'Public Policy',
    language: 'id',
    startDate: '2025-02-10',
    endDate: '2025-02-25',
    status: 'MODELING',
    dataLimit: 25000,
  },
  {
    id: 'prj_004',
    workspaceId: 'ws_socialabs_001',
    name: 'MBG Social Media Trend Spike',
    description:
      'Identifying unusual spikes in mentions and engagement for MBG-related hashtags.',
    createdAt: '2025-02-15',
    keyword: 'mbg viral',
    category: 'Trend Analysis',
    language: 'mixed',
    startDate: '2025-02-14',
    endDate: '2025-02-28',
    status: 'COMPLETED',
    dataLimit: 40000,
    tweetsRetrieved: 37620,
    topicsCount: 22,
  },
  {
    id: 'prj_005',
    workspaceId: 'ws_socialabs_001',
    name: 'MBG Economic Impact Discussion',
    description:
      'Evaluating discussions about the economic impact of MBG-related announcements.',
    createdAt: '2025-02-18',
    keyword: 'mbg ekonomi indonesia',
    category: 'Economy',
    language: 'id',
    startDate: '2025-02-17',
    endDate: '2025-03-01',
    status: 'FAILED',
    dataLimit: 15000,
  },
  {
    id: 'prj_006',
    workspaceId: 'ws_personal_001',
    name: 'Public Transportation Discussion',
    description:
      'Personal research about public transportation discussions in Indonesia.',
    createdAt: '2025-03-01',
    keyword: 'transportasi publik',
    category: 'Public Policy',
    language: 'id',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    status: 'COMPLETED',
    dataLimit: 10000,
    tweetsRetrieved: 9321,
    topicsCount: 9,
  },
];

export const getProjectsByWorkspaceId = (workspaceId: string): Project[] => {
  return dummyProjects.filter((project) => project.workspaceId === workspaceId);
};
