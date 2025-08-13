// import type { Meta, StoryObj } from "@storybook/react"

// import { InfoCard } from "../app/components/InfoGrid/InfoCard"
// import { infoIcons } from "../app/components/InfoGrid/config"

// type PagePropsAndCustomArgs = React.ComponentProps<typeof InfoCard> & {
//   title: string
//   backgroundColor: string
//   buttonTitle: string
//   iconName: keyof typeof infoIcons
// }

// const meta: Meta<PagePropsAndCustomArgs> = {
//   component: InfoCard,
//   render: ({
//     info = {
//       active: true,
//       backgroundColor: "#fff",
//       count: 100,
//       icon: "ApprovalsIcon",
//       id: 1,
//       index: 0,
//       key: "approvalRequests",
//       title: "Title",
//       link: "/",
//       buttonName: "View All",
//       iconTextColor: "#fff",
//       userId: 1,
//     },
//     isSideBarOpen = false,
//     // iconName = 'ApprovalsIcon',
//     rootBgColor = "#fff",
//     title = "طلب",
//     backgroundColor = "#fff",
//     buttonTitle = "تفاصيل",
//     iconName,
//     ...args
//   }) => {
//     info.title = title
//     info.buttonName = buttonTitle
//     info.icon = iconName
//     return (
//       <div className="border border-black rounded-xl">
//         <InfoCard {...args} info={info} rootBgColor={backgroundColor} />
//       </div>
//     )
//   },
// }
// export default meta

// type Story = StoryObj<PagePropsAndCustomArgs>

// export const CustomInfoCard: Story = {
//   argTypes: {
//     iconName: {
//       options: Object.keys(infoIcons),
//       control: { type: "select" },
//     },
//   },
//   args: {
//     title: "طلب",
//     backgroundColor: "#fff",
//     buttonTitle: "تفاصيل",
//     iconName: "ApprovalsIcon",
//   },
// }
