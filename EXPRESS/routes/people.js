const express = require('express')
const router = express.Router()
const {
    getPerson,
    createPerson,
    createPersonPostman,
    upadtePerson,
    deletePerson
} = require('../controllers/people')


// router.get('/', getPerson)
// router.post('/',createPerson )
// router.post('/postman', createPersonPostman)
// router.put('/:id', upadtePerson)
// router.delete('/:id', deletePerson)

router.route('/').get(getPerson).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(upadtePerson).delete(deletePerson)

module.exports = router