const home = (req, res) => {
  res.status(200);
  res.send("Welcome to Grocer's Yard");
};

const health = (req, res) => {
  res.status(200);
  res.json({
    Status: "Up and Running",
  });
};

module.exports = {
  home,
  health,
};
