import {Directive, ElementRef, inject, input, OnDestroy, OnInit} from '@angular/core';
import {animate, EasingParam, JSAnimation, onScroll, ScrollObserver} from 'animejs';

/**
 * Directive that animates an element into view using animejs.
 */
@Directive({
    selector: '[appAnimateOnScroll]',
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
    private elementRef = inject(ElementRef);

    offset = input(50);
    scale = input(1);
    opacity = input(0.1);
    duration = input(800);
    delay = input(0);
    ease = input<EasingParam>('inOutQuad');

    private animation?: JSAnimation;
    private scrollObserver?: ScrollObserver;

    ngOnInit(): void {
        this.animation = animate(this.elementRef.nativeElement, {
            y: {from: this.offset(), to: 0},
            scale: {from: this.scale(), to: 1},
            opacity: {from: this.opacity(), to: 1},
            duration: this.duration(),
            delay: this.delay(),
            ease: this.ease(),
            autoplay: (this.scrollObserver = onScroll({
                target: this.elementRef.nativeElement,
                axis: 'y',
                enter: {
                    target: `top-=${this.offset()}`,
                    container: `90%`,
                },
                leave: {
                    target: `bottom-=${this.offset()}`,
                    container: `0%`,
                },
            })),
        });
    }

    ngOnDestroy() {
        this.animation?.revert();
        this.scrollObserver?.revert();
    }
}
