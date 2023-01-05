import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Contact = {
  __typename?: 'Contact';
  backgroundImage?: Maybe<ImageType>;
  description?: Maybe<TextType>;
  icon?: Maybe<ImageType>;
  link?: Maybe<UrlType>;
  name?: Maybe<TextType>;
};

export type Contactt = {
  __typename?: 'Contactt';
  backgroundImage?: Maybe<ImageType>;
  description?: Maybe<TexttType>;
  icon?: Maybe<ImageType>;
  link?: Maybe<UrlType>;
  name?: Maybe<TexttType>;
};

export enum ElementType {
  File = 'FILE',
  Image = 'IMAGE',
  Text = 'TEXT',
  Url = 'URL'
}

export type GroupRoleInput = {
  group?: InputMaybe<GroupType>;
  role?: InputMaybe<RoleType>;
};

export type GroupRoleType = {
  __typename?: 'GroupRoleType';
  group?: Maybe<GroupType>;
  role?: Maybe<RoleType>;
};

export enum GroupType {
  Admin = 'ADMIN',
  Aero = 'AERO',
  Chas = 'CHAS',
  Elec = 'ELEC',
  Gen = 'GEN',
  Power = 'POWER',
  Pr = 'PR',
  Struc = 'STRUC'
}

export type ImageInput = {
  url?: InputMaybe<Scalars['String']>;
};

export type ImageType = {
  __typename?: 'ImageType';
  url?: Maybe<Scalars['String']>;
};

export enum LangType {
  Ch = 'CH',
  En = 'EN'
}

export type Member = {
  __typename?: 'Member';
  avatar?: Maybe<ImageType>;
  departmentYear?: Maybe<TexttType>;
  groupRole?: Maybe<Array<Maybe<GroupRoleType>>>;
  id: Scalars['ID'];
  introduction?: Maybe<TexttType>;
  name: TexttType;
  school?: Maybe<TexttType>;
};

export type MemberInput = {
  avatar?: InputMaybe<ImageInput>;
  departmentYear?: InputMaybe<TexttInput>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  introduction?: InputMaybe<TexttInput>;
  name: TexttInput;
  school?: InputMaybe<TexttInput>;
};

export type MemberNewsFeedInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMember: Member;
  createNewsFeed: NewsFeedType;
  deleteMember: Member;
  deleteNewsFeed: Scalars['Boolean'];
  greetings: Scalars['String'];
  modifyMember: Member;
  modifyNewsFeed: NewsFeedType;
};


export type MutationCreateMemberArgs = {
  member: MemberInput;
};


export type MutationCreateNewsFeedArgs = {
  input: NewsFeedInput;
};


export type MutationDeleteMemberArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNewsFeedArgs = {
  id: Scalars['ID'];
};


export type MutationGreetingsArgs = {
  data: Scalars['String'];
};


export type MutationModifyMemberArgs = {
  id: Scalars['ID'];
  member: MemberInput;
};


export type MutationModifyNewsFeedArgs = {
  id: Scalars['ID'];
  input: NewsFeedInput;
};

export type NewsFeedInput = {
  Author?: InputMaybe<MemberNewsFeedInput>;
  body: TexttInput;
  imgs?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  title: TexttInput;
};

export type NewsFeedType = {
  __typename?: 'NewsFeedType';
  Author?: Maybe<Member>;
  body: TexttType;
  createdTime: Scalars['Date'];
  id: Scalars['ID'];
  imgs?: Maybe<Array<Maybe<ImageType>>>;
  lastUpdateTime: Scalars['Date'];
  title: TexttType;
};

export type Query = {
  __typename?: 'Query';
  getContacts: Array<Maybe<Contact>>;
  getContactts: Array<Maybe<Contactt>>;
  getMember?: Maybe<Member>;
  getMembers: Array<Maybe<Member>>;
  getNewsFeed: NewsFeedType;
  getNewsFeeds: Array<Maybe<NewsFeedType>>;
  greetings: Scalars['String'];
};


export type QueryGetContactsArgs = {
  lang: LangType;
};


export type QueryGetNewsFeedArgs = {
  id: Scalars['ID'];
};

export enum RoleType {
  Captain = 'CAPTAIN',
  Cto = 'CTO',
  GroupLeader = 'GROUP_LEADER',
  Member = 'MEMBER',
  ViceCaptain = 'VICE_CAPTAIN'
}

export type TextType = {
  __typename?: 'TextType';
  text?: Maybe<Scalars['String']>;
};

export type TexttInput = {
  ch?: InputMaybe<Scalars['String']>;
  en?: InputMaybe<Scalars['String']>;
};

export type TexttType = {
  __typename?: 'TexttType';
  ch?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type UrlInput = {
  url?: InputMaybe<Scalars['String']>;
};

export type UrlType = {
  __typename?: 'UrlType';
  url?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Contact: ResolverTypeWrapper<Contact>;
  Contactt: ResolverTypeWrapper<Contactt>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ElementType: ElementType;
  GroupRoleInput: GroupRoleInput;
  GroupRoleType: ResolverTypeWrapper<GroupRoleType>;
  GroupType: GroupType;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImageInput: ImageInput;
  ImageType: ResolverTypeWrapper<ImageType>;
  LangType: LangType;
  Member: ResolverTypeWrapper<Member>;
  MemberInput: MemberInput;
  MemberNewsFeedInput: MemberNewsFeedInput;
  Mutation: ResolverTypeWrapper<{}>;
  NewsFeedInput: NewsFeedInput;
  NewsFeedType: ResolverTypeWrapper<NewsFeedType>;
  Query: ResolverTypeWrapper<{}>;
  RoleType: RoleType;
  String: ResolverTypeWrapper<Scalars['String']>;
  TextType: ResolverTypeWrapper<TextType>;
  TexttInput: TexttInput;
  TexttType: ResolverTypeWrapper<TexttType>;
  UrlInput: UrlInput;
  UrlType: ResolverTypeWrapper<UrlType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Contact: Contact;
  Contactt: Contactt;
  Date: Scalars['Date'];
  GroupRoleInput: GroupRoleInput;
  GroupRoleType: GroupRoleType;
  ID: Scalars['ID'];
  ImageInput: ImageInput;
  ImageType: ImageType;
  Member: Member;
  MemberInput: MemberInput;
  MemberNewsFeedInput: MemberNewsFeedInput;
  Mutation: {};
  NewsFeedInput: NewsFeedInput;
  NewsFeedType: NewsFeedType;
  Query: {};
  String: Scalars['String'];
  TextType: TextType;
  TexttInput: TexttInput;
  TexttType: TexttType;
  UrlInput: UrlInput;
  UrlType: UrlType;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  backgroundImage?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['TextType']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['UrlType']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['TextType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContacttResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contactt'] = ResolversParentTypes['Contactt']> = {
  backgroundImage?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['TexttType']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['UrlType']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['TexttType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GroupRoleTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupRoleType'] = ResolversParentTypes['GroupRoleType']> = {
  group?: Resolver<Maybe<ResolversTypes['GroupType']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['RoleType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageType'] = ResolversParentTypes['ImageType']> = {
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = {
  avatar?: Resolver<Maybe<ResolversTypes['ImageType']>, ParentType, ContextType>;
  departmentYear?: Resolver<Maybe<ResolversTypes['TexttType']>, ParentType, ContextType>;
  groupRole?: Resolver<Maybe<Array<Maybe<ResolversTypes['GroupRoleType']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<ResolversTypes['TexttType']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['TexttType'], ParentType, ContextType>;
  school?: Resolver<Maybe<ResolversTypes['TexttType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMember?: Resolver<ResolversTypes['Member'], ParentType, ContextType, RequireFields<MutationCreateMemberArgs, 'member'>>;
  createNewsFeed?: Resolver<ResolversTypes['NewsFeedType'], ParentType, ContextType, RequireFields<MutationCreateNewsFeedArgs, 'input'>>;
  deleteMember?: Resolver<ResolversTypes['Member'], ParentType, ContextType, RequireFields<MutationDeleteMemberArgs, 'id'>>;
  deleteNewsFeed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteNewsFeedArgs, 'id'>>;
  greetings?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationGreetingsArgs, 'data'>>;
  modifyMember?: Resolver<ResolversTypes['Member'], ParentType, ContextType, RequireFields<MutationModifyMemberArgs, 'id' | 'member'>>;
  modifyNewsFeed?: Resolver<ResolversTypes['NewsFeedType'], ParentType, ContextType, RequireFields<MutationModifyNewsFeedArgs, 'id' | 'input'>>;
};

export type NewsFeedTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsFeedType'] = ResolversParentTypes['NewsFeedType']> = {
  Author?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  body?: Resolver<ResolversTypes['TexttType'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imgs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ImageType']>>>, ParentType, ContextType>;
  lastUpdateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['TexttType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getContacts?: Resolver<Array<Maybe<ResolversTypes['Contact']>>, ParentType, ContextType, RequireFields<QueryGetContactsArgs, 'lang'>>;
  getContactts?: Resolver<Array<Maybe<ResolversTypes['Contactt']>>, ParentType, ContextType>;
  getMember?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  getMembers?: Resolver<Array<Maybe<ResolversTypes['Member']>>, ParentType, ContextType>;
  getNewsFeed?: Resolver<ResolversTypes['NewsFeedType'], ParentType, ContextType, RequireFields<QueryGetNewsFeedArgs, 'id'>>;
  getNewsFeeds?: Resolver<Array<Maybe<ResolversTypes['NewsFeedType']>>, ParentType, ContextType>;
  greetings?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TextTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextType'] = ResolversParentTypes['TextType']> = {
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TexttTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TexttType'] = ResolversParentTypes['TexttType']> = {
  ch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  en?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UrlTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UrlType'] = ResolversParentTypes['UrlType']> = {
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Contact?: ContactResolvers<ContextType>;
  Contactt?: ContacttResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GroupRoleType?: GroupRoleTypeResolvers<ContextType>;
  ImageType?: ImageTypeResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NewsFeedType?: NewsFeedTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TextType?: TextTypeResolvers<ContextType>;
  TexttType?: TexttTypeResolvers<ContextType>;
  UrlType?: UrlTypeResolvers<ContextType>;
};

