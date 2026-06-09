import { create } from 'zustand'
import { GROUPS } from '../data/sliders'

const buildDefaults = () => {
  const defaults = {}
  GROUPS.forEach(g => g.sliders.forEach(s => {
    defaults[`${g.id}-${s.id}`] = s.defaultValue
  }))
  return defaults
}

export const useSliderStore = create((set, get) => ({
  values: buildDefaults(),
  defaults: buildDefaults(),
  activeScenario: 'BAU',
  modifiedCount: 0,

  setValue: (key, value) => set(state => {
    const wasDefault = Math.abs(state.values[key] - state.defaults[key]) < 0.0001
    const isNowDefault = Math.abs(value - state.defaults[key]) < 0.0001
    const delta = wasDefault && !isNowDefault ? 1 : (!wasDefault && isNowDefault ? -1 : 0)
    return {
      values: { ...state.values, [key]: value },
      modifiedCount: Math.max(0, state.modifiedCount + delta),
    }
  }),

  setScenario: (scenario) => set(() => ({
    activeScenario: scenario,
    values: buildDefaults(),
    modifiedCount: 0,
  })),

  resetAll: () => set(() => ({
    values: buildDefaults(),
    modifiedCount: 0,
  })),

  isModified: () => get().modifiedCount > 0,

}))
