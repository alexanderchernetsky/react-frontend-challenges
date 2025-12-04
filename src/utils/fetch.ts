// limitations:
// localStorage has a ~5-10MB limit across all domains. Storing full response bodies can quickly exhaust this quota. No error handling for QuotaExceededError
// should only be used for GET requests!
export async function fetchWithCache(url: string, options = {}, {
    retries = 3,
    delay = 3000,
    timeout = 5000,
    caching = true,
    cacheTTL = 60_000 // 1 minute
} = {}) {
    // caching
    if (caching && cacheTTL > 0) {
        // Try reading from localStorage
        const cached = localStorage.getItem(url);
        if (cached) {
            const entry = JSON.parse(cached);
            const isExpired = Date.now() > entry.expireAt;

            if (!isExpired) {
                // Reconstruct a Response object with cached body
                return new Response(entry.data, {
                    status: entry.status,
                    headers: entry.headers
                });
            } else {
               localStorage.removeItem(url);
            }
        }
    }

    // If cache miss or expired → make real request
    const response = await fetchWithRetryAndAbort(url, options, retries, delay, timeout);

    // Clone so we can read data without consuming caller's version
    const textData = await response.clone().text();

    // Save to localStorage
    const entry = {
        data: textData,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        expireAt: Date.now() + cacheTTL
    };

    localStorage.setItem(url, JSON.stringify(entry));

    // Return original network response
    return response;
}

// fetch with retry and abort
// to test this use https://httpbin.org/delay/10
export async function fetchWithRetryAndAbort(url: string, options = {}, retries = 3, delay = 3000, timeout = 5000): Promise<Response> {
    // abort
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchOptions = {
        ...options,
        signal,
    }
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response; // success
    } catch (error) {
        clearTimeout(timeoutId);
        if (retries > 0) {
            // log timeout
            if ((error as Error).name === 'AbortError') {
                console.warn('Fetch aborted due to timeout');
            }

            // re-try
            console.warn(`Retrying... attempts left: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetryAndAbort(url, options, retries - 1, delay);
        } else {
            // No retries left, throw error
            console.error('All retry attempts failed.');
            throw error;
        }
    }
}
