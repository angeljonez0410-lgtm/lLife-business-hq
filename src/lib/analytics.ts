// Simple lightweight analytics utility
// Usage: analytics.track('event_name', { ...props })

const ANALYTICS_KEY = 'analytics-events';

export const analytics = {
  track: (event: string, props: Record<string, any> = {}) => {
    const payload = {
      event,
      props,
      timestamp: new Date().toISOString(),
    };
    if (typeof window !== 'undefined') {
      const prev = window.localStorage.getItem(ANALYTICS_KEY);
      const events = prev ? JSON.parse(prev) : [];
      events.push(payload);
      window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
    }
  },
  getEvents: () => {
    if (typeof window !== 'undefined') {
      const prev = window.localStorage.getItem(ANALYTICS_KEY);
      return prev ? JSON.parse(prev) : [];
    }
    return [];
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ANALYTICS_KEY);
    }
  },
};
