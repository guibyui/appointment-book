var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/appointments', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/appointments', (req, res, next) => {
  const { appointmentDate, name, email } = req.body;
  if (!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: 'Appointment Date, Name and email are required',
    });
  }

  const payload = { appointmentDate, name, email };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.status(400).json({
      message: 'No Appointments available on that date.'
    }));
});

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

router.put("/appointments/:id", (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection
    .updateOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});

module.exports = router;
