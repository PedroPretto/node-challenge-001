
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {
          id: 1,
          name: 'Pedro',
          picture: '/img/pedro.jpg',
          email: 'pedro@gmail.com',
          password: 'hardpassword',
          isAdmin: true,
        },
        {
          id: 2,
          name: 'Joao',
          picture: '/img/joao.jpg',
          email: 'joao@gmail.com',
          password: 'hardpassword',
          isAdmin: true,
        },{
          id: 3,
          name: 'Dndrio',
          picture: '/img/andrio.jpg',
          email: 'andrio@gmail.com',
          password: 'hardpassword',
          isAdmin: true,
        },
      ]);
    });
};
