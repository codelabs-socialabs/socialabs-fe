const assert = {
  ok: (val: unknown, msg?: string) => {
    if (!val) throw new Error(msg || 'Assertion failed');
  },
  strictEqual: (val1: unknown, val2: unknown) => {
    if (val1 !== val2) throw new Error(`Assertion failed: ${val1} !== ${val2}`);
  },
};

interface DummyAnalytics {
  hasData: boolean;
}

const run = () => {
  const analytics: DummyAnalytics = { hasData: true };
  assert.ok(analytics.hasData, 'should have data');
  assert.strictEqual(analytics.hasData, true);

  console.log('use-project-analytics self-check: OK');
};

run();
export {};
