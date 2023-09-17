// In your migration file (e.g., 20230917102359-servedby.js)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Transactions', 'servedby', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'tamani phiri', // Replace with your default value
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Transactions', 'servedby');
  },
};
