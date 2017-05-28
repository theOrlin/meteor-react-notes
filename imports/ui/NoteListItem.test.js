import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListItem } from './NoteListItem';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('NodeListItem', function () {
        let Session;

        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        });

        it('should render title and time stamp', function () {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);

            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            expect(wrapper.find('p').text()).toBe('5/28/17');
        });

        it('should set default title if no title set', function () {
            const defaultTitle = 'Untitled note';
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);

            expect(wrapper.find('h5').text()).toBe(defaultTitle);
        });

        it('should call set on click', function () {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
            wrapper.find('div').simulate('click');

            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        })
    });
}