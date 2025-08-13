/**
 * Extension of the global Window interface to include the optional Umami analytics object.
 * Ensures type safety when accessing `window.umami` in the application.
 */
export interface UmamiWindow extends Window {
    umami?: Umami;
}

/**
 * Umami Tracker API Interface
 *
 * Describes the methods provided by the Umami analytics script injected into the page.
 * All methods return a Promise and are safe to call once the Umami script is fully loaded.
 *
 * Reference: https://umami.is/docs/tracker-functions
 */
export interface Umami {
    track(): Promise<unknown>;
    track(payload: object): Promise<unknown>;
    track(eventName: string): Promise<unknown>;
    track(eventName: string, data: object): Promise<unknown>;
    identify(uniqueId: string): Promise<unknown>;
    identify(uniqueId: string, data: object): Promise<unknown>;
    identify(data: object): Promise<unknown>;
}
