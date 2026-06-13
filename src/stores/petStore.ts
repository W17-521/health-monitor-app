import { create } from 'zustand';

interface PetState {
  activePetId: string;
  hunger: number;
  points: number;
  equippedAccessories: string[];
  setActivePet: (id: string) => void;
  setHunger: (h: number) => void;
  feed: (foodKcal: number, energyAvailable: number) => { success: boolean; newEnergy: number };
  buyAccessory: (name: string, cost: number) => boolean;
  equipAccessory: (name: string) => void;
  unequipAccessory: (name: string) => void;
}

export const usePetStore = create<PetState>((set, get) => ({
  activePetId: (() => { try { return localStorage.getItem('pet_activeId') ?? 'corgi'; } catch { return 'corgi'; } })(),
  hunger: (() => { try { return Number(localStorage.getItem('pet_hunger')) || 80; } catch { return 80; } })(),
  points: (() => { try { return Number(localStorage.getItem('pet_points')) || 300; } catch { return 300; } })(),
  equippedAccessories: (() => { try { const s = localStorage.getItem('pet_accessories'); return s ? JSON.parse(s) : []; } catch { return []; } })(),

  setActivePet: (id) => {
    localStorage.setItem('pet_activeId', id);
    const stored = Number(localStorage.getItem('pet_hunger_' + id));
    set({ activePetId: id, hunger: stored || 80 });
  },

  setHunger: (h) => {
    const { activePetId } = get();
    localStorage.setItem('pet_hunger', String(h));
    localStorage.setItem('pet_hunger_' + activePetId, String(h));
    set({ hunger: h });
  },

  feed: (foodKcal, energyAvailable) => {
    if (foodKcal > energyAvailable) return { success: false, newEnergy: energyAvailable };
    const { hunger, points } = get();
    const newHunger = Math.min(100, hunger + foodKcal / 10);
    const newPoints = points + Math.round(foodKcal / 5);
    localStorage.setItem('pet_hunger', String(newHunger));
    localStorage.setItem('pet_points', String(newPoints));
    set({ hunger: newHunger, points: newPoints });
    return { success: true, newEnergy: energyAvailable - foodKcal };
  },

  buyAccessory: (name, cost) => {
    const { points, equippedAccessories } = get();
    if (points < cost) return false;
    if (equippedAccessories.includes(name)) return true; // already own
    const newPoints = points - cost;
    const newAcc = [...equippedAccessories, name];
    localStorage.setItem('pet_points', String(newPoints));
    localStorage.setItem('pet_accessories', JSON.stringify(newAcc));
    set({ points: newPoints, equippedAccessories: newAcc });
    return true;
  },

  equipAccessory: (name) => {
    const { equippedAccessories } = get();
    if (!equippedAccessories.includes(name)) return;
  },

  unequipAccessory: (name) => {
    const { equippedAccessories } = get();
    const newAcc = equippedAccessories.filter((a) => a !== name);
    localStorage.setItem('pet_accessories', JSON.stringify(newAcc));
    set({ equippedAccessories: newAcc });
  },
}));
