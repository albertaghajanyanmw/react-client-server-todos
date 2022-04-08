const { CONSTANTS } = require('constants/Constants');

module.exports = (sequelize, DataTypes) => {
	const fields = {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name'
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'description'
		},
		estimatedDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'estimated_date'
		},
		archived: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'archived'
		},
		status: {
			type: DataTypes.ENUM(CONSTANTS.TaskStatuses.list),
			defaultValue: CONSTANTS.TaskStatuses.defaultValue,
			field: 'status'
		},
	};

	const definition = {
		tableName: 'tasks',
		timestamps: true
	};

	const tasks = sequelize.define('tasks', fields, definition);
	tasks.associate = (db) => {
		tasks.belongsTo(db.users, {
			foreignKey: {
				name: 'userId',
				field: 'user_id',
				allowNull: false
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
	};
	return tasks;
};