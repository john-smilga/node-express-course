const checkPermissions = (user, item) => {
  if (user.role === 'admin') return true;
  if (user.userId === item.user.toString()) return true;
  return false;
};

module.exports = checkPermissions;
