module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    userID: DataTypes.STRING
  })

  return Group
}
