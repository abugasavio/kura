import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

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
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                'entries': List.of('Trumbo', 'Eye in the Sky')
            }));

        });

        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trumbo', 'Eye in the Sky', 'SunShine')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trumbo', 'Eye in the Sky')
                }),
                entries: List.of('SunShine')
            }));
        });
    });

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({ pair: List.of('Trumbo', 'SunShine')}),
                entries: List()
            });

            const nextState = vote(state, 'Trumbo');


            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trumbo', 'SunShine'),
                    tally: Map({
                        'Trumbo': 1
                    })
                }),

                entries: List()
            }));

        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trumbo', 'SunShine'),
                    tally: Map({
                        'Trumbo': 3,
                        'SunShine': 2
                    })
                }),
                entries: List()
            });

            const nextState = vote(state, 'Trumbo');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trumbo', 'SunShine'),
                    tally: Map({'Trumbo': 4, 'SunShine': 2 })
                }),
                entries: List()
            }));


        });
    });
});