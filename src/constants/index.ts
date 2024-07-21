import { getTags } from '@/lib/supabase/api/tags.ts'

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/home.svg",
    route: "/explore",
    label: "Explore",
  },

  // {
  //   imgURL: "/assets/icons/people.svg",
  //   route: "/all-users",
  //   label: "People",
  // },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  // {
  //   imgURL: "/assets/icons/gallery-add.svg",
  //   route: "/create-post",
  //   label: "Create Post",
  // },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  // {
  //   imgURL: "/assets/icons/gallery-add.svg",
  //   route: "/create-post",
  //   label: "Create",
  // },
];

export const postTypes = [
  {
    title: "Photos",
    img_title: "/assets/explorer/gallery.svg",
  },
  {
    title: "Gifs",
    img_title: "/assets/explorer/video-square.svg",
  }
  // {
  //   title: "Video",
  //   img_title: "/assets/explorer/video-square.svg",
  // },
  // {
  //   title: "Poll",
  //   img_title: "/assets/explorer/setting-4.svg",
  // },
  // {
  //   title: "Schedule",
  //   img_title: "/assets/explorer/calendar.svg",
  // },
];

export const postcategories = [
  "For You",
  "Development",
  "Self-Growth",
  "Business",
  "Mindset",
  "Lifestyle",
  "Health",
  "Crypto"
]

// function to get all the tags using the api
export async function postTags() {
  const tags = await getTags() || [];

  // format array content to be used in the select component
  const tagsArray = tags.map((tag) => {
    return { value: tag.id, label: tag.tag_name };
  });

  return tagsArray;
}

// Sort filters
export const sort_filters = [
  {
    name: "Guac Leaders",
    value: "descending",
  },
  {
    name: "Guac Losers",
    value: "ascending",
  },
];
