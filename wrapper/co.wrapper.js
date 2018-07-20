'use strict';

var co = require('co');

module.exports = {
    req: null,
    res: null,
    defineArgs: function(req,res){
        this.req = req;
        this.res = res;
        return this;
    },
    execute: function (fn) {
        var self = this;
        co.wrap(fn)(this.req, this.res).catch(ex => {
            console.log('----- ERROR STARTS -----');
            console.log(new Date());
            console.log(self.req.params);
            console.log(self.req.body);
            console.log(ex.stack);
            console.log('----- ERROR ENDS -----');
            this.res.status(500).send(ex);
        });
    }
};
