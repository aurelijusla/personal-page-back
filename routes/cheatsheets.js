const express = require('express');
const router = express.Router();
const Cheatsheet = require('../models/cheatsheet');

// Get all
router.get('/', async (req, res) => {
    try {
        const cheatsheets = await Cheatsheet.find();
        res.json(cheatsheets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// Get one
router.get('/:id', getCheatsheet, async (req, res) => {
    res.json(res.cheatsheet);  
});

// Post one
router.post('/', async (req, res) => {
    const cheatsheet = new Cheatsheet({
        name: req.body.name,
        description: req.body.description,
        installCommand: req.body.installCommand,
        downloadLink: req.body.downloadLink,
        docs: req.body.docs
    });

    try {
        const newCheatsheet = await cheatsheet.save();
        res.status(201).json(newCheatsheet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
});

// Update one
router.patch('/:id', getCheatsheet, async (req, res) => {
    if (req.body.name != null) {
        res.cheatsheet.name = req.body.name
    }
    if (req.body.description != null) {
        res.cheatsheet.description = req.body.description
    }
    if (req.body.installCommand != null) {
        res.cheatsheet.installCommand = req.body.installCommand
    }
    if (req.body.downloadLink != null) {
        res.cheatsheet.downloadLink = req.body.downloadLink
    }
    if (req.body.docs != null) {
        res.cheatsheet.docs = req.body.docs
    }
    try {
        const updatedCheatsheet = await res.cheatsheet.save();
        res.json(updatedCheatsheet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// Delete one
router.delete('/:id', getCheatsheet, async (req, res) => {
    try {
        await res.cheatsheet.remove();
        res.json({ message: 'Cheatsheet removed.'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

async function getCheatsheet(req, res, next) {
    let cheatsheet;
    try {
        cheatsheet = await Cheatsheet.findById(req.params.id);
        if (cheatsheet == null) {
            return res.status(404).json({ message: 'Cannot find a cheatsheet.'});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };

    res.cheatsheet = cheatsheet;
    next();
}

module.exports = router;