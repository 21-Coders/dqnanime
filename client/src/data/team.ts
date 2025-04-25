export interface TeamMember {
  id: string;
  name: string;
  number: string;
  role: string;
  imageUrl: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Puppeteer",
    number: "4861",
    role: "Lead Developer",
    imageUrl: "/assets/image 1.png"
  },
  {
    id: "team-2",
    name: "Tech Maniac",
    number: "0000",
    role: "Creative Director",
    imageUrl: "/assets/image 2.png"
  },
  {
    id: "team-3",
    name: "Marketing Lord",
    number: "3361",
    role: "Brand Manager",
    imageUrl: "/assets/image 3.png"
  },
//   {
//     id: "team-4",
//     name: "Pixel Wizard",
//     number: "7842",
//     role: "Lead Designer",
//     imageUrl: "/assets/team/team4.jpg"
//   },
//   {
//     id: "team-5",
//     name: "Code Ninja",
//     number: "1337",
//     role: "Backend Engineer",
//     imageUrl: "/assets/team/team5.jpg"
//   },
//   {
//     id: "team-6",
//     name: "UX Maestro",
//     number: "2468",
//     role: "UX Researcher",
//     imageUrl: "/assets/team/team6.jpg"
//   }
];

export default teamMembers; 