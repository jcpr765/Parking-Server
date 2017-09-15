const Location = require('./locations');
const Entrance = require('./entrances');
const Exit = require('./exits');
const Entry = require('./entries');

const models = {
    Location,
    Entrance,
    Exit,
    Entry
};

const createRelationships = () => {
    const {Location, Entrance, Exit, Entry} = sequelizeModels();

    Location.hasMany(Entrance);
    Entrance.belongsTo(Location);

    Location.hasMany(Exit);
    Exit.belongsTo(Location);

    Entrance.hasMany(Entry);
    Entry.belongsTo(Entrance);

    Exit.hasMany(Entry);
    Entry.belongsTo(Exit);
}

const migrateDatabase = () => {
    Object.keys(models).forEach((key) =>{
        models[key].sync();
    });
};

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