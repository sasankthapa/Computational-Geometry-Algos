import {configureStore} from '@reduxjs/toolkit'
import { controllerSlice } from './reducers/controller';

export const store=configureStore({
    reducer:{
        controller:controllerSlice
    }
});

export type RootState=ReturnType<typeof store.getState>
