// import { getUsers } from '@my-workspace/packages-api';
// import { create, devtools } from '@kelsen-labs/zustand';

// interface IUseCardStore {
//   loading?: boolean;
//   data?: any;
//   error?: any;

//   fetchData: () => Promise<void>;

//   clearUseCardStore: () => void;
// }

// export const useCardStore = create<IUseCardStore>()(
//   devtools(
//     (set, get) => ({
//       loading: true,
//       data: undefined,
//       error: undefined,

//       fetchData: async () => {
//         try {
//           set({ loading: true });
//           const allUser = await getUsers();
//           set({ data: allUser });
//         } catch (e) {
//           console.log(e);
//           set({ error: e });
//         } finally {
//           set({ loading: false });
//         }
//       },

//       clearUseCardStore: () => {
//         set(
//           { loading: true, data: undefined, error: undefined },
//           false,
//           'Clear use card store'
//         );
//       },
//     }),

//     {
//       anonymousActionType: 'USE CARD STORE',
//       trace: true,
//       name: 'card store',
//     }
//   )
// );
