const posts = [
  {
    id: 1,
    title: "First Blog Post",
    content: "This is the content of the first blog post.",
    username: "@clayton1",
    date: "2024-07-12",
    comments: [
      { id: 1, text: "Great post!", username: "@gabby1", date: "2024-07-12" },
      {
        id: 2,
        text: "Looking forward to more.",
        username: "@rafa1",
        date: "2024-07-12",
      },
    ],
  },
  {
    id: 2,
    title: "Second Blog Post",
    content: "This is the content of the second blog post.",
    username: "@gabby1",
    date: "2024-07-12",
    comments: [
      { id: 1, text: "awesome!", username: "@clayton1", date: "2024-07-12" },
    ],
  },
];

module.exports = posts;
