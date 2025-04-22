export interface Character {
  id: number;
  name: string;
  japaneseTitle: string;
  title: string;
  level: string;
  description: string;
  imageUrl: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: "KIRA-572",
    japaneseTitle: "アンドロイド・ア",
    title: "Android Assassin",
    level: "Combat Level: 97",
    description: "Artificial intelligence designed for covert ops with advanced nano-enhancements and thermal optics.",
    imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "ECHO",
    japaneseTitle: "ニューロ・ハッカー",
    title: "Neuro Hacker",
    level: "Tech Level: 92",
    description: "Neural interface specialist who can hack any security system through direct brain connection.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: 3,
    name: "RONIN",
    japaneseTitle: "ストリート・サムライ",
    title: "Street Samurai",
    level: "Strength Level: 95",
    description: "Enhanced reflexes and blade-integrated limbs make this ex-military operative lethal in close combat.",
    imageUrl: "https://images.unsplash.com/photo-1613053341085-db794820ce43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: 4,
    name: "NEXUS",
    japaneseTitle: "サイバー・メディク",
    title: "Cyber Medic",
    level: "Medical Level: 98",
    description: "Specialized in combat nanomedicine and field repairs of cybernetic implants during missions.",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "PHANTOM",
    japaneseTitle: "ゴースト・インフィルトレーター",
    title: "Ghost Infiltrator",
    level: "Stealth Level: 99",
    description: "Equipped with cutting-edge optical camouflage and sound dampening tech for perfect infiltration missions.",
    imageUrl: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    name: "VOLT",
    japaneseTitle: "サンダー・コンダクター",
    title: "Thunder Conductor",
    level: "Power Level: 94",
    description: "Bio-engineered nervous system capable of generating and channeling massive electrical surges as weapons.",
    imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=635&q=80"
  },
  {
    id: 7,
    name: "NOVA",
    japaneseTitle: "サイコ・ブラスター",
    title: "Psycho Blaster",
    level: "Psionic Level: 96",
    description: "Rare psychic mutation enhanced with cerebral implants allowing telekinetic assaults and mind manipulation.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=634&q=80"
  }
];
