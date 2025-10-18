export const mockPosts = [
  {
    id: "0",
    user: {
      id: "weeknd",
      name: "The Weeknd",
      profileImageUrl:
        "https://static.wikia.nocookie.net/the-weeknd/images/c/c1/The_Weeknd_-_After_Hours.png/revision/latest?cb=20220106031501",
      isVerified: true,
    },
    content: "Hello, World!",
    timeAgo: "30 minutes ago",
    likes: 11,
    comments: 2,
    reposts: 1,
    imageUrls: [
      "https://static.wikia.nocookie.net/the-weeknd/images/c/c1/The_Weeknd_-_After_Hours.png/revision/latest?cb=20220106031501",
    ],
  },
  {
    id: "1",
    user: {
      id: "jay",
      name: "Jay",
      profileImageUrl: "https://avatars.githubusercontent.com/u/130229450?v=4",
      isVerified: true,
    },
    content: "Come to visit my GitHub!",
    timeAgo: "1 hour ago",
    likes: 7,
    comments: 1,
    reposts: 6,
    link: "https://github.com/lonely-wolf-howl",
    linkThumbnail: "https://avatars.githubusercontent.com/u/130229450?v=4",
  },
  {
    id: "2",
    user: {
      id: "sabrina",
      name: "Sabrina",
      profileImageUrl:
        "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
      isVerified: true,
    },
    content: "Hello, World!",
    timeAgo: "2 hour ago",
    likes: 3,
    comments: 1,
    reposts: 3,
    imageUrls: [
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/c/c5/Man%27s_Best_Friend.png/revision/latest?cb=20250905110110",
    ],
  },
];

export const mockReplies: Record<string, any[]> = {
  "0": [
    {
      id: "0",
      user: {
        id: "sabrina",
        name: "Sabrina",
        profileImageUrl:
          "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
        isVerified: true,
      },
      content: "Hello, The Weeknd!",
      timeAgo: "10 minutes ago",
      likes: 1,
      comments: 0,
      reposts: 0,
    },
  ],
};

export const mockUsers = [
  {
    id: "weeknd",
    name: "The Weeknd",
    description: "After Hours",
    profileImageUrl:
      "https://static.wikia.nocookie.net/the-weeknd/images/c/c1/The_Weeknd_-_After_Hours.png/revision/latest?cb=20220106031501",
  },
  {
    id: "jay",
    name: "Jay",
    description: "backend developer",
    profileImageUrl: "https://avatars.githubusercontent.com/u/130229450?v=4",
  },
  {
    id: "sabrina",
    name: "Sabrina",
    description: "Short n' Sweet",
    profileImageUrl:
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
  },
];

export const userPosts: Record<string, string[]> = {
  weeknd: ["0"],
  jay: ["1"],
  sabrina: ["2"],
};
