const fs = require('fs');
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));

const getAllUsesrs = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

const createUser = (req, res) => {
  const userId = req.params.id;
  const newUser = Object.assign({ id: userId }, req.body);

  users.push(newUser);
  fs.writeFile(
    `${__dirname}/users.json`,
    JSON.stringify(users, (err) => {
      res.status(201).json({
        status: 'success',
        data: newUser,
      });
    })
  );
};

const getUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: users.find((user) => user.id === userId),
  });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id === userId);
  users[userIndex] = req.body;
  fs.writeFile(
    `${__dirname}/users.json`,
    JSON.stringify(users, (err) => {
      res.status(200).json({
        status: 'success',
        data: users[userIndex],
      });
    })
  );
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id === userId);
  users.splice(userIndex, 1);
  fs.writeFile(
    `${__dirname}/users.json`,
    JSON.stringify(users, (err) => {
      res.status(200).json({
        status: 'success',
        data: null,
      });
    })
  );
};



module.exports = {
  getAllUsesrs,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
