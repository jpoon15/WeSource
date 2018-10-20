exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries, in all tables, last tables first
    return knex('comments').del()
    .catch(() => console.log("failure to wipe comments"))
    .then(() => {
        return knex('ratings').del();
    })
    .catch(() => console.log("failure to wipe ratings"))
    .then(() => {
        return knex('likes').del();
    })
    .catch(() => console.log("failure to wipe likes"))
    .then(() => {
        return knex('resources').del();
    })
    .catch(() => console.log("failure to wipe resources"))
    .then(() => {
        return knex('categories').del();
    })
    .catch(() => console.log("failure to wipe categories"))
    .then(() => {
        return knex('users').del();
    })
    .catch(() => console.log("failure to wipe users"))
    .then(() => {
        console.log("allegedly finished deleting data");
    })
    ;
};