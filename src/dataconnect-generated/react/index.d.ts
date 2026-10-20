import { CreateUserData, UpdateUserData, DeleteUserData, GetUserData, ListUsersData, CreateTripData, UpdateTripData, UpdateTripVariables, DeleteTripData, DeleteTripVariables, GetTripData, GetTripVariables, ListTripsData, AddTripMemberData, AddTripMemberVariables, UpdateTripMemberData, UpdateTripMemberVariables, RemoveTripMemberData, RemoveTripMemberVariables, GetTripMemberData, GetTripMemberVariables, ListTripMembersData, ListTripMembersVariables, CreateActivityData, CreateActivityVariables, UpdateActivityData, UpdateActivityVariables, DeleteActivityData, DeleteActivityVariables, GetActivityData, GetActivityVariables, ListActivitiesData, ListActivitiesVariables, CreateExpenseData, CreateExpenseVariables, UpdateExpenseData, UpdateExpenseVariables, DeleteExpenseData, DeleteExpenseVariables, GetExpenseData, GetExpenseVariables, ListExpensesData, ListExpensesVariables, CreateMemoryData, CreateMemoryVariables, UpdateMemoryData, UpdateMemoryVariables, DeleteMemoryData, DeleteMemoryVariables, GetMemoryData, GetMemoryVariables, ListMemoriesData, ListMemoriesVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateTrip(options?: useDataConnectMutationOptions<CreateTripData, FirebaseError, void>): UseDataConnectMutationResult<CreateTripData, undefined>;
export function useCreateTrip(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTripData, FirebaseError, void>): UseDataConnectMutationResult<CreateTripData, undefined>;

export function useUpdateTrip(options?: useDataConnectMutationOptions<UpdateTripData, FirebaseError, UpdateTripVariables>): UseDataConnectMutationResult<UpdateTripData, UpdateTripVariables>;
export function useUpdateTrip(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTripData, FirebaseError, UpdateTripVariables>): UseDataConnectMutationResult<UpdateTripData, UpdateTripVariables>;

export function useDeleteTrip(options?: useDataConnectMutationOptions<DeleteTripData, FirebaseError, DeleteTripVariables>): UseDataConnectMutationResult<DeleteTripData, DeleteTripVariables>;
export function useDeleteTrip(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTripData, FirebaseError, DeleteTripVariables>): UseDataConnectMutationResult<DeleteTripData, DeleteTripVariables>;

export function useGetTrip(vars: GetTripVariables, options?: useDataConnectQueryOptions<GetTripData>): UseDataConnectQueryResult<GetTripData, GetTripVariables>;
export function useGetTrip(dc: DataConnect, vars: GetTripVariables, options?: useDataConnectQueryOptions<GetTripData>): UseDataConnectQueryResult<GetTripData, GetTripVariables>;

export function useListTrips(options?: useDataConnectQueryOptions<ListTripsData>): UseDataConnectQueryResult<ListTripsData, undefined>;
export function useListTrips(dc: DataConnect, options?: useDataConnectQueryOptions<ListTripsData>): UseDataConnectQueryResult<ListTripsData, undefined>;

export function useAddTripMember(options?: useDataConnectMutationOptions<AddTripMemberData, FirebaseError, AddTripMemberVariables>): UseDataConnectMutationResult<AddTripMemberData, AddTripMemberVariables>;
export function useAddTripMember(dc: DataConnect, options?: useDataConnectMutationOptions<AddTripMemberData, FirebaseError, AddTripMemberVariables>): UseDataConnectMutationResult<AddTripMemberData, AddTripMemberVariables>;

export function useUpdateTripMember(options?: useDataConnectMutationOptions<UpdateTripMemberData, FirebaseError, UpdateTripMemberVariables>): UseDataConnectMutationResult<UpdateTripMemberData, UpdateTripMemberVariables>;
export function useUpdateTripMember(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTripMemberData, FirebaseError, UpdateTripMemberVariables>): UseDataConnectMutationResult<UpdateTripMemberData, UpdateTripMemberVariables>;

export function useRemoveTripMember(options?: useDataConnectMutationOptions<RemoveTripMemberData, FirebaseError, RemoveTripMemberVariables>): UseDataConnectMutationResult<RemoveTripMemberData, RemoveTripMemberVariables>;
export function useRemoveTripMember(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTripMemberData, FirebaseError, RemoveTripMemberVariables>): UseDataConnectMutationResult<RemoveTripMemberData, RemoveTripMemberVariables>;

export function useGetTripMember(vars: GetTripMemberVariables, options?: useDataConnectQueryOptions<GetTripMemberData>): UseDataConnectQueryResult<GetTripMemberData, GetTripMemberVariables>;
export function useGetTripMember(dc: DataConnect, vars: GetTripMemberVariables, options?: useDataConnectQueryOptions<GetTripMemberData>): UseDataConnectQueryResult<GetTripMemberData, GetTripMemberVariables>;

export function useListTripMembers(vars: ListTripMembersVariables, options?: useDataConnectQueryOptions<ListTripMembersData>): UseDataConnectQueryResult<ListTripMembersData, ListTripMembersVariables>;
export function useListTripMembers(dc: DataConnect, vars: ListTripMembersVariables, options?: useDataConnectQueryOptions<ListTripMembersData>): UseDataConnectQueryResult<ListTripMembersData, ListTripMembersVariables>;

export function useCreateActivity(options?: useDataConnectMutationOptions<CreateActivityData, FirebaseError, CreateActivityVariables>): UseDataConnectMutationResult<CreateActivityData, CreateActivityVariables>;
export function useCreateActivity(dc: DataConnect, options?: useDataConnectMutationOptions<CreateActivityData, FirebaseError, CreateActivityVariables>): UseDataConnectMutationResult<CreateActivityData, CreateActivityVariables>;

export function useUpdateActivity(options?: useDataConnectMutationOptions<UpdateActivityData, FirebaseError, UpdateActivityVariables>): UseDataConnectMutationResult<UpdateActivityData, UpdateActivityVariables>;
export function useUpdateActivity(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateActivityData, FirebaseError, UpdateActivityVariables>): UseDataConnectMutationResult<UpdateActivityData, UpdateActivityVariables>;

export function useDeleteActivity(options?: useDataConnectMutationOptions<DeleteActivityData, FirebaseError, DeleteActivityVariables>): UseDataConnectMutationResult<DeleteActivityData, DeleteActivityVariables>;
export function useDeleteActivity(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteActivityData, FirebaseError, DeleteActivityVariables>): UseDataConnectMutationResult<DeleteActivityData, DeleteActivityVariables>;

export function useGetActivity(vars: GetActivityVariables, options?: useDataConnectQueryOptions<GetActivityData>): UseDataConnectQueryResult<GetActivityData, GetActivityVariables>;
export function useGetActivity(dc: DataConnect, vars: GetActivityVariables, options?: useDataConnectQueryOptions<GetActivityData>): UseDataConnectQueryResult<GetActivityData, GetActivityVariables>;

export function useListActivities(vars: ListActivitiesVariables, options?: useDataConnectQueryOptions<ListActivitiesData>): UseDataConnectQueryResult<ListActivitiesData, ListActivitiesVariables>;
export function useListActivities(dc: DataConnect, vars: ListActivitiesVariables, options?: useDataConnectQueryOptions<ListActivitiesData>): UseDataConnectQueryResult<ListActivitiesData, ListActivitiesVariables>;

export function useCreateExpense(options?: useDataConnectMutationOptions<CreateExpenseData, FirebaseError, CreateExpenseVariables>): UseDataConnectMutationResult<CreateExpenseData, CreateExpenseVariables>;
export function useCreateExpense(dc: DataConnect, options?: useDataConnectMutationOptions<CreateExpenseData, FirebaseError, CreateExpenseVariables>): UseDataConnectMutationResult<CreateExpenseData, CreateExpenseVariables>;

export function useUpdateExpense(options?: useDataConnectMutationOptions<UpdateExpenseData, FirebaseError, UpdateExpenseVariables>): UseDataConnectMutationResult<UpdateExpenseData, UpdateExpenseVariables>;
export function useUpdateExpense(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateExpenseData, FirebaseError, UpdateExpenseVariables>): UseDataConnectMutationResult<UpdateExpenseData, UpdateExpenseVariables>;

export function useDeleteExpense(options?: useDataConnectMutationOptions<DeleteExpenseData, FirebaseError, DeleteExpenseVariables>): UseDataConnectMutationResult<DeleteExpenseData, DeleteExpenseVariables>;
export function useDeleteExpense(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteExpenseData, FirebaseError, DeleteExpenseVariables>): UseDataConnectMutationResult<DeleteExpenseData, DeleteExpenseVariables>;

export function useGetExpense(vars: GetExpenseVariables, options?: useDataConnectQueryOptions<GetExpenseData>): UseDataConnectQueryResult<GetExpenseData, GetExpenseVariables>;
export function useGetExpense(dc: DataConnect, vars: GetExpenseVariables, options?: useDataConnectQueryOptions<GetExpenseData>): UseDataConnectQueryResult<GetExpenseData, GetExpenseVariables>;

export function useListExpenses(vars: ListExpensesVariables, options?: useDataConnectQueryOptions<ListExpensesData>): UseDataConnectQueryResult<ListExpensesData, ListExpensesVariables>;
export function useListExpenses(dc: DataConnect, vars: ListExpensesVariables, options?: useDataConnectQueryOptions<ListExpensesData>): UseDataConnectQueryResult<ListExpensesData, ListExpensesVariables>;

export function useCreateMemory(options?: useDataConnectMutationOptions<CreateMemoryData, FirebaseError, CreateMemoryVariables>): UseDataConnectMutationResult<CreateMemoryData, CreateMemoryVariables>;
export function useCreateMemory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMemoryData, FirebaseError, CreateMemoryVariables>): UseDataConnectMutationResult<CreateMemoryData, CreateMemoryVariables>;

export function useUpdateMemory(options?: useDataConnectMutationOptions<UpdateMemoryData, FirebaseError, UpdateMemoryVariables>): UseDataConnectMutationResult<UpdateMemoryData, UpdateMemoryVariables>;
export function useUpdateMemory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMemoryData, FirebaseError, UpdateMemoryVariables>): UseDataConnectMutationResult<UpdateMemoryData, UpdateMemoryVariables>;

export function useDeleteMemory(options?: useDataConnectMutationOptions<DeleteMemoryData, FirebaseError, DeleteMemoryVariables>): UseDataConnectMutationResult<DeleteMemoryData, DeleteMemoryVariables>;
export function useDeleteMemory(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMemoryData, FirebaseError, DeleteMemoryVariables>): UseDataConnectMutationResult<DeleteMemoryData, DeleteMemoryVariables>;

export function useGetMemory(vars: GetMemoryVariables, options?: useDataConnectQueryOptions<GetMemoryData>): UseDataConnectQueryResult<GetMemoryData, GetMemoryVariables>;
export function useGetMemory(dc: DataConnect, vars: GetMemoryVariables, options?: useDataConnectQueryOptions<GetMemoryData>): UseDataConnectQueryResult<GetMemoryData, GetMemoryVariables>;

export function useListMemories(vars: ListMemoriesVariables, options?: useDataConnectQueryOptions<ListMemoriesData>): UseDataConnectQueryResult<ListMemoriesData, ListMemoriesVariables>;
export function useListMemories(dc: DataConnect, vars: ListMemoriesVariables, options?: useDataConnectQueryOptions<ListMemoriesData>): UseDataConnectQueryResult<ListMemoriesData, ListMemoriesVariables>;
