import {Directive, input, signal} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {concatMap, delay, lastValueFrom, of, switchMap, tap} from 'rxjs';
import {scramble, ScrambleOptions, sequence as scrambleTextSequence} from 'scrambled-text';

@Directive({
    selector: '[appScrambledText]',
    exportAs: 'appScrambledText',
})
export class ScrambledTextDirective {
    readonly text = input.required<string>();

    readonly scrambledText = signal<string | undefined>(undefined);

    constructor() {
        toObservable(this.text)
            .pipe(
                delay(250),
                switchMap(async () => await this.scramble('initial')),
                takeUntilDestroyed(),
            )
            .subscribe();
    }

    async scramble(type: 'initial' | 'redo' = 'initial') {
        let sequence;
        if (type === 'redo') {
            sequence = generateRedoScrambleSequence(this.text());
        } else {
            sequence = generateInitialScrambleSequence(this.text());
        }

        await lastValueFrom(scrambleSequence$(sequence, (text) => this.scrambledText.set(text)));
    }
}

type ScrambledSequence = {text: string; delay: number}[];

function scrambleSequence$(sequence: ScrambledSequence, setTextFn: (text: string) => void) {
    return of(sequence).pipe(
        concatMap((x) => x),
        concatMap((x) => of(x.text).pipe(delay(x.delay))),
        tap(setTextFn),
    );
}

function generateInitialScrambleSequence(text: string): ScrambledSequence {
    const options: Partial<ScrambleOptions> = {
        characterSet: '@#$%£&*§+_',
        sequential: true,
    };
    const sequence: ScrambledSequence = [];

    // Add a scrambled character each iteration
    for (let index = 0; index < text.length; index++) {
        const slicedText = text.slice(0, index + 1);
        sequence.push({
            text: scramble(slicedText, options),
            delay: 50,
        });
    }

    // Decode characters in iterations
    const decodeSequence = [...new Set(scrambleTextSequence(text, text.length, options))].map((x) => ({
        text: x,
        delay: 50,
    }));

    // Delay last iterations
    decodeSequence[decodeSequence.length - 5].delay = 80;
    decodeSequence[decodeSequence.length - 4].delay = 120;
    decodeSequence[decodeSequence.length - 3].delay = 150;
    decodeSequence[decodeSequence.length - 2].delay = 150;
    decodeSequence[decodeSequence.length - 1].delay = 500;
    sequence.push(...decodeSequence);

    return sequence;
}

function generateRedoScrambleSequence(text: string): ScrambledSequence {
    const options: Partial<ScrambleOptions> = {
        characterSet: '@#$%£&*§+_',
        sequential: true,
    };
    const sequence: ScrambledSequence = [];

    // Encode characters in iterations and then decode
    const encodeSequence = [...new Set(scrambleTextSequence(text, text.length, options))]
        .map((x) => ({
            text: x,
            delay: 50,
        }))
        .reverse();
    const decodeSequence = [...new Set(scrambleTextSequence(text, text.length, options))].map((x) => ({
        text: x,
        delay: 50,
    }));

    // Delay last iterations
    decodeSequence[decodeSequence.length - 5].delay = 80;
    decodeSequence[decodeSequence.length - 4].delay = 120;
    decodeSequence[decodeSequence.length - 3].delay = 150;
    decodeSequence[decodeSequence.length - 2].delay = 150;
    decodeSequence[decodeSequence.length - 1].delay = 500;
    sequence.push(...encodeSequence, ...decodeSequence);

    return sequence;
}
