import { normalizeEvent } from '@core/data/response/normalizeEvent';

export function normalizeEventDetails( data ) {
    return {
        ...normalizeEvent( data )
    };
}