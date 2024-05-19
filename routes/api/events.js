const express = require('express');
const EventModel = require('../../model/Events');
const { SalleModel } = require('../../model/salle');
const { GroupModel } = require('../../model/group');
const router = express.Router();

router.post('/', async (req, res) => {
    const { groupName, day, room, startTime, formateur,endTime } = req.body;
    
    try {
      // Check for room availability
      const existingEvent = await EventModel.findOne({day :day})
      const formateurOcupp = await EventModel.findOne({formateur :formateur}) 
      const salle = await SalleModel.findOne({nom : room})  
      const group = await GroupModel.findOne({nom : groupName})
      if(group.apprenants.length > salle.capacite){return res.status(409).json({message:'capcité du salle insuffisante'})}
      if(existingEvent && existingEvent.startTime === startTime && existingEvent.room === room ) return res.status(409).json({message : "time or room alerady reserved"})
      if(formateurOcupp &&  formateurOcupp.startTime === startTime && formateurOcupp.day === day  )return res.status(409).json({message : "formateur alerady reserved"})
      const newEvent = new EventModel({ groupName, day, room, startTime, endTime,formateur }); 
      await newEvent.save();
      res.status(201).send('Event added successfully.');    
    } catch (error) {
      res.status(500).json({message :  error.message}); 
    }
 
  });  
  
  router.get('/:groupName', async (req, res) => { 
    try {
      const events = await EventModel.find({ groupName: req.params.groupName });
      res.json(events);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      const event = await EventModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message: "event deleted"})
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

module.exports =router