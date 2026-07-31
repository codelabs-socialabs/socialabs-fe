import {
  AlignLeft,
  BadgeCheck,
  Download,
  Hash,
  Heart,
  MessageSquare,
  Minus,
  Share2,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react';
import { useState } from 'react';

const TopicProjectPage = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('t1');

  const topics = [
    {
      id: 't1',
      name: 'Food Quality & Portion Complaints',
      volume: '8,452',
      trend: 'up',
      trendLabel: 'Trending Up',
      keywords: [
        'basi',
        'keras',
        'porsi dikit',
        'sayur layu',
        'gak layak',
        'kualitas',
        'ayam',
      ],
      aiSummary:
        'Klaster terbesar ini didominasi oleh keluhan siswa dan mahasiswa terkait lauk ayam yang keras dan sayur yang sudah tidak segar saat dibagikan. Terdapat korelasi kuat antara keluhan ini dengan pendistribusian di area spesifik Jatinangor.',
      samplePosts: [
        {
          name: 'Mahasiswa Unpad',
          handle: '@mahasiswakeren',
          time: '10:42 AM · Feb 12, 2026',
          verified: false,
          text: 'Hari ini dapet jatah mbg tapi ayamnya keras banget, sayurnya juga udah layu. Tolong dong evaluasi vendornya! Gak layak makan ini mah. #MBGJatinangor',
        },
        {
          name: 'Warga Lokal',
          handle: '@warga_jatinangor',
          time: '08:15 AM · Feb 12, 2026',
          verified: false,
          text: 'Porsi hari ini mendingan sih, tapi tetep aja nasinya agak lembek. Semoga besok evaluasi lagi ya. Semangat terus buat yang masak di dapur umum.',
        },
      ],
    },
    {
      id: 't2',
      name: 'Logistics & Distribution Delays',
      volume: '5,420',
      trend: 'stable',
      trendLabel: 'Stable',
      keywords: [
        'telat',
        'jam istirahat',
        'lapar',
        'nunggu lama',
        'distribusi kacau',
        'kurir',
        'koordinasi',
      ],
      aiSummary:
        'Percakapan berpusat pada masalah operasional di mana makanan sering tiba setelah jam istirahat siang usai. Hal ini menyebabkan keluhan jadwal yang terganggu.',
      samplePosts: [
        {
          name: 'Guru SMP 1',
          handle: '@guru_smpn1',
          time: '01:30 PM · Feb 11, 2026',
          verified: true,
          text: 'Anak-anak udah pada nunggu dari jam 12, makanan baru dateng jam 13.30. Kasihan pada kelaparan, padahal jam 1 udah mulai masuk kelas lagi. Mohon perbaiki sistem distribusinya.',
        },
      ],
    },
    {
      id: 't3',
      name: 'Packaging Waste Concerns',
      volume: '4,410',
      trend: 'up',
      trendLabel: 'Trending Up',
      keywords: [
        'sampah plastik',
        'kotak makan',
        'numpuk',
        'lingkungan',
        'daur ulang',
        'BEM',
      ],
      aiSummary:
        'Kekhawatiran yang disuarakan oleh mahasiswa dan aktivis lingkungan terkait lonjakan volume sampah plastik dari kotak makan sekali pakai yang mulai menumpuk.',
      samplePosts: [
        {
          name: 'BEM Kema Unpad',
          handle: '@bem_unpad',
          time: '04:20 PM · Feb 10, 2026',
          verified: true,
          text: 'Kami mendukung program pemenuhan gizi, namun pemerintah juga harus memikirkan solusi waste management-nya. Sampah plastik kotak MBG mulai menumpuk tak terkendali di sekitar kampus.',
        },
      ],
    },
    {
      id: 't4',
      name: 'Local Vendor Empowerment',
      volume: '2,980',
      trend: 'down',
      trendLabel: 'Declining',
      keywords: [
        'ibu pkk',
        'katering lokal',
        'terbantu',
        'ekonomi',
        'pemberdayaan',
        'dapur umum',
      ],
      aiSummary:
        'Percakapan mengenai pelibatan ibu-ibu PKK dan katering lokal di Jatinangor. Walaupun positif, volume percakapan topik ini mulai menurun tergantikan oleh isu operasional.',
      samplePosts: [
        {
          name: 'Katering Teh Euceu',
          handle: '@katering_teh_euceu',
          time: '09:00 AM · Feb 08, 2026',
          verified: false,
          text: 'Alhamdulillah, sejak ada program MBG ini ibu-ibu di RW 04 jadi punya penghasilan tambahan buat bantu suami. Semangat terus puas-puasin masaknya! Berkah buat semua.',
        },
      ],
    },
  ];

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId);

  const dominantTopic = topics[0];

  const fastestGrowingTopic = topics.find((topic) => topic.trend === 'up');

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-8 pb-10">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Topic Modeling
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Discover the primary narratives driving the conversation. Topics
              are automatically clustered by AI to reveal the discussion
              patterns that matter most.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Download size={16} />
            Export
          </button>
        </header>

        {/* Summary */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Total clusters</p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {topics.length}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Detected conversation groups
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Dominant topic</p>

            <p className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-slate-900">
              {dominantTopic?.name ?? 'No topic'}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Highest discussion volume
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">
              Fastest growing
            </p>

            <p className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-slate-900">
              {fastestGrowingTopic?.name ?? 'No growing topic'}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <TrendingUp size={13} />
              Volume increasing
            </div>
          </div>
        </section>

        {/* Topic list and deep dive */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          {/* Topic list */}
          <aside className="min-w-0">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Detected Narratives
              </h2>

              <span className="text-xs text-slate-400">
                {topics.length} topics
              </span>
            </div>

            <div className="space-y-2.5">
              {topics.map((topic) => {
                const isSelected = selectedTopicId === topic.id;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`relative w-full overflow-hidden rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? 'border-red-200 bg-red-50/70'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute inset-y-0 left-0 w-1 bg-red-500" />
                    )}

                    <h3
                      className={`line-clamp-2 pr-2 text-sm font-semibold leading-snug ${
                        isSelected ? 'text-slate-950' : 'text-slate-800'
                      }`}
                    >
                      {topic.name}
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <AlignLeft size={13} className="text-slate-400" />
                        {topic.volume} posts
                      </span>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 text-xs font-medium ${
                          topic.trend === 'up'
                            ? 'text-emerald-600'
                            : topic.trend === 'down'
                              ? 'text-slate-400'
                              : 'text-slate-500'
                        }`}
                      >
                        {topic.trend === 'up' && <TrendingUp size={13} />}

                        {topic.trend === 'down' && <TrendingDown size={13} />}

                        {topic.trend === 'stable' && <Minus size={13} />}

                        {topic.trendLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Topic detail */}
          <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {selectedTopic ? (
              <>
                <div className="p-6 lg:p-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Hash size={15} />

                      <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                        Topic Details
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                        selectedTopic.trend === 'up'
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10'
                          : selectedTopic.trend === 'down'
                            ? 'bg-slate-100 text-slate-500 ring-slate-500/10'
                            : 'bg-slate-50 text-slate-600 ring-slate-500/10'
                      }`}
                    >
                      {selectedTopic.trend === 'up' && <TrendingUp size={12} />}

                      {selectedTopic.trend === 'down' && (
                        <TrendingDown size={12} />
                      )}

                      {selectedTopic.trend === 'stable' && <Minus size={12} />}

                      {selectedTopic.trendLabel}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    {selectedTopic.name}
                  </h2>

                  {/* AI summary */}
                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-md bg-white text-xs font-semibold text-red-600 ring-1 ring-slate-200">
                        AI
                      </span>

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Topic Summary
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-700">
                      {selectedTopic.aiSummary}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="mt-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Top Keywords
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedTopic.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Representative posts */}
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 lg:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Representative Posts
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Examples that best represent this topic.
                      </p>
                    </div>

                    <span className="text-xs text-slate-400">
                      {selectedTopic.samplePosts.length}{' '}
                      {selectedTopic.samplePosts.length === 1
                        ? 'post'
                        : 'posts'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {selectedTopic.samplePosts.map((post) => (
                      <article
                        key={`${post.handle}-${post.time}`}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-600">
                              {post.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {post.name}
                                </p>

                                {post.verified && (
                                  <BadgeCheck
                                    size={15}
                                    className="shrink-0 fill-blue-500 text-white"
                                  />
                                )}
                              </div>

                              <p className="truncate text-xs text-slate-500">
                                {post.handle}
                              </p>
                            </div>
                          </div>

                          <X size={18} className="shrink-0 text-slate-300" />
                        </div>

                        <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">
                          {post.text}
                        </p>

                        <p className="mt-4 border-b border-slate-100 pb-4 text-xs font-medium text-slate-500">
                          {post.time}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-red-500"
                          >
                            <Heart size={15} />
                            Like
                          </button>

                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-500"
                          >
                            <MessageSquare size={15} />
                            Reply
                          </button>

                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-900"
                          >
                            <Share2 size={15} />
                            Copy link
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-96 items-center justify-center p-8 text-center">
                <div>
                  <Hash size={24} className="mx-auto text-slate-400" />

                  <h2 className="mt-3 text-sm font-semibold text-slate-900">
                    Select a topic
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose a narrative to view its details.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TopicProjectPage;
