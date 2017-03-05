import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Desks = new Mongo.Collection('desks');

Meteor.methods({
  'desks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Desks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      x: 0,
      y: 0
    });
  },
  'desks.remove'(deskId) {
    check(deskId, String);
 
    Desks.remove(deskId);
  },
  'desks.move'(deskId, x, y) {
    check(deskId, String);
    check(x, Number);
    check(y, Number);
 
    Desks.update(deskId, { $set: { x:x, y:y } });
  },
});