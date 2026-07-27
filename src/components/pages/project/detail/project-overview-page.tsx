import { useParams } from 'react-router';
import {
  useProject,
  extractProjectId,
  useProjectAnalytics,
} from '@/features/project/hooks';
import { BarChart3, TrendingUp, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const chartConfig = {
  count: { label: 'Tweets', color: 'hsl(var(--primary))' },
  likes: { label: 'Likes', color: 'hsl(var(--chart-1))' },
  retweets: { label: 'Retweets', color: 'hsl(var(--chart-2))' },
  replies: { label: 'Replies', color: 'hsl(var(--chart-3))' },
};

export default function ProjectOverviewPage() {
  const { id: rawId } = useParams<{ id: string }>();
  const id = extractProjectId(rawId!);
  const { data: project, isLoading } = useProject(id!);
  const { data: analytics } = useProjectAnalytics(id!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (!project) return null;

  const statusColor: Record<string, string> = {
    CREATED: 'bg-slate-100 text-slate-700',
    CRAWLING: 'bg-blue-100 text-blue-700',
    MODELING: 'bg-amber-100 text-amber-700',
    COMPLETED: 'bg-green-100 text-green-700',
    FAILED: 'bg-red-100 text-red-700',
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          {project.name}
        </h1>
        {project.description && (
          <p className="text-sm text-slate-500">{project.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Tweets
            </CardTitle>
            <MessageSquare size={16} className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(project.totalTweets ?? 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Crawled
            </CardTitle>
            <TrendingUp size={16} className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(project.crawledTweets ?? 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Status
            </CardTitle>
            <BarChart3 size={16} className="text-slate-400" />
          </CardHeader>
          <CardContent>
            <Badge
              className={
                statusColor[project.processing?.status ?? 'CREATED'] || ''
              }
            >
              {project.processing?.status ?? 'CREATED'}
            </Badge>
            {project.processing?.status === 'CRAWLING' && (
              <p className="text-xs text-slate-500 mt-2">
                Progress: {project.processing?.progress ?? 0}%
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Keyword
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.keyword}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Category
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.category}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Language
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.language === 'ID' ? 'Indonesian' : 'English'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Period
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.startDate} — {project.endDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tweets Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <LineChart data={analytics.tweetsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="var(--color-count)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={analytics.topUsers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="userId"
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={analytics.engagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="likes" fill="var(--color-likes)" />
                  <Bar dataKey="retweets" fill="var(--color-retweets)" />
                  <Bar dataKey="replies" fill="var(--color-replies)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={analytics.topKeywords} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="keyword"
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
