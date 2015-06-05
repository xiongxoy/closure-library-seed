/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('app');

// sequence matters
goog.require('ssd.vendor');
goog.require('ssd.debug');

goog.require('app.Core');

goog.require('app.exports');

// notepad tutorial
goog.require('tutorial.notepad.init');
goog.require('tutorial.notepad.Note');

// checklist example
goog.require('example.Checklist');
goog.require('example.ui.Checklist');



