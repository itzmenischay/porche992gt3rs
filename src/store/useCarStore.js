import { create } from 'zustand'

export const useCarStore = create((set) => ({
  carColor: '#ffffff',
  soundEnabled: false,
  activeSection: 'hero',
  scrollProgress: 0,
  isLoaded: false,
  
  setCarColor: (color) => set({ carColor: color }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded })
}))
