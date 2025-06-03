import type { Meta, StoryObj } from "@storybook/react"
import { InfoCard } from "../app/components/InfoGrid/InfoCard"
import { infoIcons } from "../app/components/InfoGrid/config"
const meta: Meta<typeof InfoCard> = {
  title: "InfoCard",
  component: InfoCard,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  //   parameters: {
  //     controls: {
  //       include: ['title'],
  //     },
  //   },
  argTypes: {
    isSideBarOpen: {
      table: {
        disable: true,
      },
    },
    info: {
      table: { disable: true },
      control: {},
    },
    iconName: {
      options: Object.keys(infoIcons),
      control: { type: "select" },
    },
    rootBgColor: {
      control: { type: "color" },
    },
  },
  args: {
    info: {
      icon: "ApprovalsIcon",
      active: true,
      title: "Title",
      backgroundColor: "#fff",
      count: 0,
      id: 1,
      link: "/",
      index: 0,
      key: "approvalRequests",
      buttonName: "View All",
      iconTextColor: "#fff",
      userId: 1,
    },
    isSideBarOpen: true,
    iconName: "PaperIcon",
    rootBgColor: "#fff",
  },
}
