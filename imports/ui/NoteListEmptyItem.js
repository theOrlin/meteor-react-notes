import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default NoteListEmptyItem = (props) => {
    return (
        <div>
            <p>
                No notes to display.
            </p>
        </div>
    )
};