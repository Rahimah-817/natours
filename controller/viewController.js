const getBase = (req, res) => {
  res.status(200).render("base", {
    title: "Exciting tours for adventurous people",
  });
};

const getOverview = (req, res) => {
  res.status(200).render("overview", {
    title: "All Tours",
  });
};

const getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Forest Hiker Tour", 
  });
};

module.exports = {
    getBase,
  getOverview,
  getTour,
};
