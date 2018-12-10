module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    userId: DataTypes.STRING
  })

  return Group
}
