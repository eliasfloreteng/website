const GRADIENTS = [
  "https://products.ls.graphics/mesh-gradients/images/01.-Royal-Heath_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/02.-Egg-Sour_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint.jpg",
  "https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/05.-Flax_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria.jpg",
  "https://products.ls.graphics/mesh-gradients/images/07.-Tidal.jpg",
  "https://products.ls.graphics/mesh-gradients/images/08.-Violet-Blue.jpg",
  "https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue.jpg",
  "https://products.ls.graphics/mesh-gradients/images/10.-Mindaro.jpg",
  "https://products.ls.graphics/mesh-gradients/images/11.-Fuchsia.jpg",
  "https://products.ls.graphics/mesh-gradients/images/12.-Tumbleweed.jpg",
  "https://products.ls.graphics/mesh-gradients/images/13.-Pale-Violet-Red.jpg",
  "https://products.ls.graphics/mesh-gradients/images/14.-Prim.jpg",
  "https://products.ls.graphics/mesh-gradients/images/15.-Perfume.jpg",
  "https://products.ls.graphics/mesh-gradients/images/16.-Medium-Purple.jpg",
  "https://products.ls.graphics/mesh-gradients/images/17.-Dark-Salmon_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/18.-Buttercup.jpg",
  "https://products.ls.graphics/mesh-gradients/images/19.-Can-Can.jpg",
  "https://products.ls.graphics/mesh-gradients/images/20.-Melanie_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/21.-Columbia-Blue.jpg",
  "https://products.ls.graphics/mesh-gradients/images/22.-Shalimar.jpg",
  "https://products.ls.graphics/mesh-gradients/images/23.-California.jpg",
  "https://products.ls.graphics/mesh-gradients/images/24.-Sky-Blue.jpg",
  "https://products.ls.graphics/mesh-gradients/images/25.-Witch-Haze.jpg",
  "https://products.ls.graphics/mesh-gradients/images/26.-Honeysuckle.jpg",
  "https://products.ls.graphics/mesh-gradients/images/27.-Melanie.jpg",
  "https://products.ls.graphics/mesh-gradients/images/28.-Deco_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue.jpg",
  "https://products.ls.graphics/mesh-gradients/images/30.-Wild-Rice.jpg",
  "https://products.ls.graphics/mesh-gradients/images/31.-Portage_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/32.-Banana-Mania_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/33.-Beauty-Bush_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/34.-Mauve.jpg",
  "https://products.ls.graphics/mesh-gradients/images/35.-Ronchi_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/37.-Light-Sky-Blue.jpg",
  "https://products.ls.graphics/mesh-gradients/images/38.-Sky-Blue.jpg",
  "https://products.ls.graphics/mesh-gradients/images/39.-Prelude.jpg",
  "https://products.ls.graphics/mesh-gradients/images/40.-Cherokee.jpg",
  "https://products.ls.graphics/mesh-gradients/images/41.-Tonys-Pink.jpg",
  "https://products.ls.graphics/mesh-gradients/images/42.-Charm_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/43.-Harvest-Gold_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/44.-Green-Yellow.jpg",
  "https://products.ls.graphics/mesh-gradients/images/45.-Fog.jpg",
  "https://products.ls.graphics/mesh-gradients/images/46.-Watusi.jpg",
  "https://products.ls.graphics/mesh-gradients/images/47.-Whisper_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/48.-Yellowish.jpg",
  "https://products.ls.graphics/mesh-gradients/images/49.-Soft-Peach.jpg",
  "https://products.ls.graphics/mesh-gradients/images/50.-Vivid.jpg",
  "https://products.ls.graphics/mesh-gradients/images/51.-Spindle.jpg",
  "https://products.ls.graphics/mesh-gradients/images/52.-Pink-Chalk.jpg",
  "https://products.ls.graphics/mesh-gradients/images/53.-Canary.jpg",
  "https://products.ls.graphics/mesh-gradients/images/54.-Ice-Cream.jpg",
  "https://products.ls.graphics/mesh-gradients/images/55.-My-Pink_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/56.-Color-Smoke.jpg",
  "https://products.ls.graphics/mesh-gradients/images/57.-Glowish.jpg",
  "https://products.ls.graphics/mesh-gradients/images/58.-Polution.jpg",
  "https://products.ls.graphics/mesh-gradients/images/59.-Private.jpg",
  "https://products.ls.graphics/mesh-gradients/images/60.-Zircon_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/61.-Lavender_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/62.-Amour.jpg",
  "https://products.ls.graphics/mesh-gradients/images/63.-Pastel-Surface.jpg",
  "https://products.ls.graphics/mesh-gradients/images/64.-Makeup.jpg",
  "https://products.ls.graphics/mesh-gradients/images/65.-Prim.jpg",
  "https://products.ls.graphics/mesh-gradients/images/66.-Yellow-sand.jpg",
  "https://products.ls.graphics/mesh-gradients/images/67.-Violet-Rain.jpg",
  "https://products.ls.graphics/mesh-gradients/images/68.-Corvette.jpg",
  "https://products.ls.graphics/mesh-gradients/images/69.-Shocking_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/70.-Honeydew_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/71.-Quartz_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/72.-Sazerac_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/73.-Negroni.jpg",
  "https://products.ls.graphics/mesh-gradients/images/74.-Medium-Purple_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/75.-Pale-Turquoise.jpg",
  "https://products.ls.graphics/mesh-gradients/images/76.-Rice-Flower.jpg",
  "https://products.ls.graphics/mesh-gradients/images/77.-Green-bonbon.jpg",
  "https://products.ls.graphics/mesh-gradients/images/78.-Night-sky_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/79.-Heliotrope.jpg",
  "https://products.ls.graphics/mesh-gradients/images/80.-Dusty-blue_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/81.-Kobi.jpg",
  "https://products.ls.graphics/mesh-gradients/images/82.-Creamish.jpg",
  "https://products.ls.graphics/mesh-gradients/images/83.-Frosted-Mint.jpg",
  "https://products.ls.graphics/mesh-gradients/images/84.-Lolypop.jpg",
  "https://products.ls.graphics/mesh-gradients/images/85.-Lily-White.jpg",
  "https://products.ls.graphics/mesh-gradients/images/86.-Cherub.jpg",
  "https://products.ls.graphics/mesh-gradients/images/87.-Spacy_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/88.-Sunny.jpg",
  "https://products.ls.graphics/mesh-gradients/images/89.-Canvas.jpg",
  "https://products.ls.graphics/mesh-gradients/images/90.-Grass-mint.jpg",
  "https://products.ls.graphics/mesh-gradients/images/91.-Berry_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/92.-Sunset.jpg",
  "https://products.ls.graphics/mesh-gradients/images/93.-Medium-Goldenrod.jpg",
  "https://products.ls.graphics/mesh-gradients/images/94.-Almond.jpg",
  "https://products.ls.graphics/mesh-gradients/images/95.-Milkyway_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/96.-Lake_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/97.-Flare_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/98.-Torea-Bay_1.jpg",
  "https://products.ls.graphics/mesh-gradients/images/99.-Romanpreview.jpg",
  "https://products.ls.graphics/mesh-gradients/images/100.-Chetwode-Blue.jpg",
]

export { GRADIENTS }
