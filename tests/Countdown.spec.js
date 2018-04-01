import { mount } from '@vue/test-utils'
import Countdown from '../src/components/Countdown.vue'
import moment from 'moment'
import sinon from 'sinon'

describe('Countdown', () => {
    let wrapper, clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
        wrapper = mount(Countdown, {
            propsData: {
                until: moment().add(10, 'seconds').toString()
            }
        });
    });

    afterEach(() => clock.restore());


    it('renders a countdown timer', () => {
        see('0 Days');
        see('0 Hours');
        see('0 Minutes');
        see('10 Seconds');
    });

    it('reduces the countdown every second', (done) => {
        clock.tick(1000);

        assertOnNextTick(() => {
            see('9 Seconds');
        }, done);
    });

    it('shows an expired message when the countdown has completed', (done) => {
        clock.tick(10000);

        assertOnNextTick(() => {
            see('Now Expired');
        }, done);
    });

    it('shows an custom expired message when the countdown has completed', (done) => {
        wrapper.setProps({ message: "Now Completed" });

        clock.tick(10000);

        assertOnNextTick(() => {
            see('Now Completed');
        }, done);
    });

    it('broadcasts an event when completed', (done) => {
        clock.tick(10000);

        assertOnNextTick(() => {
            expect(wrapper.emitted().finished).toBeTruthy();
        }, done);
    })

    it('removes the interval once complete', (done) => {
        clock.tick(10000);

        expect(wrapper.vm.now.getSeconds()).toBe(10)

        assertOnNextTick(() => {
            clock.tick(5000);

            expect(wrapper.vm.now.getSeconds()).toBe(10)
        }, done);
    });


    const see = (text, selector) => {
        const wp = selector ? wrapper.find(selector) : wrapper;

        expect(wp.html()).toContain(text);
    }

    const type = (text, selector) => {
        const wp = wrapper.find(selector);

        wp.element.value = text;
        wp.trigger('input');
    }

    const click = selector => {
        wrapper.find(selector).trigger('click');
    }

    const assertOnNextTick = (callback, done) => {
        wrapper.vm.$nextTick(() => {
            try {
                callback();
                
                done();
            } catch (error) {
                done(error);
            }
        })
    }
})