const assert = {
  ok: (val: unknown, msg?: string) => {
    if (!val) throw new Error(msg || 'Assertion failed');
  },
  strictEqual: (val1: unknown, val2: unknown) => {
    if (val1 !== val2) throw new Error(`Assertion failed: ${val1} !== ${val2}`);
  },
};

interface ProgressEvent {
  projectId: string;
  status: string;
  stage?: string | null;
  progress: number;
  crawledTweets?: number;
  error?: { stage: string; message: string } | null;
}

const TERMINAL_STATUSES = ['COMPLETED', 'FAILED'];

const parseEvent = (raw: string): ProgressEvent => {
  const data = JSON.parse(raw) as ProgressEvent;
  assert.ok(typeof data.projectId === 'string', 'projectId must be string');
  assert.ok(typeof data.status === 'string', 'status must be string');
  assert.ok(typeof data.progress === 'number', 'progress must be number');
  return data;
};

const isTerminal = (status: string): boolean =>
  TERMINAL_STATUSES.includes(status);

const run = () => {
  const event = parseEvent(
    '{"projectId":"p1","status":"CRAWLING","progress":42,"crawledTweets":10}',
  );
  assert.strictEqual(event.status, 'CRAWLING');
  assert.strictEqual(event.progress, 42);
  assert.strictEqual(isTerminal('CRAWLING'), false);
  assert.strictEqual(isTerminal('COMPLETED'), true);
  assert.strictEqual(isTerminal('FAILED'), true);

  console.log('use-project-progress self-check: OK');
};

run();
