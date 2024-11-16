import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store'; // Adjust the import according to your store file location

interface Zone {
    id: string;
    name: string;
    capturedById: string | null;
    isLocked: boolean;
    currentQuestionId: string | null;
    points: number;
    phase1Complete: boolean;
}

interface ZoneState {
    zones: Zone[];
}

const initialState: ZoneState = {
    zones: [],
};

const zoneSlice = createSlice({
    name: 'zones',
    initialState,
    reducers: {
        setZones(state, action: PayloadAction<Zone[]>) {
            state.zones = action.payload;
        },
        updateZone(state, action: PayloadAction<Zone>) {
            const index = state.zones.findIndex(zone => zone.id === action.payload.id);
            if (index !== -1) {
                state.zones[index] = action.payload;
            }
        },
    },
});

export const { setZones, updateZone } = zoneSlice.actions;

// Example usage:
// import { useZones } from './zoneSlice';
// 
// const MyComponent = () => {
//   const { zones, setZone, initialize } = useZones();
//   
//   useEffect(() => {
//     const initialZones = [
//       { id: 'zone1', name: 'Zone 1' },
//       { id: 'zone2', name: 'Zone 2' },
//     ];
//     initialize(initialZones);
//   }, [initialize]);
//   
//   const handleUpdateZone = () => {
//     const updatedZone = {
//       id: 'zone1',
//       name: 'Updated Zone 1',
//       capturedById: 'user1',
//       isLocked: true,
//       currentQuestionId: 'question1',
//       points: 100,
//       phase1Complete: true,
//     };
//     setZone(updatedZone);
//   };
//   
//   return (
//     <div>
//       {zones.map(zone => (
//         <div key={zone.id}>
//           <h2>{zone.name}</h2>
//           {/* Render other zone properties */}
//         </div>
//       ))}
//       <button onClick={handleUpdateZone}>Update Zone</button>
//     </div>
//   );
// };

export const useZones = () => {
    const dispatch = useDispatch();
    const zones = useSelector((state: RootState) => state.zones.zones);

    const setZone = (zone: Zone) => {
        dispatch(updateZone(zone));
    };

    const initialize = (zones: Zone[]) => {
        dispatch(setZones(zones));
    };

    return { zones, setZone, initialize };
};

export default zoneSlice.reducer;
