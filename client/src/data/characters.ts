export interface Character {
  id: number;
  name: string;
  japaneseTitle: string;
  title: string;
  level: string;

  imageUrl: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: "KIRA-572",
    japaneseTitle: "アンドロイド・ア",
    title: "Android Assassin",
    level: "Combat Level: 97",
    // description: "Artificial intelligence designed for covert ops with advanced nano-enhancements and thermal optics.",
    imageUrl: "/assets/Blood 1.webp"
  },
  {
    id: 2,
    name: "ECHO",
    japaneseTitle: "ニューロ・ハッカー",
    title: "Neuro Hacker",
    level: "Tech Level: 92",
    // description: "Neural interface specialist who can hack any security system through direct brain connection.",
    imageUrl: "/assets/Blood 2.webp"
  },
  {
    id: 3,
    name: "RONIN",
    japaneseTitle: "ストリート・サムライ",
    title: "Street Samurai",
    level: "Strength Level: 95",
    // description: "Enhanced reflexes and blade-integrated limbs make this ex-military operative lethal in close combat.",
    imageUrl: "/assets/Blood 3.webp"
  },
  {
    id: 4,
    name: "NEXUS",
    japaneseTitle: "サイバー・メディク",
    title: "Cyber Medic",
    level: "Medical Level: 98",
    // description: "Specialized in combat nanomedicine and field repairs of cybernetic implants during missions.",
    imageUrl: "/assets/Blood 4.webp"
  },
  {
    id: 5,
    name: "PHANTOM",
    japaneseTitle: "ゴースト・インフィルトレーター",
    title: "Ghost Infiltrator",
    level: "Stealth Level: 99",
    // description: "Equipped with cutting-edge optical camouflage and sound dampening tech for perfect infiltration missions.",
    imageUrl: "/assets/Blood 5.webp"
  },
  {
    id: 6,
    name: "VOLT",
    japaneseTitle: "サンダー・コンダクター",
    title: "Thunder Conductor",
    level: "Power Level: 94",
    // description: "Bio-engineered nervous system capable of generating and channeling massive electrical surges as weapons.",
    imageUrl: "/assets/Blood 6.webp"
  },
  {
    id: 7,
    name: "NOVA",
    japaneseTitle: "サイコ・ブラスター",
    title: "Psycho Blaster",
    level: "Psionic Level: 96",
    // description: "Rare psychic mutation enhanced with cerebral implants allowing telekinetic assaults and mind manipulation.",
    imageUrl: "/assets/Blood 3.webp"
  }
];
