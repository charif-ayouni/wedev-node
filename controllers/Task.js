let Task = require('../models/Task');

const add = async(req,res) => {
    Task.create(req.body,(err,task) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(task);
    }).catch(error => {
        return res.status(500).json(error)
    });
};

const list = (req,res) => {
    Task.find({ sprint : req.body.sprintId }).sort({order : 1}).exec(function (err, tasks){
        if(err)  res.status(400).json(err);
        res.status(200).json(tasks)
    });
};

const findById = (req,res) => {
    Task.findById(req.params.id,(err,task) => {
        if(err) res.status(400).json(err);
        res.status(200).json(task)
    })
};

const setOrder = (req,res) => {
    let tasks = req.body
    tasks.map((task, index) => {
        Task.findOneAndUpdate({ _id: task._id }, {order : index},(err, task) => {
        });
    });

    res.status(204).json();
};

module.exports = {
    add,
    list,
    findById,
    setOrder
};
