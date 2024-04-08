import { StoryObj, Meta } from "@storybook/react";
import RecentlySavedCard from ".";
const meta: Meta<typeof RecentlySavedCard> = {
  title: "RecentlySavedCard",
  component: RecentlySavedCard,
};
import "./RecentlySavedCard.css";
import "../../index.css";

export default meta;

type Story = StoryObj<typeof RecentlySavedCard>;

export const Default: Story = {
  args: {
    banner:
      "https://images.unsplash.com/photo-1712313127701-dd6fde97f5d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:
      "Our Favourite Prompts from the Tournament Our Favourite Prompts from the Tournament",
    url: "Description",
    tags: ["#funding", "#ycombinator", "#funding"],
    id: "1",
    cardStyle: {
      width: "280px",
      height: "228px",
    },
    cardClass: "recently-saved-card",
    titleClass: "recently-saved-card-title",
    tagsClass: "recently-saved-card-tags",
  },
};
