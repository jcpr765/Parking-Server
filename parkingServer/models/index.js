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
    // const locationPromise = new Promise(()=>{
    //     models.Location.sync();
    // });
    // const gatePromise = new Promise(()=>{
    //     models.Gate.sync();
    // });
    // const entryPromise = new Promise(()=>{
    //     models.Entry.sync();
    // });
    // const promises = [locationPromise, gatePromise, entryPromise];
    
    // Promise.all(promises.map(p => p.catch(e => e)))
    // .then(results => console.log(results)) // 1,Error: 2,3
    // .catch(e => console.log(e));
    models.Location.sync();
    models.Gate.sync();
    setTimeout(()=>{models.Entry.sync()}, 3000);
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