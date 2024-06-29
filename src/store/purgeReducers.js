import { persistor } from './store';
import storage from 'redux-persist/lib/storage'; // Hoặc storage khác bạn đang sử dụng
import { resetUserState } from './slice/userSlice'; // Import the reset action for the user reducer
import { resetCheckoutState } from './slice/checkoutSlice'; // Import the reset action for the checkout reducer
import { store } from './store';

const purgeSpecificReducers = async (reducersToPurge) => {
    try {
        // Pause persistor to avoid any write operations during purge
        persistor.pause();

        // Get current state from storage
        const state = await storage.getItem('persist:root');

        if (state) {
            const stateObj = JSON.parse(state);

            // Remove specified reducers from state
            reducersToPurge.forEach(reducerKey => {
                delete stateObj[reducerKey];
            });

            // Save the updated state back to storage
            await storage.setItem('persist:root', JSON.stringify(stateObj));
        }

        // Dispatch actions to reset the state of the purged reducers in Redux
        reducersToPurge.forEach(reducerKey => {
            switch (reducerKey) {
                case 'user':
                    store.dispatch(resetUserState());
                    break;
                case 'checkout':
                    store.dispatch(resetCheckoutState());
                    break;
                default:
                    break;
            }
        });

        // Resume persistor to continue normal operations
        persistor.persist();
    } catch (error) {
        console.error('Failed to purge specific reducers:', error);
    }
};

export default purgeSpecificReducers;
