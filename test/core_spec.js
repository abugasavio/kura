import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

describe('appication logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Eye in the Sky', 'Trumbo');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Eye in the Sky', 'Trumbo')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Trumbo', 'Eye in the Sky'];
            const nextState = setEntries(Map({
                'entries': List.of('Trumbo', 'Eye in the Sky')
            }));

        });
    });
});