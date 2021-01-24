import { actions } from 'xstate';

var log = actions.log;
var localLog = process.env.NODE_ENV === 'development' ? log() : function () {};

export { localLog };
