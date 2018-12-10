module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    groupId: DataTypes.STRING,
    userId: DataTypes.STRING
  })

  return Contact
}
