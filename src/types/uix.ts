export type TMessageType = 'error' | 'warning' | 'info' | 'success' | undefined;

export type TMessage = {
  type: TMessageType;
  text: string | null;
};

export interface IUixState {
  isFetching: boolean;
  message: TMessage;
}
