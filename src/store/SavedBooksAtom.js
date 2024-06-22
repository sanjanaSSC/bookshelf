import { atom } from 'recoil'

export const savedBooksAtom = atom({
key:"savedBooks",
default: [ ]
});

export const loggedInAtom = atom({
    key: 'loggedInAtom', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });