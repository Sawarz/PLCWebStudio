import { create } from 'zustand';
import { v4 } from 'uuid';
import { useVariableStore } from '@/stores/VariableStore';
import { ElementType } from '@/types/ElementEnum';

export type NetworksStore = {
  networksData: [any],
  addNetwork: () => void,
  deleteNetwork: (id: number) => void,
  addElement: ({ id, elements }: { id: string, elements: [{ id: string, type: string, on: boolean }] }) => void,
  switchContact: (networkId: string, id: string) => void,
  modifyElement: ({ networkId, id, variableName }: { networkId: string, id: string, variableName: string }) => void,
  calculateNetwork: (networkId: string) => void
}

export const useNetworksStore = create((set) => ({
    networksData: [],
    addNetwork: () => set(({ networksData }: NetworksStore) => {
      return ({ state: networksData.push({ id: v4(), elements: [
        {
          type: ElementType.Wire,
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
      elements.splice(indexOfWire, 0, {id: v4(), type: ElementType.Wire, on: false});
  
      return ({ state: networksData[indexOfNetwork].elements = elements })
    }),
    modifyElement: ({ networkId, id, variableName }: { networkId: string, id: string, variableName: string }) => set(({ networksData }: NetworksStore) => {
      const indexOfNetwork = networksData.findIndex(({ id: currentNetworkId }) => currentNetworkId === networkId);
      const indexOfElement = networksData[indexOfNetwork].elements.findIndex(({ id: elementId }: { id: string }) => elementId === id);

      const chosenElement = networksData[indexOfNetwork].elements[indexOfElement];
      networksData[indexOfNetwork].elements[indexOfElement] = { ...chosenElement, variableName };

      return ({ state: networksData })
    }),
    calculateNetwork: (networkId: string) => set(({ networksData }: NetworksStore) => {
      const indexOfNetwork = networksData.findIndex(({ id: currentNetworkId }) => currentNetworkId === networkId);
      const elements = networksData[indexOfNetwork].elements;

      const { variables, modifyVariable }: any = useVariableStore.getState();
      elements.map((element: { id: string, type: string, on: boolean, variableName: string }, i: number) => {
        const { variableName } = element;

        const { value } = variables.find(({ name }: { name: string }) => name === variableName) ?? {};

        if (element.type === ElementType.Wire) {
          element.on = elements[i - 1]?.on ? true : false;
        }
        if (element.type === ElementType.Contact) {
          element.on = value;
        }

        if (element.type === ElementType.Coil) {
          element.on = elements[i - 1]?.on ? true : false;
          modifyVariable({ ...variables.find(({ name }: { name: string }) => name === variableName), value: element.on });
        }

        if (i === 1 && element.on && elements[i - 1])
          elements[i - 1].on = element.on;
      });

      networksData[indexOfNetwork].elements = elements;
  
      return ({ state: networksData })
    })
  }));