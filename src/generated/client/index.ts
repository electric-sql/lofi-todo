import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';
import pgMigrations from './pg-migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ItemsScalarFieldEnumSchema = z.enum(['id','task','done','created_at','list_id']);

export const ListsScalarFieldEnumSchema = z.enum(['id','name','created_at']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ITEMS SCHEMA
/////////////////////////////////////////

export const ItemsSchema = z.object({
  id: z.string().uuid(),
  task: z.string(),
  done: z.boolean(),
  created_at: z.coerce.date(),
  list_id: z.string().uuid(),
})

export type Items = z.infer<typeof ItemsSchema>

/////////////////////////////////////////
// LISTS SCHEMA
/////////////////////////////////////////

export const ListsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.coerce.date(),
})

export type Lists = z.infer<typeof ListsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ITEMS
//------------------------------------------------------

export const ItemsIncludeSchema: z.ZodType<Prisma.ItemsInclude> = z.object({
  lists: z.union([z.boolean(),z.lazy(() => ListsArgsSchema)]).optional(),
}).strict()

export const ItemsArgsSchema: z.ZodType<Prisma.ItemsArgs> = z.object({
  select: z.lazy(() => ItemsSelectSchema).optional(),
  include: z.lazy(() => ItemsIncludeSchema).optional(),
}).strict();

export const ItemsSelectSchema: z.ZodType<Prisma.ItemsSelect> = z.object({
  id: z.boolean().optional(),
  task: z.boolean().optional(),
  done: z.boolean().optional(),
  created_at: z.boolean().optional(),
  list_id: z.boolean().optional(),
  lists: z.union([z.boolean(),z.lazy(() => ListsArgsSchema)]).optional(),
}).strict()

// LISTS
//------------------------------------------------------

export const ListsIncludeSchema: z.ZodType<Prisma.ListsInclude> = z.object({
  items: z.union([z.boolean(),z.lazy(() => ItemsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ListsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ListsArgsSchema: z.ZodType<Prisma.ListsArgs> = z.object({
  select: z.lazy(() => ListsSelectSchema).optional(),
  include: z.lazy(() => ListsIncludeSchema).optional(),
}).strict();

export const ListsCountOutputTypeArgsSchema: z.ZodType<Prisma.ListsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ListsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ListsCountOutputTypeSelectSchema: z.ZodType<Prisma.ListsCountOutputTypeSelect> = z.object({
  items: z.boolean().optional(),
}).strict();

export const ListsSelectSchema: z.ZodType<Prisma.ListsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  items: z.union([z.boolean(),z.lazy(() => ItemsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ListsCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ItemsWhereInputSchema: z.ZodType<Prisma.ItemsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  list_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  lists: z.union([ z.lazy(() => ListsRelationFilterSchema),z.lazy(() => ListsWhereInputSchema) ]).optional(),
}).strict();

export const ItemsOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  list_id: z.lazy(() => SortOrderSchema).optional(),
  lists: z.lazy(() => ListsOrderByWithRelationInputSchema).optional()
}).strict();

export const ItemsWhereUniqueInputSchema: z.ZodType<Prisma.ItemsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ItemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  list_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ItemsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItemsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItemsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ItemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  list_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ListsWhereInputSchema: z.ZodType<Prisma.ListsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ListsWhereInputSchema),z.lazy(() => ListsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ListsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ListsWhereInputSchema),z.lazy(() => ListsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  items: z.lazy(() => ItemsListRelationFilterSchema).optional()
}).strict();

export const ListsOrderByWithRelationInputSchema: z.ZodType<Prisma.ListsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  items: z.lazy(() => ItemsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ListsWhereUniqueInputSchema: z.ZodType<Prisma.ListsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ListsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ListsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ListsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ListsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ListsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ListsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ListsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ListsScalarWhereWithAggregatesInputSchema),z.lazy(() => ListsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ListsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ListsScalarWhereWithAggregatesInputSchema),z.lazy(() => ListsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ItemsCreateInputSchema: z.ZodType<Prisma.ItemsCreateInput> = z.object({
  id: z.string().uuid(),
  task: z.string(),
  done: z.boolean(),
  created_at: z.coerce.date(),
  lists: z.lazy(() => ListsCreateNestedOneWithoutItemsInputSchema)
}).strict();

export const ItemsUncheckedCreateInputSchema: z.ZodType<Prisma.ItemsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  task: z.string(),
  done: z.boolean(),
  created_at: z.coerce.date(),
  list_id: z.string().uuid()
}).strict();

export const ItemsUpdateInputSchema: z.ZodType<Prisma.ItemsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lists: z.lazy(() => ListsUpdateOneRequiredWithoutItemsNestedInputSchema).optional()
}).strict();

export const ItemsUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  list_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsCreateManyInputSchema: z.ZodType<Prisma.ItemsCreateManyInput> = z.object({
  id: z.string().uuid(),
  task: z.string(),
  done: z.boolean(),
  created_at: z.coerce.date(),
  list_id: z.string().uuid()
}).strict();

export const ItemsUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  list_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ListsCreateInputSchema: z.ZodType<Prisma.ListsCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.coerce.date(),
  items: z.lazy(() => ItemsCreateNestedManyWithoutListsInputSchema).optional()
}).strict();

export const ListsUncheckedCreateInputSchema: z.ZodType<Prisma.ListsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.coerce.date(),
  items: z.lazy(() => ItemsUncheckedCreateNestedManyWithoutListsInputSchema).optional()
}).strict();

export const ListsUpdateInputSchema: z.ZodType<Prisma.ListsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemsUpdateManyWithoutListsNestedInputSchema).optional()
}).strict();

export const ListsUncheckedUpdateInputSchema: z.ZodType<Prisma.ListsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  items: z.lazy(() => ItemsUncheckedUpdateManyWithoutListsNestedInputSchema).optional()
}).strict();

export const ListsCreateManyInputSchema: z.ZodType<Prisma.ListsCreateManyInput> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.coerce.date()
}).strict();

export const ListsUpdateManyMutationInputSchema: z.ZodType<Prisma.ListsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ListsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ListsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ListsRelationFilterSchema: z.ZodType<Prisma.ListsRelationFilter> = z.object({
  is: z.lazy(() => ListsWhereInputSchema).optional(),
  isNot: z.lazy(() => ListsWhereInputSchema).optional()
}).strict();

export const ItemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  list_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  list_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  list_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const ItemsListRelationFilterSchema: z.ZodType<Prisma.ItemsListRelationFilter> = z.object({
  every: z.lazy(() => ItemsWhereInputSchema).optional(),
  some: z.lazy(() => ItemsWhereInputSchema).optional(),
  none: z.lazy(() => ItemsWhereInputSchema).optional()
}).strict();

export const ItemsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ItemsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ListsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ListsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ListsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ListsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ListsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ListsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ListsCreateNestedOneWithoutItemsInputSchema: z.ZodType<Prisma.ListsCreateNestedOneWithoutItemsInput> = z.object({
  create: z.union([ z.lazy(() => ListsCreateWithoutItemsInputSchema),z.lazy(() => ListsUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListsCreateOrConnectWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => ListsWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ListsUpdateOneRequiredWithoutItemsNestedInputSchema: z.ZodType<Prisma.ListsUpdateOneRequiredWithoutItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ListsCreateWithoutItemsInputSchema),z.lazy(() => ListsUncheckedCreateWithoutItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ListsCreateOrConnectWithoutItemsInputSchema).optional(),
  upsert: z.lazy(() => ListsUpsertWithoutItemsInputSchema).optional(),
  connect: z.lazy(() => ListsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ListsUpdateWithoutItemsInputSchema),z.lazy(() => ListsUncheckedUpdateWithoutItemsInputSchema) ]).optional(),
}).strict();

export const ItemsCreateNestedManyWithoutListsInputSchema: z.ZodType<Prisma.ItemsCreateNestedManyWithoutListsInput> = z.object({
  create: z.union([ z.lazy(() => ItemsCreateWithoutListsInputSchema),z.lazy(() => ItemsCreateWithoutListsInputSchema).array(),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema),z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsCreateManyListsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemsUncheckedCreateNestedManyWithoutListsInputSchema: z.ZodType<Prisma.ItemsUncheckedCreateNestedManyWithoutListsInput> = z.object({
  create: z.union([ z.lazy(() => ItemsCreateWithoutListsInputSchema),z.lazy(() => ItemsCreateWithoutListsInputSchema).array(),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema),z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsCreateManyListsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItemsUpdateManyWithoutListsNestedInputSchema: z.ZodType<Prisma.ItemsUpdateManyWithoutListsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemsCreateWithoutListsInputSchema),z.lazy(() => ItemsCreateWithoutListsInputSchema).array(),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema),z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemsUpsertWithWhereUniqueWithoutListsInputSchema),z.lazy(() => ItemsUpsertWithWhereUniqueWithoutListsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsCreateManyListsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemsUpdateWithWhereUniqueWithoutListsInputSchema),z.lazy(() => ItemsUpdateWithWhereUniqueWithoutListsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemsUpdateManyWithWhereWithoutListsInputSchema),z.lazy(() => ItemsUpdateManyWithWhereWithoutListsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemsScalarWhereInputSchema),z.lazy(() => ItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemsUncheckedUpdateManyWithoutListsNestedInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateManyWithoutListsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemsCreateWithoutListsInputSchema),z.lazy(() => ItemsCreateWithoutListsInputSchema).array(),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema),z.lazy(() => ItemsCreateOrConnectWithoutListsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItemsUpsertWithWhereUniqueWithoutListsInputSchema),z.lazy(() => ItemsUpsertWithWhereUniqueWithoutListsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItemsCreateManyListsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItemsWhereUniqueInputSchema),z.lazy(() => ItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItemsUpdateWithWhereUniqueWithoutListsInputSchema),z.lazy(() => ItemsUpdateWithWhereUniqueWithoutListsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItemsUpdateManyWithWhereWithoutListsInputSchema),z.lazy(() => ItemsUpdateManyWithWhereWithoutListsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItemsScalarWhereInputSchema),z.lazy(() => ItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const ListsCreateWithoutItemsInputSchema: z.ZodType<Prisma.ListsCreateWithoutItemsInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date()
}).strict();

export const ListsUncheckedCreateWithoutItemsInputSchema: z.ZodType<Prisma.ListsUncheckedCreateWithoutItemsInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date()
}).strict();

export const ListsCreateOrConnectWithoutItemsInputSchema: z.ZodType<Prisma.ListsCreateOrConnectWithoutItemsInput> = z.object({
  where: z.lazy(() => ListsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ListsCreateWithoutItemsInputSchema),z.lazy(() => ListsUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const ListsUpsertWithoutItemsInputSchema: z.ZodType<Prisma.ListsUpsertWithoutItemsInput> = z.object({
  update: z.union([ z.lazy(() => ListsUpdateWithoutItemsInputSchema),z.lazy(() => ListsUncheckedUpdateWithoutItemsInputSchema) ]),
  create: z.union([ z.lazy(() => ListsCreateWithoutItemsInputSchema),z.lazy(() => ListsUncheckedCreateWithoutItemsInputSchema) ]),
}).strict();

export const ListsUpdateWithoutItemsInputSchema: z.ZodType<Prisma.ListsUpdateWithoutItemsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ListsUncheckedUpdateWithoutItemsInputSchema: z.ZodType<Prisma.ListsUncheckedUpdateWithoutItemsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsCreateWithoutListsInputSchema: z.ZodType<Prisma.ItemsCreateWithoutListsInput> = z.object({
  id: z.string(),
  task: z.string(),
  done: z.boolean(),
  created_at: z.coerce.date()
}).strict();

export const ItemsUncheckedCreateWithoutListsInputSchema: z.ZodType<Prisma.ItemsUncheckedCreateWithoutListsInput> = z.object({
  id: z.string(),
  task: z.string(),
  done: z.boolean(),
  created_at: z.coerce.date()
}).strict();

export const ItemsCreateOrConnectWithoutListsInputSchema: z.ZodType<Prisma.ItemsCreateOrConnectWithoutListsInput> = z.object({
  where: z.lazy(() => ItemsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemsCreateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema) ]),
}).strict();

export const ItemsCreateManyListsInputEnvelopeSchema: z.ZodType<Prisma.ItemsCreateManyListsInputEnvelope> = z.object({
  data: z.lazy(() => ItemsCreateManyListsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ItemsUpsertWithWhereUniqueWithoutListsInputSchema: z.ZodType<Prisma.ItemsUpsertWithWhereUniqueWithoutListsInput> = z.object({
  where: z.lazy(() => ItemsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItemsUpdateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedUpdateWithoutListsInputSchema) ]),
  create: z.union([ z.lazy(() => ItemsCreateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutListsInputSchema) ]),
}).strict();

export const ItemsUpdateWithWhereUniqueWithoutListsInputSchema: z.ZodType<Prisma.ItemsUpdateWithWhereUniqueWithoutListsInput> = z.object({
  where: z.lazy(() => ItemsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItemsUpdateWithoutListsInputSchema),z.lazy(() => ItemsUncheckedUpdateWithoutListsInputSchema) ]),
}).strict();

export const ItemsUpdateManyWithWhereWithoutListsInputSchema: z.ZodType<Prisma.ItemsUpdateManyWithWhereWithoutListsInput> = z.object({
  where: z.lazy(() => ItemsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItemsUpdateManyMutationInputSchema),z.lazy(() => ItemsUncheckedUpdateManyWithoutItemsInputSchema) ]),
}).strict();

export const ItemsScalarWhereInputSchema: z.ZodType<Prisma.ItemsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsScalarWhereInputSchema),z.lazy(() => ItemsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsScalarWhereInputSchema),z.lazy(() => ItemsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  task: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  list_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const ItemsCreateManyListsInputSchema: z.ZodType<Prisma.ItemsCreateManyListsInput> = z.object({
  id: z.string().uuid(),
  task: z.string(),
  done: z.boolean(),
  created_at: z.coerce.date()
}).strict();

export const ItemsUpdateWithoutListsInputSchema: z.ZodType<Prisma.ItemsUpdateWithoutListsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsUncheckedUpdateWithoutListsInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateWithoutListsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsUncheckedUpdateManyWithoutItemsInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateManyWithoutItemsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ItemsFindFirstArgsSchema: z.ZodType<Prisma.ItemsFindFirstArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ItemsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ItemsFindFirstArgs>

export const ItemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemsFindFirstOrThrowArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ItemsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ItemsFindFirstOrThrowArgs>

export const ItemsFindManyArgsSchema: z.ZodType<Prisma.ItemsFindManyArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ItemsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ItemsFindManyArgs>

export const ItemsAggregateArgsSchema: z.ZodType<Prisma.ItemsAggregateArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ItemsAggregateArgs>

export const ItemsGroupByArgsSchema: z.ZodType<Prisma.ItemsGroupByArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithAggregationInputSchema.array(),ItemsOrderByWithAggregationInputSchema ]).optional(),
  by: ItemsScalarFieldEnumSchema.array(),
  having: ItemsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ItemsGroupByArgs>

export const ItemsFindUniqueArgsSchema: z.ZodType<Prisma.ItemsFindUniqueArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ItemsFindUniqueArgs>

export const ItemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemsFindUniqueOrThrowArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ItemsFindUniqueOrThrowArgs>

export const ListsFindFirstArgsSchema: z.ZodType<Prisma.ListsFindFirstArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  where: ListsWhereInputSchema.optional(),
  orderBy: z.union([ ListsOrderByWithRelationInputSchema.array(),ListsOrderByWithRelationInputSchema ]).optional(),
  cursor: ListsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ListsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ListsFindFirstArgs>

export const ListsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ListsFindFirstOrThrowArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  where: ListsWhereInputSchema.optional(),
  orderBy: z.union([ ListsOrderByWithRelationInputSchema.array(),ListsOrderByWithRelationInputSchema ]).optional(),
  cursor: ListsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ListsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ListsFindFirstOrThrowArgs>

export const ListsFindManyArgsSchema: z.ZodType<Prisma.ListsFindManyArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  where: ListsWhereInputSchema.optional(),
  orderBy: z.union([ ListsOrderByWithRelationInputSchema.array(),ListsOrderByWithRelationInputSchema ]).optional(),
  cursor: ListsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ListsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ListsFindManyArgs>

export const ListsAggregateArgsSchema: z.ZodType<Prisma.ListsAggregateArgs> = z.object({
  where: ListsWhereInputSchema.optional(),
  orderBy: z.union([ ListsOrderByWithRelationInputSchema.array(),ListsOrderByWithRelationInputSchema ]).optional(),
  cursor: ListsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ListsAggregateArgs>

export const ListsGroupByArgsSchema: z.ZodType<Prisma.ListsGroupByArgs> = z.object({
  where: ListsWhereInputSchema.optional(),
  orderBy: z.union([ ListsOrderByWithAggregationInputSchema.array(),ListsOrderByWithAggregationInputSchema ]).optional(),
  by: ListsScalarFieldEnumSchema.array(),
  having: ListsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ListsGroupByArgs>

export const ListsFindUniqueArgsSchema: z.ZodType<Prisma.ListsFindUniqueArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  where: ListsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ListsFindUniqueArgs>

export const ListsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ListsFindUniqueOrThrowArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  where: ListsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ListsFindUniqueOrThrowArgs>

export const ItemsCreateArgsSchema: z.ZodType<Prisma.ItemsCreateArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  data: z.union([ ItemsCreateInputSchema,ItemsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ItemsCreateArgs>

export const ItemsUpsertArgsSchema: z.ZodType<Prisma.ItemsUpsertArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
  create: z.union([ ItemsCreateInputSchema,ItemsUncheckedCreateInputSchema ]),
  update: z.union([ ItemsUpdateInputSchema,ItemsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ItemsUpsertArgs>

export const ItemsCreateManyArgsSchema: z.ZodType<Prisma.ItemsCreateManyArgs> = z.object({
  data: ItemsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ItemsCreateManyArgs>

export const ItemsDeleteArgsSchema: z.ZodType<Prisma.ItemsDeleteArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ItemsDeleteArgs>

export const ItemsUpdateArgsSchema: z.ZodType<Prisma.ItemsUpdateArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  data: z.union([ ItemsUpdateInputSchema,ItemsUncheckedUpdateInputSchema ]),
  where: ItemsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ItemsUpdateArgs>

export const ItemsUpdateManyArgsSchema: z.ZodType<Prisma.ItemsUpdateManyArgs> = z.object({
  data: z.union([ ItemsUpdateManyMutationInputSchema,ItemsUncheckedUpdateManyInputSchema ]),
  where: ItemsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ItemsUpdateManyArgs>

export const ItemsDeleteManyArgsSchema: z.ZodType<Prisma.ItemsDeleteManyArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ItemsDeleteManyArgs>

export const ListsCreateArgsSchema: z.ZodType<Prisma.ListsCreateArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  data: z.union([ ListsCreateInputSchema,ListsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ListsCreateArgs>

export const ListsUpsertArgsSchema: z.ZodType<Prisma.ListsUpsertArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  where: ListsWhereUniqueInputSchema,
  create: z.union([ ListsCreateInputSchema,ListsUncheckedCreateInputSchema ]),
  update: z.union([ ListsUpdateInputSchema,ListsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ListsUpsertArgs>

export const ListsCreateManyArgsSchema: z.ZodType<Prisma.ListsCreateManyArgs> = z.object({
  data: ListsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ListsCreateManyArgs>

export const ListsDeleteArgsSchema: z.ZodType<Prisma.ListsDeleteArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  where: ListsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ListsDeleteArgs>

export const ListsUpdateArgsSchema: z.ZodType<Prisma.ListsUpdateArgs> = z.object({
  select: ListsSelectSchema.optional(),
  include: ListsIncludeSchema.optional(),
  data: z.union([ ListsUpdateInputSchema,ListsUncheckedUpdateInputSchema ]),
  where: ListsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ListsUpdateArgs>

export const ListsUpdateManyArgsSchema: z.ZodType<Prisma.ListsUpdateManyArgs> = z.object({
  data: z.union([ ListsUpdateManyMutationInputSchema,ListsUncheckedUpdateManyInputSchema ]),
  where: ListsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ListsUpdateManyArgs>

export const ListsDeleteManyArgsSchema: z.ZodType<Prisma.ListsDeleteManyArgs> = z.object({
  where: ListsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ListsDeleteManyArgs>

interface ItemsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ItemsArgs
  readonly type: Omit<Prisma.ItemsGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface ListsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ListsArgs
  readonly type: Omit<Prisma.ListsGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

export const tableSchemas = {
  items: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "task",
        "TEXT"
      ],
      [
        "done",
        "BOOL"
      ],
      [
        "created_at",
        "TIMESTAMP"
      ],
      [
        "list_id",
        "UUID"
      ]
    ]),
    relations: [
      new Relation("lists", "list_id", "id", "lists", "ItemsToLists", "one"),
    ],
    modelSchema: (ItemsCreateInputSchema as any)
      .partial()
      .or((ItemsUncheckedCreateInputSchema as any).partial()),
    createSchema: ItemsCreateArgsSchema,
    createManySchema: ItemsCreateManyArgsSchema,
    findUniqueSchema: ItemsFindUniqueArgsSchema,
    findSchema: ItemsFindFirstArgsSchema,
    updateSchema: ItemsUpdateArgsSchema,
    updateManySchema: ItemsUpdateManyArgsSchema,
    upsertSchema: ItemsUpsertArgsSchema,
    deleteSchema: ItemsDeleteArgsSchema,
    deleteManySchema: ItemsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ItemsUncheckedCreateInputSchema>,
    Prisma.ItemsCreateArgs['data'],
    Prisma.ItemsUpdateArgs['data'],
    Prisma.ItemsFindFirstArgs['select'],
    Prisma.ItemsFindFirstArgs['where'],
    Prisma.ItemsFindUniqueArgs['where'],
    Omit<Prisma.ItemsInclude, '_count'>,
    Prisma.ItemsFindFirstArgs['orderBy'],
    Prisma.ItemsScalarFieldEnum,
    ItemsGetPayload
  >,
  lists: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "created_at",
        "TIMESTAMP"
      ]
    ]),
    relations: [
      new Relation("items", "", "", "items", "ItemsToLists", "many"),
    ],
    modelSchema: (ListsCreateInputSchema as any)
      .partial()
      .or((ListsUncheckedCreateInputSchema as any).partial()),
    createSchema: ListsCreateArgsSchema,
    createManySchema: ListsCreateManyArgsSchema,
    findUniqueSchema: ListsFindUniqueArgsSchema,
    findSchema: ListsFindFirstArgsSchema,
    updateSchema: ListsUpdateArgsSchema,
    updateManySchema: ListsUpdateManyArgsSchema,
    upsertSchema: ListsUpsertArgsSchema,
    deleteSchema: ListsDeleteArgsSchema,
    deleteManySchema: ListsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ListsUncheckedCreateInputSchema>,
    Prisma.ListsCreateArgs['data'],
    Prisma.ListsUpdateArgs['data'],
    Prisma.ListsFindFirstArgs['select'],
    Prisma.ListsFindFirstArgs['where'],
    Prisma.ListsFindUniqueArgs['where'],
    Omit<Prisma.ListsInclude, '_count'>,
    Prisma.ListsFindFirstArgs['orderBy'],
    Prisma.ListsScalarFieldEnum,
    ListsGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations, pgMigrations)
export type Electric = ElectricClient<typeof schema>
