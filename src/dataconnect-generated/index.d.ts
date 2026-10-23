import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Activity_Key {
  id: UUIDString;
  __typename?: 'Activity_Key';
}

export interface AddTripMemberData {
  tripMember_insert: TripMember_Key;
}

export interface AddTripMemberVariables {
  tripId: UUIDString;
  userId: UUIDString;
}

export interface CreateActivityData {
  activity_insert: Activity_Key;
}

export interface CreateActivityVariables {
  tripId: UUIDString;
  title: string;
  startTime: TimestampString;
}

export interface CreateExpenseData {
  expense_insert: Expense_Key;
}

export interface CreateExpenseVariables {
  tripId: UUIDString;
  amount: number;
}

export interface CreateMemoryData {
  memory_insert: Memory_Key;
}

export interface CreateMemoryVariables {
  tripId: UUIDString;
  content: string;
}

export interface CreateTripData {
  trip_insert: Trip_Key;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteActivityData {
  activity_delete?: Activity_Key | null;
}

export interface DeleteActivityVariables {
  id: UUIDString;
}

export interface DeleteExpenseData {
  expense_delete?: Expense_Key | null;
}

export interface DeleteExpenseVariables {
  id: UUIDString;
}

export interface DeleteMemoryData {
  memory_delete?: Memory_Key | null;
}

export interface DeleteMemoryVariables {
  id: UUIDString;
}

export interface DeleteTripData {
  trip_delete?: Trip_Key | null;
}

export interface DeleteTripVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Expense_Key {
  id: UUIDString;
  __typename?: 'Expense_Key';
}

export interface GetActivityData {
  activity?: {
    title: string;
    location?: string | null;
  };
}

export interface GetActivityVariables {
  id: UUIDString;
}

export interface GetExpenseData {
  expense?: {
    amount: number;
    description?: string | null;
  };
}

export interface GetExpenseVariables {
  id: UUIDString;
}

export interface GetMemoryData {
  memory?: {
    content: string;
    photoUrl?: string | null;
  };
}

export interface GetMemoryVariables {
  id: UUIDString;
}

export interface GetTripData {
  trip?: {
    name: string;
    destination?: string | null;
  };
}

export interface GetTripMemberData {
  tripMember?: {
    role: string;
    user: {
      username: string;
    };
  };
}

export interface GetTripMemberVariables {
  id: UUIDString;
}

export interface GetTripVariables {
  id: UUIDString;
}

export interface GetUserData {
  user?: {
    username: string;
    email: string;
  };
}

export interface ListActivitiesData {
  activities: ({
    title: string;
    startTime: TimestampString;
  })[];
}

export interface ListActivitiesVariables {
  tripId: UUIDString;
}

export interface ListExpensesData {
  expenses: ({
    amount: number;
    paidBy: {
      username: string;
    };
  })[];
}

export interface ListExpensesVariables {
  tripId: UUIDString;
}

export interface ListMemoriesData {
  memories: ({
    content: string;
    author: {
      username: string;
    };
  })[];
}

export interface ListMemoriesVariables {
  tripId: UUIDString;
}

export interface ListTripMembersData {
  tripMembers: ({
    user: {
      username: string;
    };
    role: string;
  })[];
}

export interface ListTripMembersVariables {
  tripId: UUIDString;
}

export interface ListTripsData {
  trips: ({
    name: string;
  })[];
}

export interface ListUsersData {
  users: ({
    username: string;
  })[];
}

export interface Memory_Key {
  id: UUIDString;
  __typename?: 'Memory_Key';
}

export interface RemoveTripMemberData {
  tripMember_delete?: TripMember_Key | null;
}

export interface RemoveTripMemberVariables {
  id: UUIDString;
}

export interface TripMember_Key {
  id: UUIDString;
  __typename?: 'TripMember_Key';
}

export interface Trip_Key {
  id: UUIDString;
  __typename?: 'Trip_Key';
}

export interface UpdateActivityData {
  activity_update?: Activity_Key | null;
}

export interface UpdateActivityVariables {
  id: UUIDString;
  notes: string;
}

export interface UpdateExpenseData {
  expense_update?: Expense_Key | null;
}

export interface UpdateExpenseVariables {
  id: UUIDString;
  amount: number;
}

export interface UpdateMemoryData {
  memory_update?: Memory_Key | null;
}

export interface UpdateMemoryVariables {
  id: UUIDString;
  content: string;
}

export interface UpdateTripData {
  trip_update?: Trip_Key | null;
}

export interface UpdateTripMemberData {
  tripMember_update?: TripMember_Key | null;
}

export interface UpdateTripMemberVariables {
  id: UUIDString;
  role: string;
}

export interface UpdateTripVariables {
  id: UUIDString;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(): MutationPromise<UpdateUserData, undefined>;
export function updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateTripRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTripData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateTripData, undefined>;
  operationName: string;
}
export const createTripRef: CreateTripRef;

export function createTrip(): MutationPromise<CreateTripData, undefined>;
export function createTrip(dc: DataConnect): MutationPromise<CreateTripData, undefined>;

interface UpdateTripRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTripVariables): MutationRef<UpdateTripData, UpdateTripVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTripVariables): MutationRef<UpdateTripData, UpdateTripVariables>;
  operationName: string;
}
export const updateTripRef: UpdateTripRef;

export function updateTrip(vars: UpdateTripVariables): MutationPromise<UpdateTripData, UpdateTripVariables>;
export function updateTrip(dc: DataConnect, vars: UpdateTripVariables): MutationPromise<UpdateTripData, UpdateTripVariables>;

interface DeleteTripRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTripVariables): MutationRef<DeleteTripData, DeleteTripVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTripVariables): MutationRef<DeleteTripData, DeleteTripVariables>;
  operationName: string;
}
export const deleteTripRef: DeleteTripRef;

export function deleteTrip(vars: DeleteTripVariables): MutationPromise<DeleteTripData, DeleteTripVariables>;
export function deleteTrip(dc: DataConnect, vars: DeleteTripVariables): MutationPromise<DeleteTripData, DeleteTripVariables>;

interface GetTripRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTripVariables): QueryRef<GetTripData, GetTripVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTripVariables): QueryRef<GetTripData, GetTripVariables>;
  operationName: string;
}
export const getTripRef: GetTripRef;

export function getTrip(vars: GetTripVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripData, GetTripVariables>;
export function getTrip(dc: DataConnect, vars: GetTripVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripData, GetTripVariables>;

interface ListTripsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTripsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTripsData, undefined>;
  operationName: string;
}
export const listTripsRef: ListTripsRef;

export function listTrips(options?: ExecuteQueryOptions): QueryPromise<ListTripsData, undefined>;
export function listTrips(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTripsData, undefined>;

interface AddTripMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTripMemberVariables): MutationRef<AddTripMemberData, AddTripMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddTripMemberVariables): MutationRef<AddTripMemberData, AddTripMemberVariables>;
  operationName: string;
}
export const addTripMemberRef: AddTripMemberRef;

export function addTripMember(vars: AddTripMemberVariables): MutationPromise<AddTripMemberData, AddTripMemberVariables>;
export function addTripMember(dc: DataConnect, vars: AddTripMemberVariables): MutationPromise<AddTripMemberData, AddTripMemberVariables>;

interface UpdateTripMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTripMemberVariables): MutationRef<UpdateTripMemberData, UpdateTripMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTripMemberVariables): MutationRef<UpdateTripMemberData, UpdateTripMemberVariables>;
  operationName: string;
}
export const updateTripMemberRef: UpdateTripMemberRef;

export function updateTripMember(vars: UpdateTripMemberVariables): MutationPromise<UpdateTripMemberData, UpdateTripMemberVariables>;
export function updateTripMember(dc: DataConnect, vars: UpdateTripMemberVariables): MutationPromise<UpdateTripMemberData, UpdateTripMemberVariables>;

interface RemoveTripMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTripMemberVariables): MutationRef<RemoveTripMemberData, RemoveTripMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveTripMemberVariables): MutationRef<RemoveTripMemberData, RemoveTripMemberVariables>;
  operationName: string;
}
export const removeTripMemberRef: RemoveTripMemberRef;

export function removeTripMember(vars: RemoveTripMemberVariables): MutationPromise<RemoveTripMemberData, RemoveTripMemberVariables>;
export function removeTripMember(dc: DataConnect, vars: RemoveTripMemberVariables): MutationPromise<RemoveTripMemberData, RemoveTripMemberVariables>;

interface GetTripMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTripMemberVariables): QueryRef<GetTripMemberData, GetTripMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTripMemberVariables): QueryRef<GetTripMemberData, GetTripMemberVariables>;
  operationName: string;
}
export const getTripMemberRef: GetTripMemberRef;

export function getTripMember(vars: GetTripMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripMemberData, GetTripMemberVariables>;
export function getTripMember(dc: DataConnect, vars: GetTripMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripMemberData, GetTripMemberVariables>;

interface ListTripMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTripMembersVariables): QueryRef<ListTripMembersData, ListTripMembersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTripMembersVariables): QueryRef<ListTripMembersData, ListTripMembersVariables>;
  operationName: string;
}
export const listTripMembersRef: ListTripMembersRef;

export function listTripMembers(vars: ListTripMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTripMembersData, ListTripMembersVariables>;
export function listTripMembers(dc: DataConnect, vars: ListTripMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTripMembersData, ListTripMembersVariables>;

interface CreateActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
  operationName: string;
}
export const createActivityRef: CreateActivityRef;

export function createActivity(vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;
export function createActivity(dc: DataConnect, vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;

interface UpdateActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateActivityVariables): MutationRef<UpdateActivityData, UpdateActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateActivityVariables): MutationRef<UpdateActivityData, UpdateActivityVariables>;
  operationName: string;
}
export const updateActivityRef: UpdateActivityRef;

export function updateActivity(vars: UpdateActivityVariables): MutationPromise<UpdateActivityData, UpdateActivityVariables>;
export function updateActivity(dc: DataConnect, vars: UpdateActivityVariables): MutationPromise<UpdateActivityData, UpdateActivityVariables>;

interface DeleteActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
  operationName: string;
}
export const deleteActivityRef: DeleteActivityRef;

export function deleteActivity(vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;
export function deleteActivity(dc: DataConnect, vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;

interface GetActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActivityVariables): QueryRef<GetActivityData, GetActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetActivityVariables): QueryRef<GetActivityData, GetActivityVariables>;
  operationName: string;
}
export const getActivityRef: GetActivityRef;

export function getActivity(vars: GetActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityData, GetActivityVariables>;
export function getActivity(dc: DataConnect, vars: GetActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityData, GetActivityVariables>;

interface ListActivitiesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListActivitiesVariables): QueryRef<ListActivitiesData, ListActivitiesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListActivitiesVariables): QueryRef<ListActivitiesData, ListActivitiesVariables>;
  operationName: string;
}
export const listActivitiesRef: ListActivitiesRef;

export function listActivities(vars: ListActivitiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, ListActivitiesVariables>;
export function listActivities(dc: DataConnect, vars: ListActivitiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, ListActivitiesVariables>;

interface CreateExpenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateExpenseVariables): MutationRef<CreateExpenseData, CreateExpenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateExpenseVariables): MutationRef<CreateExpenseData, CreateExpenseVariables>;
  operationName: string;
}
export const createExpenseRef: CreateExpenseRef;

export function createExpense(vars: CreateExpenseVariables): MutationPromise<CreateExpenseData, CreateExpenseVariables>;
export function createExpense(dc: DataConnect, vars: CreateExpenseVariables): MutationPromise<CreateExpenseData, CreateExpenseVariables>;

interface UpdateExpenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateExpenseVariables): MutationRef<UpdateExpenseData, UpdateExpenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateExpenseVariables): MutationRef<UpdateExpenseData, UpdateExpenseVariables>;
  operationName: string;
}
export const updateExpenseRef: UpdateExpenseRef;

export function updateExpense(vars: UpdateExpenseVariables): MutationPromise<UpdateExpenseData, UpdateExpenseVariables>;
export function updateExpense(dc: DataConnect, vars: UpdateExpenseVariables): MutationPromise<UpdateExpenseData, UpdateExpenseVariables>;

interface DeleteExpenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExpenseVariables): MutationRef<DeleteExpenseData, DeleteExpenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteExpenseVariables): MutationRef<DeleteExpenseData, DeleteExpenseVariables>;
  operationName: string;
}
export const deleteExpenseRef: DeleteExpenseRef;

export function deleteExpense(vars: DeleteExpenseVariables): MutationPromise<DeleteExpenseData, DeleteExpenseVariables>;
export function deleteExpense(dc: DataConnect, vars: DeleteExpenseVariables): MutationPromise<DeleteExpenseData, DeleteExpenseVariables>;

interface GetExpenseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExpenseVariables): QueryRef<GetExpenseData, GetExpenseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetExpenseVariables): QueryRef<GetExpenseData, GetExpenseVariables>;
  operationName: string;
}
export const getExpenseRef: GetExpenseRef;

export function getExpense(vars: GetExpenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetExpenseData, GetExpenseVariables>;
export function getExpense(dc: DataConnect, vars: GetExpenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetExpenseData, GetExpenseVariables>;

interface ListExpensesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExpensesVariables): QueryRef<ListExpensesData, ListExpensesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListExpensesVariables): QueryRef<ListExpensesData, ListExpensesVariables>;
  operationName: string;
}
export const listExpensesRef: ListExpensesRef;

export function listExpenses(vars: ListExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpensesData, ListExpensesVariables>;
export function listExpenses(dc: DataConnect, vars: ListExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpensesData, ListExpensesVariables>;

interface CreateMemoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemoryVariables): MutationRef<CreateMemoryData, CreateMemoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMemoryVariables): MutationRef<CreateMemoryData, CreateMemoryVariables>;
  operationName: string;
}
export const createMemoryRef: CreateMemoryRef;

export function createMemory(vars: CreateMemoryVariables): MutationPromise<CreateMemoryData, CreateMemoryVariables>;
export function createMemory(dc: DataConnect, vars: CreateMemoryVariables): MutationPromise<CreateMemoryData, CreateMemoryVariables>;

interface UpdateMemoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMemoryVariables): MutationRef<UpdateMemoryData, UpdateMemoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMemoryVariables): MutationRef<UpdateMemoryData, UpdateMemoryVariables>;
  operationName: string;
}
export const updateMemoryRef: UpdateMemoryRef;

export function updateMemory(vars: UpdateMemoryVariables): MutationPromise<UpdateMemoryData, UpdateMemoryVariables>;
export function updateMemory(dc: DataConnect, vars: UpdateMemoryVariables): MutationPromise<UpdateMemoryData, UpdateMemoryVariables>;

interface DeleteMemoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMemoryVariables): MutationRef<DeleteMemoryData, DeleteMemoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMemoryVariables): MutationRef<DeleteMemoryData, DeleteMemoryVariables>;
  operationName: string;
}
export const deleteMemoryRef: DeleteMemoryRef;

export function deleteMemory(vars: DeleteMemoryVariables): MutationPromise<DeleteMemoryData, DeleteMemoryVariables>;
export function deleteMemory(dc: DataConnect, vars: DeleteMemoryVariables): MutationPromise<DeleteMemoryData, DeleteMemoryVariables>;

interface GetMemoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemoryVariables): QueryRef<GetMemoryData, GetMemoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMemoryVariables): QueryRef<GetMemoryData, GetMemoryVariables>;
  operationName: string;
}
export const getMemoryRef: GetMemoryRef;

export function getMemory(vars: GetMemoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemoryData, GetMemoryVariables>;
export function getMemory(dc: DataConnect, vars: GetMemoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemoryData, GetMemoryVariables>;

interface ListMemoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMemoriesVariables): QueryRef<ListMemoriesData, ListMemoriesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMemoriesVariables): QueryRef<ListMemoriesData, ListMemoriesVariables>;
  operationName: string;
}
export const listMemoriesRef: ListMemoriesRef;

export function listMemories(vars: ListMemoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMemoriesData, ListMemoriesVariables>;
export function listMemories(dc: DataConnect, vars: ListMemoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMemoriesData, ListMemoriesVariables>;

