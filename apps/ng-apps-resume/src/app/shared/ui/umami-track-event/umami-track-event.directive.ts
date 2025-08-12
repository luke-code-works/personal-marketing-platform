import {Directive, ElementRef, inject, Injector, input, OnInit, runInInjectionContext} from '@angular/core';
import {rxEffect} from 'ngxtension/rx-effect';
import {filter, fromEvent, tap, throttleTime} from 'rxjs';
import {UmamiProxyService} from '../../util/umami/umami-proxy.service';

@Directive({
    selector: '[appUmamiTrackEvent]',
})
export class UmamiTrackEventDirective implements OnInit {
    private readonly injector = inject(Injector);
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly umamiProxyService = inject(UmamiProxyService);

    readonly trackEvents = input.required<UmamiTrackEvent[]>();

    ngOnInit() {
        runInInjectionContext(this.injector, () => {
            this.trackEvents().forEach(({event, name, data, throttleMs}) => {
                rxEffect(
                    fromEvent(this.elementRef.nativeElement, event).pipe(
                        throttleTime(throttleMs ?? 1000),
                        filter(() => this.umamiProxyService.ready()),
                        tap(() => this.umamiProxyService.track(name, data)),
                    ),
                );
            });
        });
    }
}

interface UmamiTrackEvent {
    event: UmamiTrackEventType;
    name: string;
    data?: object;
    throttleMs?: number;
}

export type UmamiTrackEventType =
    | 'click'
    | 'submit'
    | 'mouseenter'
    | 'focus'
    | 'contextmenu'
    | 'dblclick'
    | 'keydown'
    | 'touchstart';
