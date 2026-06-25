import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  CreateProjectRequest,
  ProjectCategory,
  ProjectLanguage,
} from '@/features/project/types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectRequest) => void;
  isLoading?: boolean;
}

export default function CreateProjectModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [description, setDescription] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [category, setCategory] = useState<ProjectCategory>('OTHER');
  const [language, setLanguage] = useState<ProjectLanguage>('ID');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange?.from || !dateRange?.to) return;
    onSubmit({
      name,
      description: description || undefined,
      keyword,
      startDate: format(dateRange.from, 'yyyy-MM-dd'),
      endDate: format(dateRange.to, 'yyyy-MM-dd'),
      category,
      language,
    });
    setName('');
    setDescription('');
    setKeyword('');
    setDateRange(undefined);
    setCategory('OTHER');
    setLanguage('ID');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-proj-name">Project Name</Label>
            <Input
              id="create-proj-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Brand Awareness Study"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-proj-desc">
              Description <span className="text-slate-400">(optional)</span>
            </Label>
            <Textarea
              id="create-proj-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this project about?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-proj-keyword">Keyword / Hashtag</Label>
            <Input
              id="create-proj-keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., #socialabs, @username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger
                render={(props) => (
                  <Button
                    {...props}
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateRange && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'dd MMM yyyy')} -{' '}
                          {format(dateRange.to, 'dd MMM yyyy')}
                        </>
                      ) : (
                        format(dateRange.from, 'dd MMM yyyy')
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                )}
              />
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  defaultMonth={dateRange?.from}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as ProjectCategory)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MARKETING">Marketing</SelectItem>
                  <SelectItem value="EDUCATION">Education</SelectItem>
                  <SelectItem value="HEALTH">Health</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={language}
                onValueChange={(v) => setLanguage(v as ProjectLanguage)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ID">Indonesian</SelectItem>
                  <SelectItem value="EN">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isLoading ||
                !name.trim() ||
                !keyword.trim() ||
                !dateRange?.from ||
                !dateRange?.to
              }
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
