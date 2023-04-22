// import express
const express = require('express')

/*      import all our functions from the dynamodb.js
        that perform crud operations
*/
const {getMembers, addMember, deleteMember, getMemberById} = require('../../dynamodb')

// the router function for creating routes
const router = express.Router();

// for us to be able to post json data to our api
router.use(express.json())

// api endpoint for retrieving all table entries
router.get('/', async (req, res) => {
        try {
                const members = await getMembers()
                res.json(members)
        } catch (error) {
                console.error(error)
                res.status(500).json({err: `Something went wrong`})
        }
})

// api endpoint for adding a new entry in the table
router.post('/add', async (req, res) => {
        const member = req.body
        try {
                const newMember = await addMember(member)
                res.json("added")
        } catch (error) {
                console.error(error)
                res.status(500).json({err: `Something went wrong`})
        }
})

// api endpoint for updating an existing entry in the table
router.put('/update/:id', async (req, res) => {
        const member = req.body
        const  id  = parseInt(req.params.id)
        member.id = id
        try {
                const updatedMember = await addMember(member)
                res.json(updatedMember)
        } catch (error) {
                console.error(error)
                res.status(500).json({err: `Something went wrong`})
        }
})

// api endpoint for deleting an entry in the table
router.delete('/delete/:id', async (req, res) => {
        const id  = parseInt(req.params.id)
        //console.log(req.params.id)
        try {
                const deletedMember = await deleteMember(id)
                res.json(deletedMember)
        } catch (error) {
                console.error(error)
                res.status(500).json({err: `Something went wrong`})
        }
})

// api endpoint for retrieving a table entry by id
router.get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        console.log(req.params.id)
        try {
                const members = await getMemberById(id)
                res.json(members)
        } catch (error) {
                console.error(error)
                res.status(500).json({err: `Something went wrong`})
        }
})

module.exports = router