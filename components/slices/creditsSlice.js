import { createSlice } from "@reduxjs/toolkit";

//eslint-disable-next-line no-unused-vars
const emptyState = {
  preset: null,
  style: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    fontSize: 24,
    fontFamily: "Tall Dark And Handsome",
    rotate: 0,
    textAlign: "center",
    zIndex: 1,
    color: "#000000",
  },
  presetOptions: {},
  possibleKeys: [],
};

const presets = {
  dune(options) {
    const firstLine = `${options.distributor} PRESENTs IN ASSOCIATION WITH ${
      options.productionCompany
    } A FILM BY ${options.director} "${options.title}" ${(
      options.leads ?? []
    ).join("")}\n`;
    let secondLine = `‽BASED ON ${options.novel} screenp‽lay ${options.screenplay} mu‽sic ${options.music} direc‽ted ${options.director}\n`;
    let thirdLine = "";
    let lastIndex = 0;
    while (secondLine.includes("‽")) {
      const i = secondLine.indexOf("‽");
      thirdLine += `${" ".repeat(i - lastIndex)}${
        lastIndex == 0 ? "the novel " : ""
      }by`;
      secondLine = [...secondLine];
      secondLine.splice(i, 1);
      secondLine = secondLine.join("");
      lastIndex = i + (i == 0 ? "the novel ".length : 2);
    }
    while (thirdLine.length < secondLine.length) thirdLine += " ";
    return (firstLine + secondLine + thirdLine).toUpperCase();
  },
  trainToBusan(options) {
    return `${options.firstDistributor} presents a ${
      options.secondDistributor
    } a ${options.director} film ${(options.leads ?? []).join("  ")} "${
      options.title
    }"\nexeecutive producer ${options.executiveProducer} producer ${
      options.producer
    } written by ${options.writer} directed by ${
      options.director
    }\nCO PRODUCER ${options.coProducer} CINEMATOGRAPHY ${
      options.cinematographer
    } LIGHTING ${options.lightingSpecialist} PRODUCTION DESIGN ${
      options.productionDesigner
    } SOUND RECORDING ${options.soundRecorder} COSTUME ${(
      options.costume ?? []
    ).join(",")} HAIR & MAKE UP ${options.makeUp} SPECIAL MAKE UP ${(
      options.specialMakeUp ?? []
    ).join(",")}\nspecial effects demolition editing ${
      options.specialEffectsArtist
    } music ${options.musician} sound supervisor ${
      options.soundSupervisor
    } DI ${options.di} vfx supervisor ${options.VFX} international sales by ${
      options.internationalSales
    }`;
  },
};

const presetKeys = {
  dune: [
    "distributor",
    "productionCompany",
    "director",
    "title",
    ["leads"],
    "novel",
    "screenplay",
    "music",
  ],
  trainToBusan: [
    "firstDistributor",
    "secondDistributor",
    "director",
    ["leads"],
    "executiveProducer",
    "producer",
    "writer",
    "coProducer",
    "cinematographer",
    "lightingSpecialist",
    "productionDesigner",
    "soundRecorder",
    ["costume"],
    "makeUp",
    "specialMakeUp",
    "specialEffectsArtist",
    "musician",
    "soundSupervisor",
    "di",
    "VFX",
    "internationalSales",
  ],
};

export const possiblePresets = (() => Object.keys(presetKeys))();

export const slice = createSlice({
  name: "credits",
  initialState: emptyState,
  reducers: {
    setPreset: {
      reducer(state, action) {
        state.preset = action.payload.preset;
        if (action.payload.preset) {
          state.possibleKeys = [...presetKeys[action.payload.preset]];
        }
      },
      prepare(preset) {
        return { payload: { preset } };
      },
    },
    setOption: {
      reducer(state, action) {
        state.presetOptions = {
          ...state.presetOptions,
          ...action.payload.option,
        };
      },
      prepare(option) {
        return { payload: { option } };
      },
    },
    setStyle: {
      reducer(state, action) {
        state.style = { ...state.style, ...action.payload.style };
      },
      prepare(style) {
        return { payload: { style } };
      },
    },
  },
});

export const { setPreset, setOption, setStyle } = slice.actions;

export const generateCredits = (state) =>
  state.credits.preset
    ? presets[state.credits.preset](state.credits.presetOptions)
    : null;

export default slice.reducer;
