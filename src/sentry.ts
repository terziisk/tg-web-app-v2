import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://dc33e5e1dfe2f68ec31f7a90389b36d8@o4509565757816832.ingest.de.sentry.io/4509565772169296",
  sendDefaultPii: true,

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // включаем логирование консольных вызовов
  _experiments: { enableLogs: true },
});
