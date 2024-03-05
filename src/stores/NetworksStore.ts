import { create } from 'zustand';
import { v4 } from 'uuid';

export type NetworksStore = {
  networksData: [any]
}

export const useNetworksStore = create((set) => ({
    networksData: [],
    addNetwork: () => set(({ networksData }: NetworksStore) => {
      console.log(networksData);
      return ({ state: networksData.push({ id: v4(), elements: [
        {
          type: 'wire',
          id: v4()
        }
      ] }) })
    }),
    deleteNetwork: (id: number) => set(({ networksData }: NetworksStore) => {
      const indexOfNetwork = networksData.findIndex(({ id: networkId }) => networkId === id);
      return ({ state: networksData.splice(indexOfNetwork, 1) })
    }),
    addElement: ({ id: networkId, elements }: { id: string, elements: [{ id: string, type: string, on: boolean }] }, id: string, type: string) => set(({ networksData }: NetworksStore) => {
      const indexOfNetwork = networksData.findIndex(({ id: currentNetworkId }) => currentNetworkId === networkId);
      const indexOfWire = elements.findIndex(({ id: elementId }) => elementId === id);

      elements.splice(indexOfWire, 0, {id: v4(), type, on: false});
      elements.splice(indexOfWire, 0, {id: v4(), type: "wire", on: false});
  
      return ({ state: networksData[indexOfNetwork].elements = elements })
    }),
    switchContact: (networkId: string, id: string) => set(({ networksData }: NetworksStore) => {
      const indexOfNetwork = networksData.findIndex(({ id: currentNetworkId }) => currentNetworkId === networkId);

      const newElements = networksData[indexOfNetwork].elements.map((element: { id: string, on: boolean }) => {
        const { id: elementId, on } = element;
        if (elementId === id) {
          return {
            ...element,
            on: !on
          }
        }

        return element;
      });

      networksData[indexOfNetwork].elements = newElements;

      return ({ state: networksData })
    })
  }))