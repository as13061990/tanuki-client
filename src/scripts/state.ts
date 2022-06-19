import { Modals } from './scenes/Modal';
import { State } from './types';

const state: State = {
  name: '',
  tgId: '',
  attempts: 5,
  modal: Modals.None,
  currentPoints: 0,
};

export default state;