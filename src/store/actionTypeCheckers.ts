import { Action, AnyAction } from '@reduxjs/toolkit';

export function isPendingAction(action: AnyAction): action is Action {
  return action.type.endsWith('pending');
}

export function isFulfilledAction(action: AnyAction): action is Action {
  return action.type.endsWith('fulfilled');
}

interface RejectedAction extends Action {
  payload: { message: string };
}

export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}
