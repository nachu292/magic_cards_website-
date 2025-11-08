/* cards.js - data for 50 cards */
const CARDS = [
    // Format: id, name, category, description, price, seed image
    { id: 1, name: "Azure Drake", category: "Creature - Dragon", desc: "A sky-serpent that patrols the stormbound passes.", price: "$6.99", seed: "azure-drake" },
    { id: 2, name: "Eldritch Bolt", category: "Spell - Instant", desc: "A shard of living lightning rips through armor.", price: "$2.49", seed: "eldritch-bolt" },
    { id: 3, name: "Grove Sentinel", category: "Creature - Guardian", desc: "Roots that hold the earth together and the secrets within.", price: "Free", seed: "grove-sentinel" },
    { id: 4, name: "Phantom Echo", category: "Spell - Enchantment", desc: "Whispers that return the lost to memory.", price: "$3.50", seed: "phantom-echo" },
    { id: 5, name: "Runebreaker", category: "Artifact", desc: "Smashes seals with a single rune-driven blow.", price: "$7.99", seed: "runebreaker" },
    { id: 6, name: "Moonlit Stag", category: "Creature - Beast", desc: "A guardian of moonlit glades, fleet and unseen.", price: "Free", seed: "moonlit-stag" },
    { id: 7, name: "Sable Witch", category: "Creature - Wizard", desc: "Trades riddles for favors with the midnight wind.", price: "$4.20", seed: "sable-witch" },
    { id: 8, name: "Echoing Depths", category: "Land", desc: "A hollow that returns any memory twice.", price: "Free", seed: "echoing-depths" },
    { id: 9, name: "Solar Flare", category: "Spell - Sorcery", desc: "A concentrated flare that blinds armies.", price: "$5.50", seed: "solar-flare" },
    { id: 10, name: "Ironroot Defender", category: "Creature - Treefolk", desc: "Standing since the first fires of the world.", price: "Free", seed: "ironroot-defender" },
    { id: 11, name: "Stormforged Ram", category: "Creature - Elemental", desc: "Its horns crack thunder across battlefields.", price: "$6.25", seed: "stormforged-ram" },
    { id: 12, name: "Chronomancer's Coin", category: "Artifact", desc: "Toss it to rewind a single breath.", price: "$9.99", seed: "chronomancer-coin" },
    { id: 13, name: "Lantern of Veils", category: "Artifact", desc: "Reveals what the shadow would hide.", price: "$3.99", seed: "lantern-veils" },
    { id: 14, name: "Mystic Orchard", category: "Land", desc: "Fruit that heals the body and teaches songs.", price: "Free", seed: "mystic-orchard" },
    { id: 15, name: "Netherflame Wisp", category: "Creature - Spirit", desc: "A tiny ember that feeds on grief.", price: "$2.99", seed: "netherflame-wisp" },
    { id: 16, name: "Paladin of Dawn", category: "Creature - Knight", desc: "Shines with an unwavering, righteous glow.", price: "$4.99", seed: "paladin-dawn" },
    { id: 17, name: "Obsidian Golem", category: "Creature - Golem", desc: "Quiet as stone, terrible in motion.", price: "$8.99", seed: "obsidian-golem" },
    { id: 18, name: "Whispering Map", category: "Artifact", desc: "Shows paths only to those who listen.", price: "$5.25", seed: "whispering-map" },
    { id: 19, name: "Vortex Tide", category: "Spell - Instant", desc: "Pulls the waves into a spiralling rift.", price: "$3.20", seed: "vortex-tide" },
    { id: 20, name: "Dawnweaver", category: "Creature - Cleric", desc: "Weaves light into the wounds of the world.", price: "Free", seed: "dawnweaver" },
    { id: 21, name: "Echo Drake", category: "Creature - Dragon", desc: "Its roar repeats into the mountains, shaping them.", price: "$6.80", seed: "echo-drake" },
    { id: 22, name: "Searing Glyph", category: "Spell - Ritual", desc: "Burns a sigil that binds lesser devils.", price: "$2.00", seed: "searing-glyph" },
    { id: 23, name: "Fen Witch", category: "Creature - Shaman", desc: "Collects dew and curses in equal measure.", price: "Free", seed: "fen-witch" },
    { id: 24, name: "Aether Compass", category: "Artifact", desc: "Points the way to the realms between.", price: "$7.10", seed: "aether-compass" },
    { id: 25, name: "Ravenous Maw", category: "Creature - Beast", desc: "A void that consumes not just flesh but fear.", price: "$5.60", seed: "ravenous-maw" },
    { id: 26, name: "Glimmerwing", category: "Creature - Fairy", desc: "A bright flicker that distracts the greedy.", price: "Free", seed: "glimmerwing" },
    { id: 27, name: "Sigil of Binding", category: "Spell - Enchantment", desc: "Chains a hostile will for a brief heartbeat.", price: "$4.40", seed: "sigil-binding" },
    { id: 28, name: "Stormcaller's Chalice", category: "Artifact", desc: "Summons rain from a single emptied cup.", price: "$8.50", seed: "stormcallers-chalice" },
    { id: 29, name: "Net of Stars", category: "Spell - Sorcery", desc: "Sweeps constellations into tangible nets.", price: "$6.00", seed: "net-of-stars" },
    { id: 30, name: "Brimstone Charger", category: "Creature - Horse", desc: "Gallops with cinders trailing its hooves.", price: "$5.75", seed: "brimstone-charger" },
    { id: 31, name: "Umbral Scholar", category: "Creature - Wizard", desc: "Reads the dark margins between pages.", price: "$3.95", seed: "umbral-scholar" },
    { id: 32, name: "Celestial Anchor", category: "Artifact", desc: "Holds a single star tethered to earth.", price: "$10.00", seed: "celestial-anchor" },
    { id: 33, name: "Forest's Blessing", category: "Spell - Instant", desc: "Gives sudden strength to a weary limb.", price: "Free", seed: "forests-blessing" },
    { id: 34, name: "Mirelurker", category: "Creature - Horror", desc: "Patience made wet and hungry.", price: "$2.80", seed: "mirelurker" },
    { id: 35, name: "Sage of Echoes", category: "Creature - Elder", desc: "A library with walking feet.", price: "$6.05", seed: "sage-echoes" },
    { id: 36, name: "Boneharvest", category: "Spell - Sorcery", desc: "Gathers the fallen to stand once more.", price: "$4.60", seed: "boneharvest" },
    { id: 37, name: "Luminous Veil", category: "Enchantment", desc: "A shining shield for the mind.", price: "$3.45", seed: "luminous-veil" },
    { id: 38, name: "Frostwarden", category: "Creature - Elemental", desc: "Breath forged in the mountain's heart.", price: "$5.40", seed: "frostwarden" },
    { id: 39, name: "Phosphor Lamp", category: "Artifact", desc: "Ever-burning light for secret paths.", price: "$1.99", seed: "phosphor-lamp" },
    { id: 40, name: "Bloodvine", category: "Enchantment - Aura", desc: "Grows by the blood of the willing.", price: "$7.75", seed: "bloodvine" },
    { id: 41, name: "Hollow Drake", category: "Creature - Dragon", desc: "A remnant more than a beast.", price: "$6.60", seed: "hollow-drake" },
    { id: 42, name: "Seer's Hourglass", category: "Artifact", desc: "Gives glimpses of seconds yet to pass.", price: "$8.25", seed: "seers-hourglass" },
    { id: 43, name: "Tanglewood Hunter", category: "Creature - Elf", desc: "Silent steps between thorn and dream.", price: "Free", seed: "tanglewood-hunter" },
    { id: 44, name: "Sunspear Volley", category: "Spell - Instant", desc: "A volley that glows with true heat.", price: "$3.30", seed: "sunspear-volley" },
    { id: 45, name: "Winds of Return", category: "Spell - Sorcery", desc: "Carries something lost back home.", price: "$2.75", seed: "winds-return" },
    { id: 46, name: "Nightfall Armor", category: "Artifact - Equipment", desc: "Blocks sight as naturally as night.", price: "$5.90", seed: "nightfall-armor" },
    { id: 47, name: "Gargoyle Custodian", category: "Creature - Gargoyle", desc: "Perches until called, then becomes stone no more.", price: "$4.99", seed: "gargoyle-custodian" },
    { id: 48, name: "Veilbound Tome", category: "Artifact - Book", desc: "Pages that change when no eyes watch.", price: "$9.40", seed: "veilbound-tome" },
    { id: 49, name: "Shimmering Reef", category: "Land", desc: "The sea gives up secrets on bright mornings.", price: "Free", seed: "shimmering-reef" },
    { id: 50, name: "Eternal Lantern", category: "Artifact", desc: "Burns with the memory of an entire village.", price: "$11.50", seed: "eternal-lantern" }
];

/* helper to get image URL by seed - small size for thumbnails */
function imgUrl(seed, w = 600, h = 800) {
    // picsum.photos with seed ensures consistent images, add blur param and quality
    const safeSeed = encodeURIComponent(seed);
    return `https://picsum.photos/seed/${safeSeed}/${Math.round(w)}/${Math.round(h)}?grayscale=0`;
}
