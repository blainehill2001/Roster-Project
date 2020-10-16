const express = require('express');
const router = express.Router();
const Roster = require('../child.model');


// don't need any route for a get request and  / for home
// using a post request and /check-in to check in
router.post('/api/check-in', function (req, res) {
    let roster = new Roster(req.body);
    roster.save()
        .then(roster => {
            res.send(roster);
        })
        .catch(function (err) {
            res.status(422).send('Roster addition failed');
        });
});
//using a get request and /check-out for check out
router.get('/api/check-out', function (req, res) {
    Roster.find(function (err, rosters) {
        res.json(rosters);
    });
});

//using a delete request and/check-out/:id for check out
router.delete('/api/check-out/:id', function (req, res) {
    Roster.findById(req.params.id, function (err, article) {
        if (!article) {
            res.status(404).send('Roster not found');
        } else {
            Roster.findByIdAndRemove(req.params.id)
                .then(function () {
                    res.status(200).json("Roster deleted")
                })
                .catch(function (err) {
                    res.status(400).send("Roster delete failed.");
                })
        }
    });
})
//using a get request and  /list for viewing the roster
router.get('/api/list', function (req, res) {
    Roster.find(function (err, rosters) {
        res.json(rosters);
    });
});

//using a get request and /list/:id for getting one child
router.get('/api/list/:id', function (req, res) {
    Roster.findById(req.params.id, function (err, roster) {
        if (!roster) {
            res.status(404).send('No result found');
        } else {
            res.json(roster);
        }
    });
});

//using a patch request and /list/:id for updating a child
router.patch('/api/list/:id', function (req, res) {
    Roster.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            res.json('Roster updated');
        })
        .catch(function (err) {
            res.status(422).send("Roster update failed.");
        });
});


//using a delete request and /list/:id
router.delete('/api/list/:id', function (req, res) {
    Roster.findById(req.params.id, function (err, rosters) {
        if (!rosters) {
            res.status(404).send('Child was not found');
        } else {
            Roster.findByIdAndRemove(req.params.id)
                .then(function () {
                    res.status(200).json("Child removed")
                })
                .catch(function (err) {
                    res.status(400).send("Child was not removed.");
                })
        }
    });
})


module.exports = router;
