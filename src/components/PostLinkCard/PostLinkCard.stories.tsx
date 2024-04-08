import { StoryObj, Meta } from "@storybook/react";
import RecentlySavedCard from ".";
const meta: Meta<typeof RecentlySavedCard> = {
  title: "PostLinkCard",
  component: PostLinkCard,
};
import "../../index.css";
import "./PostLinkCard.css";
import PostLinkCard from ".";

export default meta;

type Story = StoryObj<typeof PostLinkCard>;

export const Default: Story = {
  args: {
    title:
      "Our Favourite Prompts from the Tournament Our Favourite Prompts from the Tournament Our Favourite Prompts from the Tournament Our Favourite Prompts from the Tournament Our Favourite Prompts from the ",
    url: "Description",
    tags: ["#funding", "#ycombinator", "#funding"],
    id: "1",
    cardStyle: {
      width: "1030px",
      height: "73px",
    },
    cardClass: "post-link-card",
    titleClass: "post-link-card-title",
    tagsClass: "post-link-card-tags",
  },
};
