const Location = require('./locations');
const Gate = require('./gates');
const Entry = require('./entries');

const models = {
    Location,
    Gate,
    Entry
};

const createRelationships = () => {
    const {Location, Gate, Entry} = sequelizeModels();

    Location.hasMany(Gate);
    Gate.belongsTo(Location);

    Gate.hasMany(Entry);
    Entry.belongsTo(Gate);
}

// const migrateDatabase = () => {
//     Object.keys(models).forEach((key) =>{
//         models[key].sync();
//     });
// };

const migrateDatabase = () =>{
    models.Location.sync();
    models.Gate.sync();
    setTimeout(()=>{models.Entry.sync()}, 2000);
}

const sequelizeModels  = () => {
    const sequelizeModels = {};
    Object.keys(models).forEach((key)=>{
        sequelizeModels[key] = models[key][key];
    });

    return sequelizeModels;
};

createRelationships();

module.exports = {
    models : sequelizeModels(),
    migrateDatabase
}