// Admin rights
function isAdmin(req, res, next) {
  if (req.user.admin) next();
  else res.sendStatus(403);
}

// Logged in users and admin rights
function isUserOrAdmin(req, res, next) {
  if (req.user) next();
  else res.sendStatus(403);
}

module.exports = {
  isAdmin,
  isUserOrAdmin
};
