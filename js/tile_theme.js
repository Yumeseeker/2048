var tileThemeFallback = {
  motif: "✉",
  name: "mystery parcel",
  accent: "forest"
};

var tileThemes = {
  2: {
    motif: "🐱",
    name: "sleepy cat",
    accent: "sage"
  },
  4: {
    motif: "🦊",
    name: "tiny fox",
    accent: "peach"
  },
  8: {
    motif: "🐻",
    name: "honey bear",
    accent: "honey"
  },
  16: {
    motif: "🐦",
    name: "little bird",
    accent: "sky"
  },
  32: {
    motif: "🍓",
    name: "strawberry",
    accent: "berry"
  },
  64: {
    motif: "🍋",
    name: "lemon tart",
    accent: "citrus"
  },
  128: {
    motif: "🥕",
    name: "bunny carrot",
    accent: "carrot"
  },
  256: {
    motif: "🐼",
    name: "sleepy panda",
    accent: "moss"
  },
  512: {
    motif: "🍵",
    name: "tea break",
    accent: "tea"
  },
  1024: {
    motif: "🧸",
    name: "cuddle bear",
    accent: "forest"
  },
  2048: {
    motif: "🎁",
    name: "party parcel",
    accent: "gold"
  }
};

function getTileTheme(value) {
  return tileThemes[value] || tileThemeFallback;
}
