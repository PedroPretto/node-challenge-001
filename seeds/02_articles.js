
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {
          id: 1,
          author_id: 1,
          category: 'category1',
          title: 'title1',
          summary: 'summary1',
          first_paragraph: 'firstParagraph1',
          body: 'articleBody1',
        },
        {
          id: 2,
          author_id: 1,
          category: 'category2',
          title: 'title2',
          summary: 'summary2',
          first_paragraph: 'firstParagraph2',
          body: 'articleBody2',
        },{
          id: 3,
          author_id: 2,
          category: 'category3',
          title: 'title3',
          summary: 'summary3',
          first_paragraph: 'firstParagraph3',
          body: 'articleBody3',
        },
      ])
    })
}
