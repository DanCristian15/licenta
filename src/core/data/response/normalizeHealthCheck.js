/**
 * Normalize Event Health Check
 */
export function normalizeHealthCheck( data = { } ) {
    return {
        summary: data.summary,
        description: data.description,
        learnMoreUrl: data.learnMoreUrl
    };
}