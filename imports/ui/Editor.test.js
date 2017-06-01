import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('Editor', function () {
        let browserHistory;
        let call;
        beforeEach(function () {
            call = expect.createSpy();
            browserHistory = {
                push: expect.createSpy()
            };
        });

        it('should prompt user to pick a note when no note is passed', function () {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} />);

            expect(wrapper.find('p').text()).toBe('Pick a note to get started.');
        });

        it('should not find a nonexisting note', function () {
            const wrapper = mount(<Editor selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory} />);

            expect(wrapper.find('p').text()).toBe('Note not found.');
        });

        it('should remove note', function () {
            const wrapper = mount(<Editor selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory} note={notes[0]} />);

            wrapper.find('button').simulate('click');

            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
        });

        it('should update the note body on textarea change', function () {
            const wrapper = mount(<Editor selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory} note={notes[0]} />);
            const newBody = 'Test body text';

            wrapper.find('textarea').simulate('change', { target: { value: newBody } });

            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
        });

        it('should update the note title on input change', function () {
            const wrapper = mount(<Editor selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory} note={notes[0]} />);
            const newTitle = 'Test title';

            wrapper.find('input').simulate('change', { target: { value: newTitle } });

            expect(wrapper.state('title')).toBe(newTitle);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
        });

        it('should set state for new note', function () {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} />);

            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            });

            expect(wrapper.state('body')).toBe(notes[0].body);
            expect(wrapper.state('title')).toBe(notes[0].title);
        });

        it('should not set state if note prop not provided', function () {
            const wrapper = mount(<Editor call={call} browserHistory={browserHistory} />);

            wrapper.setProps({
                selectedNoteId: notes[0]._id
            });

            expect(wrapper.state('body')).toBe('');
            expect(wrapper.state('title')).toBe('');
        });
    });
}