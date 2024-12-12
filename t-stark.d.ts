// t-stark.d.ts

declare module 't-stark' {
    const TStark: {
      ready(client: any): void;
      presence(client: any, type: number, text: string): void;
    };
    export = TStark;
}  