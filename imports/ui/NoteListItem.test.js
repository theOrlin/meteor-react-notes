import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
    describe('NodeListItem', function () {
        it('should render title and time stamp', function () {
            const title = 'Test title';
            const updatedAt = 1495955099212; //5/28/17
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('5/28/17');
        });

        it('should set default title if no title set', function() {
            const defaultTitle = 'Untitled note';
            const updatedAt = 1495955099212; //5/28/17
            const wrapper = mount(<NoteListItem note={{ title: '', updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe(defaultTitle);
        });
    });
}