import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import settings from '$lib/settings.js';

export const calcTypes = (() => {
    // これでいいの？
    if (!browser) return writable({});

    const calcTypes = writable(settings.get('calcTypes'));
    const rm = (index, propId) => {
        calcTypes.update(c => {
            if (propId) {
                delete c[index]['rates'][propId];
                return c;
            } else {
                if (c.length === 1) return c;
                c.splice(index, 1);
                return c;
            }
        });
    };
    const updateProp = (index, propId, rate) => {
        calcTypes.update(c => {
            c[index]['rates'][propId] = rate;
            return c;
        });
    };
    const updateLabel = (index, label) => {
        calcTypes.update(c => {
            c[index]['label'] = label;
            return c;
        });
    };
    const append = (label) => {
        calcTypes.update(c => {
            c.push({
                label,
                rates: {}
            });
            return c;
        });
    };
    calcTypes.subscribe(c => settings.set('calcTypes', c));
    // calcTypes.subscribe(console.log)

    return {
        ...calcTypes,
        rm,
        append,
        updateProp,
        updateLabel
    };
})();