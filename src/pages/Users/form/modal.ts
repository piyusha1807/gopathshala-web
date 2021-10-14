export interface StateType {
    current?: string;
    step?: {
      payAccount: string;
      receiverAccount: string;
      receiverName: string;
      amount: string;
    };
  }