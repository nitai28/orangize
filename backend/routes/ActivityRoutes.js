var ActivityService = require("../services/ActivityService.js");

module.exports = app => {
    app.post("/activity", (req, res) => {
      const activity = req.body;
      ActivityService.addActivity(activity).then(addedActivity => {
        res.json(addedActivity);
      });
    });   

    app.get("/activity", (req, res) => {
      ActivityService.query().then(activities => {
        console.log("ACTIVITIES: ", activities);
        res.json(activities);
      });
    }); 
}


 