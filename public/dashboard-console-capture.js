(function() {
  // Only run in iframe (dashboard preview)
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Helper to serialize objects safely
  function serializeArg(arg) {
    if (typeof arg === 'object' && arg !== null) {
      try {
        return JSON.stringify(arg, (key, value) => {
          if (typeof value === 'function') return '[Function]';
          if (value instanceof Error) return value.toString();
          return value;
        }, 2);
      } catch (e) {
        return '[Object]';
      }
    }
    return String(arg);
  }
  
  // Capture console logs
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = Array.from(args).map(serializeArg).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silent fail if postMessage doesn't work
    }
  }
  
  // Override console methods
  ['log', 'warn', 'error', 'info', 'debug'].forEach(method => {
    console[method] = function(...args) {
      originalConsole[method].apply(console, args);
      captureLog(method, args);
    };
  });
  
  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    captureLog('error', [`Unhandled error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureLog('error', [`Unhandled promise rejection: ${event.reason}`]);
  });
  
  // Send ready message to dashboard
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Send route change notification
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Monitor route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    sendRouteChange();
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send ready message when loaded
  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', () => {
      sendReady();
      sendRouteChange();
    });
  }
})();