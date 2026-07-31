import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileDown,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react';
import { type ChangeEvent, type ReactNode, useMemo, useState } from 'react';

type DatasetStatus = 'included' | 'excluded' | 'duplicate' | 'processing';

type Sentiment = 'positive' | 'neutral' | 'negative' | 'unclassified';

type PostType = 'original' | 'reply' | 'repost' | 'quote';

type DatasetColumn =
  | 'post'
  | 'author'
  | 'published'
  | 'engagement'
  | 'sentiment'
  | 'topic'
  | 'status';

type ExportFormat = 'csv' | 'xlsx' | 'json';

type ExportScope = 'all' | 'included' | 'filtered' | 'selected';

interface DatasetPost {
  id: string;
  externalId: string;
  authorName: string;
  authorHandle: string;
  authorInitials: string;
  content: string;
  publishedAt: string;
  publishedTime: string;
  language: string;
  type: PostType;
  likes: number;
  replies: number;
  reposts: number;
  quotes: number;
  sentiment: Sentiment;
  sentimentConfidence: number;
  emotion: string;
  emotionConfidence: number;
  topic: string;
  status: DatasetStatus;
  sourceUrl: string;
}

interface SummaryItemProps {
  label: string;
  value: string;
  description: string;
}

interface BadgeProps {
  children: ReactNode;
  className: string;
}

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const initialDataset: DatasetPost[] = [
  {
    id: 'row-001',
    externalId: 'tweet-188923001',
    authorName: 'Mahasiswa Unpad',
    authorHandle: '@mahasiswakeren',
    authorInitials: 'MU',
    content:
      'Hari ini dapat jatah MBG, tetapi ayamnya keras dan porsinya cukup sedikit. Semoga kualitasnya bisa segera diperbaiki.',
    publishedAt: 'Feb 12, 2026',
    publishedTime: '10:42 AM',
    language: 'Indonesian',
    type: 'original',
    likes: 920,
    replies: 114,
    reposts: 214,
    quotes: 32,
    sentiment: 'negative',
    sentimentConfidence: 94,
    emotion: 'Anger',
    emotionConfidence: 87,
    topic: 'Food Quality',
    status: 'included',
    sourceUrl: 'https://x.com/example/status/188923001',
  },
  {
    id: 'row-002',
    externalId: 'tweet-188923002',
    authorName: 'Info Jatinangor',
    authorHandle: '@infojatinangor',
    authorInitials: 'IJ',
    content:
      'Program makan bergizi gratis mulai dibagikan di beberapa sekolah wilayah Jatinangor pagi ini.',
    publishedAt: 'Feb 12, 2026',
    publishedTime: '09:15 AM',
    language: 'Indonesian',
    type: 'original',
    likes: 642,
    replies: 45,
    reposts: 126,
    quotes: 18,
    sentiment: 'neutral',
    sentimentConfidence: 91,
    emotion: 'Surprise',
    emotionConfidence: 63,
    topic: 'Program Distribution',
    status: 'included',
    sourceUrl: 'https://x.com/example/status/188923002',
  },
  {
    id: 'row-003',
    externalId: 'tweet-188923003',
    authorName: 'Warga Sumedang',
    authorHandle: '@wargasumedang',
    authorInitials: 'WS',
    content:
      'Anak saya senang dengan menu hari ini. Semoga program seperti ini bisa terus berjalan dan semakin merata.',
    publishedAt: 'Feb 11, 2026',
    publishedTime: '01:08 PM',
    language: 'Indonesian',
    type: 'reply',
    likes: 411,
    replies: 29,
    reposts: 75,
    quotes: 9,
    sentiment: 'positive',
    sentimentConfidence: 96,
    emotion: 'Joy',
    emotionConfidence: 92,
    topic: 'Public Support',
    status: 'included',
    sourceUrl: 'https://x.com/example/status/188923003',
  },
  {
    id: 'row-004',
    externalId: 'tweet-188923004',
    authorName: 'Media Kampus',
    authorHandle: '@mediakampus',
    authorInitials: 'MK',
    content:
      'Distribusi terlambat hampir dua jam di salah satu titik. Pihak sekolah menyebut adanya kendala logistik.',
    publishedAt: 'Feb 11, 2026',
    publishedTime: '11:30 AM',
    language: 'Indonesian',
    type: 'quote',
    likes: 785,
    replies: 128,
    reposts: 203,
    quotes: 47,
    sentiment: 'negative',
    sentimentConfidence: 89,
    emotion: 'Sadness',
    emotionConfidence: 72,
    topic: 'Distribution Delay',
    status: 'included',
    sourceUrl: 'https://x.com/example/status/188923004',
  },
  {
    id: 'row-005',
    externalId: 'tweet-188923005',
    authorName: 'Promo Murah',
    authorHandle: '@promomurahbanget',
    authorInitials: 'PM',
    content:
      'Ikuti giveaway produk gratis dengan menggunakan tagar MBG Jatinangor.',
    publishedAt: 'Feb 10, 2026',
    publishedTime: '04:15 PM',
    language: 'Indonesian',
    type: 'repost',
    likes: 18,
    replies: 3,
    reposts: 54,
    quotes: 0,
    sentiment: 'unclassified',
    sentimentConfidence: 0,
    emotion: 'Unclassified',
    emotionConfidence: 0,
    topic: 'Unclassified',
    status: 'excluded',
    sourceUrl: 'https://x.com/example/status/188923005',
  },
  {
    id: 'row-006',
    externalId: 'tweet-188923006',
    authorName: 'Berita Hari Ini',
    authorHandle: '@beritahariini',
    authorInitials: 'BH',
    content:
      'Pelaksanaan program MBG di Jatinangor mendapat sorotan setelah beberapa unggahan warga ramai dibicarakan.',
    publishedAt: 'Feb 10, 2026',
    publishedTime: '02:54 PM',
    language: 'Indonesian',
    type: 'original',
    likes: 1150,
    replies: 184,
    reposts: 386,
    quotes: 96,
    sentiment: 'neutral',
    sentimentConfidence: 86,
    emotion: 'Surprise',
    emotionConfidence: 74,
    topic: 'Media Coverage',
    status: 'included',
    sourceUrl: 'https://x.com/example/status/188923006',
  },
  {
    id: 'row-007',
    externalId: 'tweet-188923007',
    authorName: 'Suara Pelajar',
    authorHandle: '@suarapelajar',
    authorInitials: 'SP',
    content:
      'Menunya lumayan, tetapi penyajiannya perlu diperhatikan supaya makanan tetap hangat saat dibagikan.',
    publishedAt: 'Feb 9, 2026',
    publishedTime: '12:22 PM',
    language: 'Indonesian',
    type: 'reply',
    likes: 327,
    replies: 49,
    reposts: 68,
    quotes: 11,
    sentiment: 'neutral',
    sentimentConfidence: 78,
    emotion: 'Disgust',
    emotionConfidence: 61,
    topic: 'Food Quality',
    status: 'processing',
    sourceUrl: 'https://x.com/example/status/188923007',
  },
  {
    id: 'row-008',
    externalId: 'tweet-188923008',
    authorName: 'Jatinangor Update',
    authorHandle: '@jatinangorupdate',
    authorInitials: 'JU',
    content:
      'Program MBG mulai berjalan hari ini di sejumlah sekolah wilayah Jatinangor.',
    publishedAt: 'Feb 9, 2026',
    publishedTime: '08:40 AM',
    language: 'Indonesian',
    type: 'original',
    likes: 521,
    replies: 31,
    reposts: 92,
    quotes: 15,
    sentiment: 'neutral',
    sentimentConfidence: 90,
    emotion: 'Surprise',
    emotionConfidence: 68,
    topic: 'Program Distribution',
    status: 'duplicate',
    sourceUrl: 'https://x.com/example/status/188923008',
  },
];

const columnOptions: Array<{
  id: DatasetColumn;
  label: string;
  required?: boolean;
}> = [
  {
    id: 'post',
    label: 'Post',
    required: true,
  },
  {
    id: 'author',
    label: 'Author',
  },
  {
    id: 'published',
    label: 'Published',
  },
  {
    id: 'engagement',
    label: 'Engagement',
  },
  {
    id: 'sentiment',
    label: 'Sentiment',
  },
  {
    id: 'topic',
    label: 'Topic',
  },
  {
    id: 'status',
    label: 'Status',
  },
];

const topicOptions = [
  'all',
  'Food Quality',
  'Program Distribution',
  'Public Support',
  'Distribution Delay',
  'Media Coverage',
  'Unclassified',
];

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

const getTotalEngagement = (post: DatasetPost): number => {
  return post.likes + post.replies + post.reposts + post.quotes;
};

const SummaryItem = ({ label, value, description }: SummaryItemProps) => {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
};

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
};

const Toggle = ({ checked, onChange, label }: ToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors ${
        checked ? 'bg-red-600' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

const getSentimentBadge = (sentiment: Sentiment): ReactNode => {
  const styles: Record<Sentiment, string> = {
    positive: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
    neutral: 'bg-slate-100 text-slate-600 ring-slate-500/10',
    negative: 'bg-red-50 text-red-700 ring-red-600/10',
    unclassified: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  };

  const labels: Record<Sentiment, string> = {
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    unclassified: 'Unclassified',
  };

  return <Badge className={styles[sentiment]}>{labels[sentiment]}</Badge>;
};

const getStatusBadge = (status: DatasetStatus): ReactNode => {
  const styles: Record<DatasetStatus, string> = {
    included: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
    excluded: 'bg-slate-100 text-slate-600 ring-slate-500/10',
    duplicate: 'bg-amber-50 text-amber-700 ring-amber-600/10',
    processing: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  };

  const labels: Record<DatasetStatus, string> = {
    included: 'Included',
    excluded: 'Excluded',
    duplicate: 'Duplicate',
    processing: 'Processing',
  };

  return <Badge className={styles[status]}>{labels[status]}</Badge>;
};

const getPostTypeLabel = (type: PostType): string => {
  const labels: Record<PostType, string> = {
    original: 'Original post',
    reply: 'Reply',
    repost: 'Repost',
    quote: 'Quote post',
  };

  return labels[type];
};

const ProjectDatasetPage = () => {
  const [dataset, setDataset] = useState<DatasetPost[]>(initialDataset);

  const [searchQuery, setSearchQuery] = useState('');

  const [sentimentFilter, setSentimentFilter] = useState<Sentiment | 'all'>(
    'all',
  );

  const [topicFilter, setTopicFilter] = useState('all');

  const [statusFilter, setStatusFilter] = useState<DatasetStatus | 'all'>(
    'all',
  );

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [selectedPost, setSelectedPost] = useState<DatasetPost | null>(null);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const [isColumnPanelOpen, setIsColumnPanelOpen] = useState(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');

  const [exportScope, setExportScope] = useState<ExportScope>('all');

  const [includeAllColumns, setIncludeAllColumns] = useState(true);

  const [visibleColumns, setVisibleColumns] = useState<
    Record<DatasetColumn, boolean>
  >({
    post: true,
    author: true,
    published: true,
    engagement: true,
    sentiment: true,
    topic: true,
    status: true,
  });

  const filteredDataset = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return dataset.filter((post) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        post.content.toLowerCase().includes(normalizedQuery) ||
        post.authorName.toLowerCase().includes(normalizedQuery) ||
        post.authorHandle.toLowerCase().includes(normalizedQuery) ||
        post.externalId.toLowerCase().includes(normalizedQuery) ||
        post.topic.toLowerCase().includes(normalizedQuery);

      const matchesSentiment =
        sentimentFilter === 'all' || post.sentiment === sentimentFilter;

      const matchesTopic = topicFilter === 'all' || post.topic === topicFilter;

      const matchesStatus =
        statusFilter === 'all' || post.status === statusFilter;

      return matchesSearch && matchesSentiment && matchesTopic && matchesStatus;
    });
  }, [dataset, searchQuery, sentimentFilter, topicFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDataset.length / rowsPerPage),
  );

  const paginatedDataset = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    return filteredDataset.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredDataset, currentPage, rowsPerPage]);

  const allVisibleRowsSelected =
    paginatedDataset.length > 0 &&
    paginatedDataset.every((post) => selectedRows.includes(post.id));

  const activeFilterCount = [
    sentimentFilter !== 'all',
    topicFilter !== 'all',
    statusFilter !== 'all',
  ].filter(Boolean).length;

  const selectedPosts = useMemo(
    () => dataset.filter((post) => selectedRows.includes(post.id)),
    [dataset, selectedRows],
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleToggleRow = (rowId: string): void => {
    setSelectedRows((current) =>
      current.includes(rowId)
        ? current.filter((id) => id !== rowId)
        : [...current, rowId],
    );
  };

  const handleToggleVisibleRows = (): void => {
    const visibleIds = paginatedDataset.map((post) => post.id);

    if (allVisibleRowsSelected) {
      setSelectedRows((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );

      return;
    }

    setSelectedRows((current) => [...new Set([...current, ...visibleIds])]);
  };

  const updateSelectedStatus = (status: DatasetStatus): void => {
    if (selectedRows.length === 0) {
      return;
    }

    setDataset((currentDataset) =>
      currentDataset.map((post) =>
        selectedRows.includes(post.id)
          ? {
              ...post,
              status,
            }
          : post,
      ),
    );

    setSelectedRows([]);
  };

  const updateSingleStatus = (postId: string, status: DatasetStatus): void => {
    setDataset((currentDataset) =>
      currentDataset.map((post) =>
        post.id === postId
          ? {
              ...post,
              status,
            }
          : post,
      ),
    );

    setSelectedPost((currentPost) => {
      if (!currentPost || currentPost.id !== postId) {
        return currentPost;
      }

      return {
        ...currentPost,
        status,
      };
    });

    setActionMenuId(null);
  };

  const handleClearFilters = (): void => {
    setSearchQuery('');
    setSentimentFilter('all');
    setTopicFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleColumnToggle = (column: DatasetColumn): void => {
    if (column === 'post') {
      return;
    }

    setVisibleColumns((current) => ({
      ...current,
      [column]: !current[column],
    }));
  };

  const handleExport = (): void => {
    console.log('Export dataset', {
      format: exportFormat,
      scope: exportScope,
      includeAllColumns,
      selectedPosts,
      filteredDataset,
    });

    setIsExportModalOpen(false);
  };

  const handleCopyPostId = async (externalId: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(externalId);
    } catch {
      console.warn('Clipboard is unavailable.');
    }

    setActionMenuId(null);
  };

  return (
    <>
      <div className="h-full overflow-y-auto bg-slate-50">
        <div className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6 pb-10">
            {/* Header */}
            <header className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <Database size={18} />
                  </div>

                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                      Dataset
                    </h1>
                  </div>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                  Review and manage the collected posts used throughout this
                  project&apos;s analysis.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                <Download size={16} />
                Export Dataset
              </button>
            </header>

            {/* Summary */}
            <section className="rounded-xl border border-slate-200 bg-white px-5 py-5 sm:px-6">
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryItem
                  label="Total collected"
                  value="35,400"
                  description="All collected posts"
                />

                <SummaryItem
                  label="Included"
                  value="33,820"
                  description="Used in analysis"
                />

                <SummaryItem
                  label="Excluded"
                  value="1,020"
                  description="Ignored from analysis"
                />

                <SummaryItem
                  label="Duplicates"
                  value="560"
                  description="Detected duplicate posts"
                />
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>Last collected: February 15, 2026</span>

                <span>Dataset size: 128 MB</span>
              </div>
            </section>

            {/* Dataset workspace */}
            <section className="overflow-visible rounded-xl border border-slate-200 bg-white">
              {/* Toolbar */}
              <div className="border-b border-slate-100 p-4">
                {selectedRows.length > 0 ? (
                  <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                        <Check size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {selectedRows.length} posts selected
                        </p>

                        <p className="text-xs text-slate-500">
                          Apply an action to the selected dataset rows.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateSelectedStatus('included')}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Check size={14} />
                        Include
                      </button>

                      <button
                        type="button"
                        onClick={() => updateSelectedStatus('excluded')}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                        Exclude
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsExportModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <FileDown size={14} />
                        Export
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRows([])}
                        className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="relative w-full xl:max-w-lg">
                      <Search
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search posts, accounts, topics, or IDs..."
                        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                      />

                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setCurrentPage(1);
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsFilterPanelOpen((current) => !current);

                            setIsColumnPanelOpen(false);
                          }}
                          className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition ${
                            activeFilterCount > 0
                              ? 'border-red-200 bg-red-50 text-red-600'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Filter size={15} />
                          Filters
                          {activeFilterCount > 0 && (
                            <span className="flex size-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                              {activeFilterCount}
                            </span>
                          )}
                          <ChevronDown size={14} />
                        </button>

                        {isFilterPanelOpen && (
                          <div className="absolute right-0 top-12 z-30 w-[320px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  Filter dataset
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  Narrow the visible posts.
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => setIsFilterPanelOpen(false)}
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                              >
                                <X size={16} />
                              </button>
                            </div>

                            <div className="mt-5 space-y-4">
                              <label className="block">
                                <span className="text-xs font-medium text-slate-700">
                                  Sentiment
                                </span>

                                <select
                                  value={sentimentFilter}
                                  onChange={(event) => {
                                    setSentimentFilter(
                                      event.target.value as Sentiment | 'all',
                                    );

                                    setCurrentPage(1);
                                  }}
                                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                >
                                  <option value="all">All sentiments</option>
                                  <option value="positive">Positive</option>
                                  <option value="neutral">Neutral</option>
                                  <option value="negative">Negative</option>
                                  <option value="unclassified">
                                    Unclassified
                                  </option>
                                </select>
                              </label>

                              <label className="block">
                                <span className="text-xs font-medium text-slate-700">
                                  Topic
                                </span>

                                <select
                                  value={topicFilter}
                                  onChange={(event) => {
                                    setTopicFilter(event.target.value);

                                    setCurrentPage(1);
                                  }}
                                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                >
                                  {topicOptions.map((topic) => (
                                    <option key={topic} value={topic}>
                                      {topic === 'all' ? 'All topics' : topic}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              <label className="block">
                                <span className="text-xs font-medium text-slate-700">
                                  Status
                                </span>

                                <select
                                  value={statusFilter}
                                  onChange={(event) => {
                                    setStatusFilter(
                                      event.target.value as
                                        | DatasetStatus
                                        | 'all',
                                    );

                                    setCurrentPage(1);
                                  }}
                                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                >
                                  <option value="all">All statuses</option>
                                  <option value="included">Included</option>
                                  <option value="excluded">Excluded</option>
                                  <option value="duplicate">Duplicate</option>
                                  <option value="processing">Processing</option>
                                </select>
                              </label>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                              <button
                                type="button"
                                onClick={handleClearFilters}
                                className="text-xs font-medium text-slate-500 hover:text-red-600"
                              >
                                Clear filters
                              </button>

                              <button
                                type="button"
                                onClick={() => setIsFilterPanelOpen(false)}
                                className="rounded-lg bg-red-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-red-700"
                              >
                                Apply filters
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsColumnPanelOpen((current) => !current);

                            setIsFilterPanelOpen(false);
                          }}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          <Columns3 size={15} />
                          Columns
                          <ChevronDown size={14} />
                        </button>

                        {isColumnPanelOpen && (
                          <div className="absolute right-0 top-12 z-30 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                            <p className="text-sm font-semibold text-slate-900">
                              Visible columns
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Choose columns displayed in the table.
                            </p>

                            <div className="mt-4 space-y-3">
                              {columnOptions.map((column) => (
                                <div
                                  key={column.id}
                                  className="flex items-center justify-between gap-4"
                                >
                                  <span className="text-sm text-slate-700">
                                    {column.label}
                                  </span>

                                  <Toggle
                                    checked={visibleColumns[column.id]}
                                    onChange={() =>
                                      handleColumnToggle(column.id)
                                    }
                                    label={`Toggle ${column.label} column`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Active filters */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
                  <SlidersHorizontal size={14} className="text-slate-400" />

                  {sentimentFilter !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setSentimentFilter('all')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600"
                    >
                      Sentiment: {sentimentFilter}
                      <X size={12} />
                    </button>
                  )}

                  {topicFilter !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setTopicFilter('all')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600"
                    >
                      Topic: {topicFilter}
                      <X size={12} />
                    </button>
                  )}

                  {statusFilter !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setStatusFilter('all')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium capitalize text-red-600"
                    >
                      Status: {statusFilter}
                      <X size={12} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="ml-1 text-xs font-medium text-slate-500 hover:text-red-600"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70">
                      <th className="w-12 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={allVisibleRowsSelected}
                          onChange={handleToggleVisibleRows}
                          aria-label="Select visible rows"
                          className="size-4 rounded border-slate-300 accent-red-600"
                        />
                      </th>

                      {visibleColumns.post && (
                        <th className="min-w-[360px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Post
                        </th>
                      )}

                      {visibleColumns.author && (
                        <th className="min-w-[190px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Author
                        </th>
                      )}

                      {visibleColumns.published && (
                        <th className="min-w-[140px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Published
                        </th>
                      )}

                      {visibleColumns.engagement && (
                        <th className="min-w-[130px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Engagement
                        </th>
                      )}

                      {visibleColumns.sentiment && (
                        <th className="min-w-[120px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Sentiment
                        </th>
                      )}

                      {visibleColumns.topic && (
                        <th className="min-w-[160px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Topic
                        </th>
                      )}

                      {visibleColumns.status && (
                        <th className="min-w-[120px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Status
                        </th>
                      )}

                      <th className="w-14 px-4 py-3" />
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedDataset.map((post) => {
                      const isSelected = selectedRows.includes(post.id);

                      return (
                        <tr
                          key={post.id}
                          className={`border-b border-slate-100 transition last:border-0 ${
                            isSelected ? 'bg-red-50/40' : 'hover:bg-slate-50/60'
                          }`}
                        >
                          <td className="px-4 py-4 align-top">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleRow(post.id)}
                              aria-label={`Select post by ${post.authorName}`}
                              className="mt-1 size-4 rounded border-slate-300 accent-red-600"
                            />
                          </td>

                          {visibleColumns.post && (
                            <td className="px-4 py-4 align-top">
                              <button
                                type="button"
                                onClick={() => setSelectedPost(post)}
                                className="block w-full text-left"
                              >
                                <p className="line-clamp-2 text-sm leading-relaxed text-slate-800 transition hover:text-red-600">
                                  {post.content}
                                </p>

                                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                                  <span>{getPostTypeLabel(post.type)}</span>

                                  <span>•</span>

                                  <span>{post.language}</span>

                                  <span>•</span>

                                  <span className="font-mono">
                                    {post.externalId}
                                  </span>
                                </div>
                              </button>
                            </td>
                          )}

                          {visibleColumns.author && (
                            <td className="px-4 py-4 align-top">
                              <div className="flex items-center gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                                  {post.authorInitials}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-slate-900">
                                    {post.authorName}
                                  </p>

                                  <p className="mt-0.5 truncate text-xs text-slate-500">
                                    {post.authorHandle}
                                  </p>
                                </div>
                              </div>
                            </td>
                          )}

                          {visibleColumns.published && (
                            <td className="px-4 py-4 align-top">
                              <p className="text-sm text-slate-700">
                                {post.publishedAt}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {post.publishedTime}
                              </p>
                            </td>
                          )}

                          {visibleColumns.engagement && (
                            <td className="px-4 py-4 align-top">
                              <p className="text-sm font-medium text-slate-900">
                                {formatNumber(getTotalEngagement(post))}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Total engagement
                              </p>
                            </td>
                          )}

                          {visibleColumns.sentiment && (
                            <td className="px-4 py-4 align-top">
                              {getSentimentBadge(post.sentiment)}
                            </td>
                          )}

                          {visibleColumns.topic && (
                            <td className="px-4 py-4 align-top">
                              <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                                {post.topic}
                              </span>
                            </td>
                          )}

                          {visibleColumns.status && (
                            <td className="px-4 py-4 align-top">
                              {getStatusBadge(post.status)}
                            </td>
                          )}

                          <td className="relative px-4 py-4 align-top">
                            <button
                              type="button"
                              onClick={() =>
                                setActionMenuId((current) =>
                                  current === post.id ? null : post.id,
                                )
                              }
                              aria-label="Open row actions"
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                              <MoreHorizontal size={18} />
                            </button>

                            {actionMenuId === post.id && (
                              <div className="absolute right-8 top-12 z-20 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedPost(post);

                                    setActionMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <Search size={14} />
                                  View details
                                </button>

                                <a
                                  href={post.sourceUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <ExternalLink size={14} />
                                  Open source post
                                </a>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopyPostId(post.externalId)
                                  }
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <Copy size={14} />
                                  Copy post ID
                                </button>

                                <div className="my-1 border-t border-slate-100" />

                                {post.status === 'excluded' ? (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateSingleStatus(post.id, 'included')
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-emerald-700 hover:bg-emerald-50"
                                  >
                                    <Check size={14} />
                                    Include in analysis
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateSingleStatus(post.id, 'excluded')
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 size={14} />
                                    Exclude from analysis
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {paginatedDataset.length === 0 && (
                  <div className="flex flex-col items-center px-6 py-16 text-center">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <Search size={21} />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-900">
                      No posts found
                    </h3>

                    <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500">
                      No dataset rows match the current search and filters.
                    </p>

                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="mt-4 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Clear search and filters
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex flex-col justify-between gap-4 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>Rows per page</span>

                  <select
                    value={rowsPerPage}
                    onChange={(event) => {
                      setRowsPerPage(Number(event.target.value));

                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-red-400"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>

                  <span>
                    Showing{' '}
                    {filteredDataset.length === 0
                      ? 0
                      : (currentPage - 1) * rowsPerPage + 1}
                    –
                    {Math.min(
                      currentPage * rowsPerPage,
                      filteredDataset.length,
                    )}{' '}
                    of {formatNumber(filteredDataset.length)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((current) => Math.max(1, current - 1))
                    }
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <span className="min-w-24 text-center text-xs font-medium text-slate-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((current) =>
                        Math.min(totalPages, current + 1),
                      )
                    }
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selectedPost && (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/25">
          <button
            type="button"
            aria-label="Close post details"
            onClick={() => setSelectedPost(null)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-red-600">
                  Dataset record
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-950">
                  Post Detail
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="space-y-7">
                <section>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Original content
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-800">
                    {selectedPost.content}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                      {selectedPost.authorInitials}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {selectedPost.authorName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {selectedPost.authorHandle}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                  <div>
                    <p className="text-xs text-slate-500">Published</p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {selectedPost.publishedAt}
                    </p>

                    <p className="text-xs text-slate-400">
                      {selectedPost.publishedTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Post type</p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {getPostTypeLabel(selectedPost.type)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Language</p>

                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {selectedPost.language}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Post ID</p>

                    <p className="mt-1 truncate font-mono text-xs text-slate-700">
                      {selectedPost.externalId}
                    </p>
                  </div>
                </section>

                <section>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Engagement
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      {
                        label: 'Likes',
                        value: selectedPost.likes,
                      },
                      {
                        label: 'Replies',
                        value: selectedPost.replies,
                      },
                      {
                        label: 'Reposts',
                        value: selectedPost.reposts,
                      },
                      {
                        label: 'Quotes',
                        value: selectedPost.quotes,
                      },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-lg border border-slate-200 p-3"
                      >
                        <p className="text-xs text-slate-500">{metric.label}</p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {formatNumber(metric.value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    AI classification
                  </p>

                  <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Sentiment
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {selectedPost.sentimentConfidence}% confidence
                        </p>
                      </div>

                      {getSentimentBadge(selectedPost.sentiment)}
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Emotion
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {selectedPost.emotionConfidence}% confidence
                        </p>
                      </div>

                      <Badge className="bg-slate-100 text-slate-600 ring-slate-500/10">
                        {selectedPost.emotion}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Topic
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Assigned by topic modeling
                        </p>
                      </div>

                      <Badge className="bg-slate-100 text-slate-600 ring-slate-500/10">
                        {selectedPost.topic}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Analysis status
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Determines whether this post is used.
                        </p>
                      </div>

                      {getStatusBadge(selectedPost.status)}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
              <a
                href={selectedPost.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <ExternalLink size={15} />
                Open Original
              </a>

              {selectedPost.status === 'excluded' ? (
                <button
                  type="button"
                  onClick={() =>
                    updateSingleStatus(selectedPost.id, 'included')
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  <Check size={15} />
                  Include
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    updateSingleStatus(selectedPost.id, 'excluded')
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Exclude
                </button>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Export modal */}
      {isExportModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsExportModalOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-dataset-title"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 px-5 py-5">
              <div>
                <h2
                  id="export-dataset-title"
                  className="text-lg font-semibold text-slate-950"
                >
                  Export Dataset
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose the file format and data scope.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 border-y border-slate-100 px-5 py-5">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  File format
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(['csv', 'xlsx', 'json'] as ExportFormat[]).map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setExportFormat(format)}
                      className={`rounded-lg border px-3 py-3 text-sm font-medium uppercase transition ${
                        exportFormat === format
                          ? 'border-red-300 bg-red-50 text-red-600 ring-1 ring-red-200'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900">Data scope</p>

                <div className="mt-3 space-y-2">
                  {[
                    {
                      id: 'all',
                      label: 'All collected data',
                      description: 'Export every post in the project dataset.',
                    },
                    {
                      id: 'included',
                      label: 'Included data only',
                      description: 'Only export posts used in analysis.',
                    },
                    {
                      id: 'filtered',
                      label: 'Current filtered results',
                      description: `Export ${filteredDataset.length} currently filtered rows.`,
                    },
                    {
                      id: 'selected',
                      label: 'Selected posts',
                      description: `${selectedRows.length} posts currently selected.`,
                    },
                  ].map((scope) => {
                    const scopeId = scope.id as ExportScope;

                    const disabled =
                      scopeId === 'selected' && selectedRows.length === 0;

                    return (
                      <button
                        key={scope.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => setExportScope(scopeId)}
                        className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                          exportScope === scopeId
                            ? 'border-red-300 bg-red-50/60'
                            : 'border-slate-200 hover:border-slate-300'
                        } disabled:cursor-not-allowed disabled:opacity-40`}
                      >
                        <span
                          className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${
                            exportScope === scopeId
                              ? 'border-red-600'
                              : 'border-slate-300'
                          }`}
                        >
                          {exportScope === scopeId && (
                            <span className="size-2 rounded-full bg-red-600" />
                          )}
                        </span>

                        <span>
                          <span className="block text-sm font-medium text-slate-900">
                            {scope.label}
                          </span>

                          <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                            {scope.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Include all columns
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Export hidden and visible table columns.
                  </p>
                </div>

                <Toggle
                  checked={includeAllColumns}
                  onChange={setIncludeAllColumns}
                  label="Include all export columns"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-5 py-4">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                <Download size={15} />
                Export Dataset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDatasetPage;
